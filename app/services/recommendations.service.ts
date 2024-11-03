import { Hero } from '../models/hero.model';

export class RecommendationsService {
    getCounterPicks(enemyHero: Hero): string[] {
        // Simple counter-pick logic
        return enemyHero.counters;
    }

    getItemRecommendations(enemyTeam: Hero[]): string[] {
        const recommendations: string[] = [];
        
        // Basic item recommendation logic
        if (enemyTeam.some(hero => hero.role === 'Tank')) {
            recommendations.push('Demon Hunter Sword');
        }
        if (enemyTeam.some(hero => hero.role === 'Fighter')) {
            recommendations.push('Sea Halberd');
        }
        
        return recommendations;
    }

    getTips(currentHero: Hero, enemyTeam: Hero[]): string[] {
        return [
            ...currentHero.tips,
            `Watch out for ${enemyTeam.map(h => h.name).join(', ')}`
        ];
    }
}