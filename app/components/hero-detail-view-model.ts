import { Observable } from '@nativescript/core';
import { Hero } from '../models/hero.model';
import { DatabaseService } from '../services/database.service';

export class HeroDetailViewModel extends Observable {
    private _hero: Hero;
    private _isFavorite: boolean;
    private databaseService: DatabaseService;

    constructor(hero: Hero) {
        super();
        this._hero = hero;
        this.databaseService = new DatabaseService();
        this._isFavorite = this.databaseService.getFavoriteHeroes().includes(hero.id);
    }

    get hero(): Hero {
        return this._hero;
    }

    get isFavorite(): boolean {
        return this._isFavorite;
    }

    toggleFavorite() {
        const favorites = this.databaseService.getFavoriteHeroes();
        if (this._isFavorite) {
            const index = favorites.indexOf(this._hero.id);
            favorites.splice(index, 1);
        } else {
            favorites.push(this._hero.id);
        }
        this.databaseService.saveFavoriteHeroes(favorites);
        this._isFavorite = !this._isFavorite;
        this.notifyPropertyChange('isFavorite', this._isFavorite);
    }
}