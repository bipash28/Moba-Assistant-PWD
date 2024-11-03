import { Http } from '@nativescript/core';

export interface MLBBHero {
    id: string;
    name: string;
    role: string;
    specialty: string[];
    img: string;
    stats: {
        movement_speed: number;
        physical_attack: number;
        magic_power: number;
        armor: number;
        magic_resistance: number;
        hp: number;
        mana: number;
        attack_speed: number;
        hp_regen: number;
        mana_regen: number;
    };
}

export class MLBBApiService {
    private readonly BASE_URL = 'https://raw.githubusercontent.com/mobaguides/mobile-legends-api/main/data';
    
    async getAllHeroes(): Promise<MLBBHero[]> {
        try {
            const response = await Http.request({
                url: `${this.BASE_URL}/heroes.json`,
                method: 'GET'
            });
            
            return response.content.toJSON();
        } catch (error) {
            console.error('Failed to fetch heroes:', error);
            return [];
        }
    }

    async getHeroImage(heroId: string): Promise<string> {
        return `${this.BASE_URL}/images/heroes/${heroId}.jpg`;
    }

    async updateLocalDatabase(): Promise<void> {
        try {
            const heroes = await this.getAllHeroes();
            const databaseService = new DatabaseService();
            
            // Merge API data with local data
            const localHeroes = databaseService.getHeroesData() || [];
            const updatedHeroes = this.mergeHeroData(localHeroes, heroes);
            
            databaseService.saveHeroesData(updatedHeroes);
        } catch (error) {
            console.error('Failed to update local database:', error);
        }
    }

    private mergeHeroData(localHeroes: any[], apiHeroes: MLBBHero[]): any[] {
        return apiHeroes.map(apiHero => {
            const localHero = localHeroes.find(h => h.name === apiHero.name);
            return {
                ...apiHero,
                ...localHero,
                stats: apiHero.stats,
                img: apiHero.img
            };
        });
    }
}