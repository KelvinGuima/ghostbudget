import { Injectable } from '@nestjs/common';

@Injectable()
export class OllamaService {
    async classify(description: string): Promise<string | null> {
        try {
            const response = await fetch ('http://localhost:11434/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'phi3',
                    prompt: `
                    Você é um especialista financeiro focado em conciliação bancária e classificação de recibos no Brasil.

                    Sua tarefa é analisar a descrição da transação abaixo e classificá-la em EXATAMENTE uma das categorias permitidas.

                    CATEGORIAS PERMITIDAS E DIRETRIZES:
                    - "Alimentação": Supermercados, padarias, restaurantes, fast food, apps de delivery (ex: iFood, Rappi, Zé Delivery), hortifruti.
                    - "Transporte": Postos de combustível, apps de mobilidade (ex: Uber, 99), passagens aéreas, pedágio, transporte público, estacionamento, manutenção veicular.
                    - "Moradia": Aluguel, condomínio, contas de consumo (Enel, Sabesp, Light), internet residencial (Claro, Vivo), seguros residenciais, materiais de construção.
                    - "Entretenimento": Streaming (Netflix, Spotify, Amazon Prime, Premiere), cinema, shows, jogos (Steam, PlayStation), clubes, bares e lazer em geral.
                    - "Outros": Compras em varejo online (Amazon.com.br, Mercado Livre, Shopee), farmácias, vestuário, eletrônicos, pet shop, taxas bancárias, pagamentos genéricos via Pix sem identificação clara, ou qualquer item que não se encaixe perfeitamente nas anteriores.

                    REGRAS RÍGIDAS DE SAÍDA (CRÍTICO PARA O SISTEMA):
                    1. Responda APENAS com o nome exato da categoria.
                    2. Não use pontuação final (pontos, vírgulas).
                    3. Não escreva nenhuma palavra adicional, saudação ou explicação.
                    4. Respeite as letras maiúsculas e minúsculas das categorias permitidas.
                    5. Em caso de dúvida extrema ou descrição incompreensível (ex: códigos alfanuméricos aleatórios), classifique como "Outros".

                    EXEMPLOS DE CLASSIFICAÇÃO:
                    Input: "PGTO ELO IFOOD*IFOOD SAO PAULO"
                    Output: Alimentação

                    Input: "UBER *TRIP HELP.UBER.C"
                    Output: Transporte

                    Input: "PAGTO BOLETO CONDOMINIO EDIFICIO LUNA"
                    Output: Moradia

                    Input: "COMPRA DEBITO MERCADOLIVRE OSASCO"
                    Output: Outros

                    Input: "PGTO DEB NETFLIX.COM"
                    Output: Entretenimento

                    Input: "PIX TRANSFERENCIA JOAO SILVA"
                    Output: Outros

                    Transação a classificar: "${description}"`,
                stream: false,
                }),
            });

            const data = await response.json();

            return this.normalize(data.response);
        } catch (error) {
            console.error('Erro ao chamar ollama: ', error);
            return null;
        }
    }

    private normalize(response: string): string | null {
        if (!response) return 'Outros';

        const text = response.trim().toLowerCase();

        if(text.includes('aliment')) return 'Alimentação';
        if(text.includes('trans')) return 'Transporte';
        if(text.includes('mora')) return 'Moradia';
        if(text.includes('entre')) return 'Entretenimento';
        return 'Outros';
    }
}
