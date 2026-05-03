import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {
    private cache = new Map<string, string>();

    get(description: string): string | null {
        return this.cache.get(description) || null;
    }
    
    set(description: string, category: string) {
        this.cache.set(description, category)
    }
}
