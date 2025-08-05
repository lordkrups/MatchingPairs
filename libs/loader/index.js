// PIXI's asset loader module
const { Assets } = PIXI;

const manifest = {
    bundles: [
        {
            name: 'main',
            assets: [
                {
                    alias: 'face',
                    srcs: '../../assets/face.png'
                },
                {
                    alias: 'pairsSheet',
                    srcs: '../../assets/PairsSheet.png'
                }
            ]
        }
    ]
};

/**
 * Load all required assets before game starts.
 */
export async function loadAssets() {
    // await Assets.init({ manifest });
    // await Assets.loadBundle('main');

    Assets.addBundle('animals', [
        { alias: 'face', src: '../../assets/face.png' },
        { alias: 'pairsSheet', src: '../../assets/pairsSheet.png' },
    ]);

    const assets = await Assets.loadBundle('animals');
}

/**
 * Get a texture by name.
 * @param {string} name 
 * @returns {PIXI.Texture}
 */
export function getTexture(name) {
    return Assets.get(name);
}
