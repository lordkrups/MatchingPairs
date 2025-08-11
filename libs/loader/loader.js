const { Assets, Texture, Rectangle } = PIXI;

const filesToLoad = {
    individualImages: [
        {
            alias: 'face',
            srcs: '../../assets/face.png'
        }
    ],
    spriteSheets: [
        {
            alias: 'pairsSheet',
            srcs: '../../assets/PairsSheet.png',
            frames: [
                { name: 'bigFrame', x: 0, y: 0, width: 440, height: 590 },
                { name: 'historyFrame', x: 0, y: 610, width: 624, height: 250 },

                { name: 'balanceBox', x: 444, y: 0, width: 330, height: 106 },
                { name: 'winningsBox', x: 458, y: 114, width: 330, height: 106 },
                { name: 'savedWinningsBox', x: 448, y: 225, width: 348, height: 106 },

                { name: 'spadeCard', x: 440, y: 334, width: 190, height: 264 },
                { name: 'heartCard', x: 629, y: 334, width: 190, height: 264 },
                { name: 'diamondCard', x: 818, y: 334, width: 190, height: 264 },
                { name: 'clubCard', x: 818, y: 599, width: 190, height: 264 },
                { name: 'backCard', x: 629, y: 599, width: 190, height: 264 },

                { name: 'lose', x: 0, y: 865, width: 400, height: 158 },
                { name: 'win', x: 410, y: 865, width: 374, height: 158 },
                { name: 'lastCard', x: 786, y: 868, width: 134, height: 84 }
            ]
        },
        {
            alias: 'imageTest',
            srcs: '../../assets/ss.json'
        }
    ]
};

export const texturesThatAreLoaded = {};

export async function loadTextures() {
    const textures = {};

    // Load individual images
    for (const img of filesToLoad.individualImages) {
        const texture = await Assets.load(img.srcs);
        texturesThatAreLoaded[img.alias] = texture;
    }

    // Load sprite sheets with custom images
    for (const sheet of filesToLoad.spriteSheets) {
        const baseTexture = await Assets.load(sheet.srcs);
        // textures[sheet.alias] = {};

        if (sheet.frames) {
            sheet.frames.forEach(frame => {
                texturesThatAreLoaded[frame.name] = new Texture({
                    source: baseTexture.source,
                    frame: new Rectangle(frame.x, frame.y, frame.width, frame.height)
                });
            });
        } else { // NEEDS TESTING!
            const sSheet = await Assets.load(sheet.srcs);
            const key = Object.keys(sSheet);
            for (const imgLine in sSheet) {
                const frame = sSheet[imgLine];
                texturesThatAreLoaded[baseTexture.key] = new Texture({
                    source: baseTexture.source,
                    frame: new Rectangle(frame.frame.x, frame.frame.y, frame.frame.w, frame.frame.h)
                });
            }
        }
    }

    return texturesThatAreLoaded;
}