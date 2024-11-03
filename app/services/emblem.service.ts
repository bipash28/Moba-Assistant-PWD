import { Hero } from '../models/hero.model';

export interface EmblemRecommendation {
    emblem: string;
    talents: string[];
    description: string;
    score: number;
}

export class EmblemService {
    getRecommendedEmblems(hero: Hero, enemyTeam: Hero[]): EmblemRecommendation[] {
        const recommendations: EmblemRecommendation[] = [];
        
        // Get base recommendations from hero data
        hero.recommended_emblems.forEach(emblem => {
            recommendations.push({
                emblem: emblem.name,
                talents: emblem.talents.map(t => t.name),
                description: this.generateEmblemDescription(emblem, hero, enemyTeam),
                score: this.calculateEmblemScore(emblem, hero, enemyTeam)
            });
        });
        
        // Sort by score
        return recommendations.sort((a, b) => b.score - a.score);
    }

    private generateEmblemDescription(emblem: any, hero: Hero, enemyTeam: Hero[]): string {
        let description = `Recommended for ${hero.name}'s ${emblem.recommendedFor.join(', ')} playstyle. `;
        
        // Add context-based recommendations
        if (enemyTeam.some(e => e.role === 'Assassin')) {
            description += 'Good for surviving against assassins. ';
        }
        
        return description;
    }

    private calculateEmblemScore(emblem: any, hero: Hero, enemyTeam: Hero[]): number {
        let score = 0;
        
        // Base score from hero's recommended emblems
        if (hero.recommended_emblems.some(e => e.name === emblem.name)) {
            score += 5;
        }
        
        // Additional scoring based on enemy team composition
        // Add more complex scoring logic here
        
        return score;
    }
}