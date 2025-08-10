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
        { name: 'lastCard', x: 786, y: 868, width: 134, height: 84 },

    ];

    const textures = await loadTextures('../../assets/PairsSheet.png', frames);

    // const scaleContainer = new PIXI.Container();
    // stage.addChild(scaleContainer);



    makeTextBoxs(stage, textures);
    makeCards(stage, textures);
    makeFrame(stage, textures);

    const lastCard = new PIXI.Sprite(textures.lastCard);
    lastCard.x = 400;
    lastCard.y = 100;
    stage.addChild(lastCard);
}

function makeCards(scaleContainer, textures) {
    const spade = new PIXI.Sprite(textures.spadeCard);
    spade.x = 0;
    spade.y = 400;
    scaleContainer.addChild(spade);

    const heart = new PIXI.Sprite(textures.heartCard);
    heart.x = 200;
    heart.y = 400;
    scaleContainer.addChild(heart);

    const diamond = new PIXI.Sprite(textures.diamondCard);
    diamond.x = 400;
    diamond.y = 400;
    scaleContainer.addChild(diamond);

    const club = new PIXI.Sprite(textures.clubCard);
    club.x = 600;
    club.y = 400;
    scaleContainer.addChild(club);

    const back = new PIXI.Sprite(textures.backCard);
    back.x = 800;
    back.y = 400;
    scaleContainer.addChild(back);

    back.interactive = true;
    back.buttonMode = true;
    back.on('pointerdown', () => {
        printMsg();
    });
}

function printMsg(){
        console.log('Hello Banana!');
}

function makeFrame(scaleContainer, textures) {
    const bigFrame = new PIXI.Sprite(textures.bigFrame);
    bigFrame.x = 0;
    bigFrame.y = 0;
    bigFrame.scale = 1;
    scaleContainer.addChild(bigFrame);

    const historyFrame = new PIXI.Sprite(textures.historyFrame);
    historyFrame.x = 0;
    historyFrame.y = 0;
    historyFrame.scale = 1;
    scaleContainer.addChild(historyFrame);
}

function makeTextBoxs(scaleContainer, textures) {
    const balanceBox = new PIXI.Sprite(textures.balanceBox);
    balanceBox.x = 100;
    balanceBox.y = 100;
    balanceBox.scale = 1;
    scaleContainer.addChild(balanceBox);

    const winningsBox = new PIXI.Sprite(textures.winningsBox);
    winningsBox.x = 200;
    winningsBox.y = 200;
    winningsBox.scale = 1;
    scaleContainer.addChild(winningsBox);

    const savedWinningsBox = new PIXI.Sprite(textures.savedWinningsBox);
    savedWinningsBox.x = 300;
    savedWinningsBox.y = 300;
    savedWinningsBox.scale = 1;
    scaleContainer.addChild(savedWinningsBox);

    const winMsg = new PIXI.Sprite(textures.win);
    winMsg.x = 600;
    winMsg.y = 100;
    winMsg.scale = 1;
    scaleContainer.addChild(winMsg);

    const loseMsg = new PIXI.Sprite(textures.lose);
    loseMsg.x = 600;
    loseMsg.y = 300;
    loseMsg.scale = 1;
    scaleContainer.addChild(loseMsg);
}