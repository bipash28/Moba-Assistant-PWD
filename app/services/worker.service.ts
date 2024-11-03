export class WorkerService {
    private worker: Worker;

    constructor() {
        this.worker = new Worker('./analysis.worker');
    }

    async analyzeImage(imageData: any): Promise<any> {
        return new Promise((resolve) => {
            this.worker.postMessage({ imageData });
            this.worker.onmessage = (e) => resolve(e.data);
        });
    }
}