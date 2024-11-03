import { getString, setString } from '@nativescript/core/application-settings';

export class DatabaseService {
    private readonly HEROES_KEY = 'heroes_data';
    private readonly USER_PROFILE_KEY = 'user_profile';
    private readonly FAVORITES_KEY = 'favorite_heroes';

    saveHeroesData(data: any): void {
        setString(this.HEROES_KEY, JSON.stringify(data));
    }

    getHeroesData(): any {
        const data = getString(this.HEROES_KEY);
        return data ? JSON.parse(data) : null;
    }

    saveUserProfile(profile: any): void {
        setString(this.USER_PROFILE_KEY, JSON.stringify(profile));
    }

    getUserProfile(): any {
        const profile = getString(this.USER_PROFILE_KEY);
        return profile ? JSON.parse(profile) : null;
    }

    saveFavoriteHeroes(favorites: string[]): void {
        setString(this.FAVORITES_KEY, JSON.stringify(favorites));
    }

    getFavoriteHeroes(): string[] {
        const favorites = getString(this.FAVORITES_KEY);
        return favorites ? JSON.parse(favorites) : [];
    }
}