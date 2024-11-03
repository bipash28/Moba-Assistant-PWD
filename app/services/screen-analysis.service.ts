import { ImageSource } from '@nativescript/core';
import { WorkerService } from './worker.service';

export class ScreenAnalysisService {
    private worker: WorkerService;
    private analysisCache = new Map<string, any>();
    private readonly CACHE_DURATION = 5000; // 5 seconds

    constructor() {
        this.worker = new WorkerService();
    }

    async startAnalysis(): Promise<void> {
        try {
            const mediaProjection = await this.requestScreenCapture();
            if (mediaProjection) {
                // Use requestAnimationFrame for smoother performance
                const analyze = () => {
                    this.analyzeFrame(mediaProjection).catch(console.error);
                    requestAnimationFrame(analyze);
                };
                requestAnimationFrame(analyze);
            }
        } catch (error) {
            console.error('Failed to start screen capture:', error);
        }
    }

    private async analyzeFrame(mediaProjection: any): Promise<void> {
        const screenshot = await this.captureScreen(mediaProjection);
        const hash = await this.imageHash(screenshot);
        
        // Check cache first
        const cached = this.analysisCache.get(hash);
        if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
            return cached.data;
        }

        // Offload heavy processing to worker
        const result = await this.worker.analyzeImage(screenshot);
        
        // Cache result
        this.analysisCache.set(hash, {
            timestamp: Date.now(),
            data: result
        });

        return result;
    }

    // Perceptual hash for image comparison
    private async imageHash(image: ImageSource): Promise<string> {
        const size = 8;
        const scaled = image.resize(size, size);
        const data = scaled.toGrayscale().getPixels();
        return data.reduce((hash, pixel) => hash + (pixel > 128 ? '1' : '0'), '');
    }
}