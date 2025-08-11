const { Assets, Texture, Rectangle } = PIXI;
import {assetList} from '../../src/assetLoadList.js';

export const texturesThatAreLoaded = {};

export async function loadTextures() {
    const textures = {};

    // Load individual images
    for (const img of assetList.individualImages) {
        const texture = await Assets.load(img.srcs);
        texturesThatAreLoaded[img.alias] = texture;
    }

    // Load sprite sheets with custom images
    for (const sheet of assetList.spriteSheets) {
        const baseTexture = await Assets.load(sheet.srcs);
        // textures[sheet.alias] = {};

        if (sheet.frames) {
            sheet.frames.forEach(frame => {
                texturesThatAreLoaded[frame.name] = new Texture({
                    source: baseTexture.source,
                    frame: new Rectangle(frame.x, frame.y, frame.width, frame.height),
                    alias: frame.name
                });
            });
        }
    }

    return texturesThatAreLoaded;
}