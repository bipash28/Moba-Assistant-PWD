import { Http } from '@nativescript/core';

export class TranslationService {
    private readonly SUPPORTED_LANGUAGES = [
        'hi', 'bn', 'id', 'tl', 'ms', 'my', // Hindi, Bengali, Indonesian, Tagalog, Malay, Burmese
        'th', 'vi', 'km', 'lo' // Thai, Vietnamese, Khmer, Lao
    ];

    private translationCache = new Map<string, {
        translation: string;
        timestamp: number;
    }>();
    private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

    async translateChat(text: string, fromLang: string, toLang: string = 'en'): Promise<string> {
        const cacheKey = `${text}_${fromLang}_${toLang}`;
        const cached = this.translationCache.get(cacheKey);

        if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
            return cached.translation;
        }

        try {
            // Using LibreTranslate API (self-hosted or public instance)
            const response = await Http.request({
                url: 'https://libretranslate.com/translate',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                content: JSON.stringify({
                    q: text,
                    source: fromLang,
                    target: toLang
                })
            });

            const result = response.content.toJSON();
            this.translationCache.set(cacheKey, {
                translation: result.translatedText,
                timestamp: Date.now()
            });

            return result.translatedText;
        } catch (error) {
            console.error('Translation failed:', error);
            return text; // Return original text if translation fails
        }
    }

    detectLanguage(text: string): Promise<string> {
        // Implement language detection using n-gram analysis
        // This is a simplified version
        return new Promise((resolve) => {
            // Add proper language detection logic
            resolve('en');
        });
    }
}