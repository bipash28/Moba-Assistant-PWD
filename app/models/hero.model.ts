export interface Skill {
    name: string;
    description: string;
    cooldown: number;
    damage_type: 'Physical' | 'Magic' | 'True';
    effects: string[];
}

export interface Emblem {
    name: string;
    type: string;
    talents: {
        name: string;
        description: string;
    }[];
    recommendedFor: string[];
}

export interface Hero {
    id: string;
    name: string;
    role: string;
    type: string[];
    difficulty: string;
    bp_cost: number;
    diamond_cost: number;
    skills: Skill[];
    pros: string[];
    cons: string[];
    counters: {
        strong_against: string[];
        weak_against: string[];
        synergizes_with: string[];
    };
    recommended_emblems: Emblem[];
    recommended_spells: string[];
    recommended_builds: {
        name: string;
        items: string[];
        description: string;
    }[];
    laning_tips: string[];
    teamfight_tips: string[];
    early_game: string[];
    mid_game: string[];
    late_game: string[];
}

// Example of a more detailed hero entry
export const heroes: Hero[] = [
    {
        id: '1',
        name: 'Layla',
        role: 'Marksman',
        type: ['Burst', 'Poke'],
        difficulty: 'Easy',
        bp_cost: 32000,
        diamond_cost: 599,
        skills: [
            {
                name: 'Malefic Gun',
                description: 'Increases attack range and physical attack with each level',
                cooldown: 0,
                damage_type: 'Physical',
                effects: ['Range Increase', 'Damage Boost']
            },
            {
                name: 'Void Projectile',
                description: 'Fires an energy ball that deals Physical Damage',
                cooldown: 8.5,
                damage_type: 'Physical',
                effects: ['Slow']
            }
        ],
        pros: ['Long Range', 'High Late Game Damage', 'Easy to Learn'],
        cons: ['No Mobility', 'Weak Early Game', 'Vulnerable to Assassins'],
        counters: {
            strong_against: ['Balmond', 'Tigreal', 'Minotaur'],
            weak_against: ['Lancelot', 'Gusion', 'Natalia'],
            synergizes_with: ['Franco', 'Tigreal', 'Atlas']
        },
        recommended_emblems: [
            {
                name: 'Weapon Master',
                type: 'Physical',
                talents: [
                    {
                        name: 'Physical Attack',
                        description: '+8.00 Physical Attack'
                    }
                ],
                recommendedFor: ['Basic Attack', 'Late Game']
            }
        ],
        recommended_spells: ['Flicker', 'Purify'],
        recommended_builds: [
            {
                name: 'Critical Damage Build',
                items: [
                    'Swift Boots',
                    'Berserker\'s Fury',
                    'Scarlet Phantom',
                    'Endless Battle',
                    'Windtalker',
                    'Blade of Despair'
                ],
                description: 'Maximizes critical damage output'
            }
        ],
        laning_tips: [
            'Stay behind minions',
            'Focus on last hitting',
            'Don\'t push too far without vision'
        ],
        teamfight_tips: [
            'Position behind tanks',
            'Focus on closest enemy',
            'Save Flicker for escape'
        ],
        early_game: [
            'Focus on farming',
            'Play defensively',
            'Wait for boots before engaging'
        ],
        mid_game: [
            'Group for objectives',
            'Stay with support',
            'Prioritize tower damage'
        ],
        late_game: [
            'Position carefully',
            'Focus on damage output',
            'Stay with team'
        ]
    }
];