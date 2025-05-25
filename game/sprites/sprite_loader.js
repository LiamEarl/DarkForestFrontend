import { Assets } from 'pixi.js';

export class Loader {
    constructor() {
        this.images = new Map();
    }

    async load() {
        const assetList = [
            'spacebackground.png',
            'Planet1.png',
            'Planet2.png',
            'Planet3.png',
            'Planet4.png',
            'Planet5.png',
            'Planet6.png',
            'Planet7.png',
            'Planet8.png',
            'Planet9.png',
            'Planet10.png',
            'Planet11.png',
            'Planet12.png'
        ];

        for (const file of assetList) {
            const name = file.substring(0, file.length - 4);

            const url = `/assets/${file}`;

            console.log(`Attempting to add asset: ${name} at ${url}`);

            try {
                Assets.add({ alias: name, src: url });

                const texture = await Assets.load(name);
                this.images.set(name, texture);
            } catch (err) {
                console.error(`Failed to load ${url}:`, err);
            }
        }
    }

    get_images() {
        return this.images;
    }
}