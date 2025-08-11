import { app } from '../libs/renderer/index.js';
import { loadTextures, texturesThatAreLoaded } from '../libs/loader/loader.js';
import gameScene from './gameScene.js';

/**
 * The main game logic.
*/
export async function init() {
    // You now have access to app.stage here
    const stage = app.stage;
    const canGetLikeThisToo = await loadTextures();
    const loadedTexts = texturesThatAreLoaded;

    await gameScene(); // instead of gameScene.init();

    // makeTextBoxs(stage, loadedTexts);
    // makeCards(stage, loadedTexts);
    makeFrame(stage, loadedTexts);

    // const lastCard = new PIXI.Sprite(loadedTexts.lastCard);
    // lastCard.x = 400;
    // lastCard.y = 100;
    // stage.addChild(lastCard);

    // const face = new PIXI.Sprite(loadedTexts.face);
    // face.x = 1200;
    // face.y = 50;
    // stage.addChild(face);

    // const test = new PIXI.Sprite(loadedTexts.crab);
    // test.x = 200;
    // test.y = 50;
    // stage.addChild(test);

    // const bird = new PIXI.Sprite(loadedTexts.bird);
    // bird.x = 500;
    // bird.y = 50;
    // stage.addChild(bird);
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

function printMsg() {
    console.log('Hello Banana!!');
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