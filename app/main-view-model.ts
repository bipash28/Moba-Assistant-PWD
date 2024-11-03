import { Observable } from '@nativescript/core';
import { Hero, heroes } from './models/hero.model';
import { RecommendationsService } from './services/recommendations.service';
import { ScreenAnalysisService } from './services/screen-analysis.service';
import { MLBBApiService } from './services/mlbb-api.service';

export class MainViewModel extends Observable {
    private _heroes: Hero[] = heroes;
    private _searchQuery: string = '';
    private _isAnalyzing: boolean = false;
    private recommendationsService: RecommendationsService;
    private screenAnalysisService: ScreenAnalysisService;
    private mlbbApiService: MLBBApiService;

    constructor() {
        super();
        this.recommendationsService = new RecommendationsService();
        this.screenAnalysisService = new ScreenAnalysisService();
        this.mlbbApiService = new MLBBApiService();
        this.initializeApp();
    }

    private async initializeApp(): Promise<void> {
        // Update hero database from API
        await this.mlbbApiService.updateLocalDatabase();
        
        // Refresh the heroes list
        const databaseService = new DatabaseService();
        const updatedHeroes = databaseService.getHeroesData();
        if (updatedHeroes) {
            this._heroes = updatedHeroes;
            this.notifyPropertyChange('heroes', this.heroes);
        }
    }

    get heroes(): Hero[] {
        return this._heroes.filter(hero => 
            hero.name.toLowerCase().includes(this._searchQuery.toLowerCase()) ||
            hero.role.toLowerCase().includes(this._searchQuery.toLowerCase())
        );
    }

    get searchQuery(): string {
        return this._searchQuery;
    }

    set searchQuery(value: string) {
        if (this._searchQuery !== value) {
            this._searchQuery = value;
            this.notifyPropertyChange('searchQuery', value);
            this.notifyPropertyChange('heroes', this.heroes);
        }
    }

    get isAnalyzing(): boolean {
        return this._isAnalyzing;
    }

    async startScreenAnalysis(): Promise<void> {
        try {
            this._isAnalyzing = true;
            this.notifyPropertyChange('isAnalyzing', true);
            await this.screenAnalysisService.startAnalysis();
        } catch (error) {
            console.error('Failed to start screen analysis:', error);
            this._isAnalyzing = false;
            this.notifyPropertyChange('isAnalyzing', false);
        }
    }

    onSearch(args: any) {
        this.searchQuery = args.object.text;
    }

    onHeroSelect(args: any) {
        const selectedHero = this.heroes[args.index];
        console.log('Selected hero:', selectedHero.name);
        // Navigate to hero details page
    }
}