import { texturesThatAreLoaded } from '../libs/loader/loader.js';
import { app } from '../libs/renderer/index.js';
const { Sprite, Container, Text } = PIXI;


export default async function init() {

    instantiateGameFrame();
}

function instantiateGameFrame() {
    const stage = app.stage;

    const attemptCounterFrame = new PIXI.Sprite(texturesThatAreLoaded.bigFrame);
    attemptCounterFrame.label = "attemptCounterFrame";
    attemptCounterFrame.x = 750;
    attemptCounterFrame.y = 625;
    attemptCounterFrame.angle = 90;
    stage.addChild(attemptCounterFrame);

    const historyContainer = new PIXI.Sprite(texturesThatAreLoaded.historyFrame);
    historyContainer.label = "historyContainer";
    historyContainer.x = 750;
    historyContainer.y = 625;
    stage.addChild(historyContainer);

    const lastCardIndicator = new PIXI.Sprite(texturesThatAreLoaded.lastCard);
    lastCardIndicator.label = "lastCardIndicator";
    lastCardIndicator.x = 750;
    lastCardIndicator.y = 625;
    lastCardIndicator.visible = false;
    stage.addChild(lastCardIndicator);
}