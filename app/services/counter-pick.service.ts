import { Hero } from '../models/hero.model';

export class CounterPickService {
    calculateCounterScore(hero: Hero, enemyTeam: Hero[]): number {
        let score = 0;
        
        // Role effectiveness
        score += this.calculateRoleEffectiveness(hero, enemyTeam);
        
        // Direct counters
        score += this.calculateDirectCounters(hero, enemyTeam);
        
        // Team composition synergy
        score += this.calculateTeamSynergy(hero, enemyTeam);
        
        return score;
    }

    private calculateRoleEffectiveness(hero: Hero, enemyTeam: Hero[]): number {
        let score = 0;
        const enemyRoles = enemyTeam.map(h => h.role);
        
        // Role-based scoring
        switch(hero.role) {
            case 'Tank':
                score += enemyRoles.filter(r => r === 'Marksman' || r === 'Mage').length * 2;
                break;
            case 'Assassin':
                score += enemyRoles.filter(r => r === 'Marksman' || r === 'Mage').length * 2;
                break;
            case 'Marksman':
                score += enemyRoles.filter(r => r === 'Tank' || r === 'Fighter').length * 1.5;
                break;
            // Add more role-based calculations
        }
        
        return score;
    }

    private calculateDirectCounters(hero: Hero, enemyTeam: Hero[]): number {
        let score = 0;
        
        enemyTeam.forEach(enemy => {
            if (hero.counters.strong_against.includes(enemy.name)) {
                score += 2;
            }
            if (hero.counters.weak_against.includes(enemy.name)) {
                score -= 2;
            }
        });
        
        return score;
    }

    private calculateTeamSynergy(hero: Hero, enemyTeam: Hero[]): number {
        // Calculate how well the hero's abilities counter enemy team composition
        let score = 0;
        
        // Example: If enemy has high mobility heroes, heroes with CC get bonus points
        const hasHighMobility = enemyTeam.some(enemy => 
            enemy.type.includes('Mobility') || enemy.type.includes('Burst'));
        
        if (hasHighMobility && hero.skills.some(skill => 
            skill.effects.includes('Stun') || skill.effects.includes('Slow'))) {
            score += 1.5;
        }
        
        return score;
    }
}