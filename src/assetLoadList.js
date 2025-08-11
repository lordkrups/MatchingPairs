export const assetList = {
    individualImages: [
        {
            alias: 'face',
            srcs: '../../assets/face.png'
        },
        {
            alias: 'crab',
            srcs: '../../assets/crab.png'
        },
        {
            alias: 'bird',
            srcs: '../../assets/bird.png'
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
        }
    ]
};

