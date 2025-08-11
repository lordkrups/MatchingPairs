import { app } from '../libs/renderer/index.js';
import { loadTextures, texturesThatAreLoaded } from '../libs/loader/loader.js';
import gameScene from './gameScene.js';

// Importing GSAP and PixiPlugin for animations, don't like this way but it works for now
import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/index.js";
import { PixiPlugin } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/PixiPlugin.js";

gsap.registerPlugin(PixiPlugin);

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
    // makeFrame(stage, loadedTexts);

    // const lastCard = new PIXI.Sprite(loadedTexts.lastCard);
    // lastCard.x = 400;
    // lastCard.y = 100;
    // stage.addChild(lastCard);

    // const face = new PIXI.Sprite(loadedTexts.face);
    // face.x = 1200;
    // face.y = 50;
    // stage.addChild(face);

    const crab = new PIXI.Sprite(loadedTexts.crab);
    crab.x = 200;
    crab.y = 50;
    stage.addChild(crab);

    // To flip sprite
    await gsap.to(crab, {
        // pixi: { scaleX: 1, scaleY: 1},
        pixi: { scaleX: 0, scaleY: 1 },
        duration: 1,
    });

    // Change texture of crab
    crab.texture = loadedTexts.bird;

    await gsap.to(crab, {
        // pixi: { scaleX: 1, scaleY: 1},
        pixi: { scaleX: -1, scaleY: 1 },
        duration: 1,
    });

    // FromTo flip
    // gsap.fromTo(crab, {
    //     pixi: { scaleX: 1, scaleY: 1 }
    // }, {
    //     pixi: { scaleX: -1, scaleY: 1 },
    //     duration: 1,
    // });

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