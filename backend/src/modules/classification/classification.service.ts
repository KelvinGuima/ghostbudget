import { Injectable } from '@nestjs/common';

@Injectable()
export class ClassificationService {
    classify(description: string) : string | null {
        const desc = description.toLowerCase();

        if (desc.includes('uber') || desc.includes ('99')) {
            return 'Transporte'
        }

        if (desc.includes('ifood') || desc.includes ('restaurante')) {
            return 'Alimentação'
        }

        if (desc.includes('netflix') || desc.includes ('spotify') || desc.includes ('gamepass')) {
            return 'Entretenimento'
        }

        if (desc.includes('aluguel') || desc.includes ('luz') || desc.includes ('agua')) {
            return 'Moradia'
        }

        return null;
    }
}
