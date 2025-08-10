// // PIXI's asset loader module
// const { Assets } = PIXI;

// const manifest = {
//     bundles: [
//         {
//             name: 'main',
//             assets: [
//                 {
//                     alias: 'face',
//                     srcs: '../../assets/face.png'
//                 },
//                 {
//                     alias: 'pairsSheet',
//                     srcs: '../../assets/PairsSheet.png'
//                 }
//             ]
//         }
//     ]
// };

// /**
//  * Load all required assets before game starts.
//  */
// export async function loadAssets() {
//     // await Assets.init({ manifest });
//     // await Assets.loadBundle('main');

//     Assets.addBundle('animals', [
//         { alias: 'face', src: '../../assets/face.png' },
//         { alias: 'pairsSheet', src: '../../assets/pairsSheet.png' },
//     ]);

//     const assets = await Assets.loadBundle('animals');
// }

// /**
//  * Get a texture by name.
//  * @param {string} name 
//  * @returns {PIXI.Texture}
//  */
// export function getTexture(name) {
//     return Assets.get(name);
// }

const { Assets, Texture, Rectangle } = PIXI;

/**
 * Load a sprite sheet and extract textures.
 * 
 * @param {string} source - Path to JSON atlas or PNG.
 * @param {Object[]} [frames] - Optional array of frame definitions if no JSON.
 * @param {string} [frames[].name] - Name for the frame.
 * @param {number} [frames[].x] - X position in sheet.
 * @param {number} [frames[].y] - Y position in sheet.
 * @param {number} [frames[].width] - Width of frame.
 * @param {number} [frames[].height] - Height of frame.
 * 
 * @returns {Promise<Object>} - Dictionary of textures.
 */
export async function loadTextures(source, frames) {
    const asset = await Assets.load(source);
    const textures = {};

    if (asset.textures) {
        // Case 1: JSON atlas with pre-defined frames
        Object.assign(textures, asset.textures);
    } else if (frames && frames.length > 0) {
        // Case 2: PNG + manual frame definitions
        frames.forEach(frame => {
            textures[frame.name] = new Texture({
                source: asset.source,
                frame: new Rectangle(frame.x, frame.y, frame.width, frame.height)
            });
        });
    } else {
        throw new Error('No frame data found. Provide a JSON atlas or manual frame definitions.');
    }

    return textures;
}