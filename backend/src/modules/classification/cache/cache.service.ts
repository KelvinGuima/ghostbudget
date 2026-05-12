import { Injectable } from '@nestjs/common';
import { PrismaService } from 'common/prisma/prisma.service';

@Injectable()
export class CacheService {
    constructor(private prisma: PrismaService) {}

    async get(description: string): Promise<string | null> {
        const result = await this.prisma.classificationCache.findUnique({
            where: { description },
        })
        return result?.category || null;
    }

    async set(description: string, category: string) {
        await this.prisma.classificationCache.upsert({
            where: {description},
            update: {category},
            create: {description,category},
        })
    }
}
