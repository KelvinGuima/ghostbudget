import { Injectable, BadRequestException } from '@nestjs/common';
import { parse } from 'csv-parse/sync';

@Injectable()
export class UploadService {
    processFile(file: Express.Multer.File) {
        if (!file.buffer || file.buffer.length === 0) {
            throw new BadRequestException('O arquivo enviado está vazio.');
        }

        const content = file.buffer.toString();
        let records;

        try {
            records = parse(content, {
                columns: true,
                skip_empty_lines: true,
                trim: true, 
            });
        } catch (error) {
            throw new BadRequestException('Erro ao processar o CSV. Verifique a formatação.');
        }

        if (records.length === 0) {
            throw new BadRequestException('O CSV não contém registros de transações.');
        }

        const requiredColumns = ['data', 'descricao', 'valor'];
        const headers = Object.keys(records[0]);
        const missingColumns = requiredColumns.filter(col => !headers.includes(col));

        if (missingColumns.length > 0) {
            throw new BadRequestException(`Colunas ausentes no CSV: ${missingColumns.join(', ')}`);
        }

        const transactions = records.map((row: any, index: number) => {
            const amount = parseFloat(row.valor);
            
            if (isNaN(amount)) {
                throw new BadRequestException(`Valor inválido na linha ${index + 1}: "${row.valor}" não é um número.`);
            }

            if (!row.data) {
                throw new BadRequestException(`Data ausente na linha ${index + 1}.`);
            }

            return {
                date: row.data,
                description: row.descricao,
                amount: amount,
            };
        });

        return transactions;
    }
}