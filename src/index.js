import { app } from '../libs/renderer/index.js';
import { loadTextures } from '../libs/loader/index.js';


/**
 * The main game logic.
*/
export async function init() {
    // You now have access to app.stage here
    const stage = app.stage;

    // Example: add a test graphic to stage
    // const graphic = new PIXI.Graphics();
    // graphic.beginFill(0xff0000);
    // graphic.drawRect(0, 0, 100, 100);
    // graphic.endFill();
    // stage.addChild(graphic);

    const frames = [
        { name: 'bigFrame', x: 0, y: 0, width: 440, height: 590 },
        { name: 'balanceBox', x: 444, y: 0, width: 330, height: 106 },
        { name: 'winningsBox', x: 458, y: 114, width: 330, height: 106 },
        { name: 'savedWinningsBox', x: 448, y: 225, width: 348, height: 106 },
        { name: 'spadeCard', x: 440, y: 334, width: 190, height: 264 },
        { name: 'heartCard', x: 629, y: 334, width: 190, height: 264 },
        { name: 'diamondCard', x: 818, y: 334, width: 190, height: 264 },
        { name: 'clubCard', x: 818, y: 599, width: 190, height: 264 },
        { name: 'backCard', x: 629, y: 599, width: 190, height: 264 },
        { name: 'poop', x: 629, y: 599, width: 190, height: 264 },

    ];

    const textures = await loadTextures('../../assets/PairsSheet.png', frames);

    const scaleContainer = new PIXI.Container();
    stage.addChild(scaleContainer);

    const poopy = new PIXI.Sprite(textures.poop);
    poopy.x = 0;
    poopy.y = 0;
    poopy.scale = 1;
    scaleContainer.addChild(poopy);



    makeCards(scaleContainer, textures);
}

function makeCards(scaleContainer, textures) {
    const spade = new PIXI.Sprite(textures.spadeCard);
    spade.x = 0;
    spade.y = 270;
    scaleContainer.addChild(spade);

    const heart = new PIXI.Sprite(textures.heartCard);
    heart.x = 200;
    heart.y = 270;
    scaleContainer.addChild(heart);

    const diamond = new PIXI.Sprite(textures.diamondCard);
    diamond.x = 400;
    diamond.y = 270;
    scaleContainer.addChild(diamond);

    const club = new PIXI.Sprite(textures.clubCard);
    club.x = 600;
    club.y = 270;
    scaleContainer.addChild(club);
}