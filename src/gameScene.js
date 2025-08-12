import { texturesThatAreLoaded } from '../libs/loader/loader.js';
import { app } from '../libs/renderer/index.js';
const { Sprite, Text } = PIXI;
import { STAGE_OBJECTS } from './index.js';


export default async function init() {
    const stage = app.stage;

    instantiateCounterFrame(stage);
    instantiateCardIndicator(stage);
    instantiateWinLose(stage);
    // instantiateHistory(stage);
}

function instantiateCounterFrame(stage) {

    const attemptCounterFrame = new Sprite(texturesThatAreLoaded.bigFrame);
    attemptCounterFrame.label = "attemptCounterFrame";
    attemptCounterFrame.x = 750;
    attemptCounterFrame.y = 625;
    attemptCounterFrame.angle = 90;
    stage.addChild(attemptCounterFrame);
    STAGE_OBJECTS.attemptCounterFrame = attemptCounterFrame;

    const attemptCounterText = new Text('Attempts: 0', {
        fontSize: 50,
        fill: '#ffffff',
        align: 'center'
    });
    attemptCounterText.anchor.set(0.5);
    attemptCounterText.x = 100;
    attemptCounterText.y = 300;
    attemptCounterText.angle = -90;
    attemptCounterFrame.addChild(attemptCounterText);
    STAGE_OBJECTS.attemptCounterText = attemptCounterText;

    const successCounterText = new Text('Success: 0', {
        fontSize: 50,
        fill: '#ffffff',
        align: 'center'
    });
    successCounterText.anchor.set(0.5);
    successCounterText.x = 200;
    successCounterText.y = 300;
    successCounterText.angle = -90;
    attemptCounterFrame.addChild(successCounterText);
    STAGE_OBJECTS.successCounterText = successCounterText;

    const failedCounterText = new Text('Failures: 0', {
        fontSize: 50,
        fill: '#ffffff',
        align: 'center'
    });
    failedCounterText.anchor.set(0.5);
    failedCounterText.x = 300;
    failedCounterText.y = 300;
    failedCounterText.angle = -90;
    attemptCounterFrame.addChild(failedCounterText);
    STAGE_OBJECTS.failedCounterText = failedCounterText;
}

function instantiateCardIndicator(stage) {
    const lastCardIndicator = new Sprite(texturesThatAreLoaded.lastCard);
    lastCardIndicator.label = "lastCardIndicator";
    lastCardIndicator.x = 750;
    lastCardIndicator.y = 625;
    lastCardIndicator.visible = false;
    stage.addChild(lastCardIndicator);
    STAGE_OBJECTS.lastCardIndicator = lastCardIndicator;
}

function instantiateHistory(stage) {
    const historyContainer = new Sprite(texturesThatAreLoaded.historyFrame);
    historyContainer.label = "historyContainer";
    historyContainer.x = 750;
    historyContainer.y = 625;
    stage.addChild(historyContainer);
    STAGE_OBJECTS.historyContainer = historyContainer;
}

function instantiateWinLose(stage) {
    const winSprite = new Sprite(texturesThatAreLoaded.win);
    winSprite.label = "winSprite";
    winSprite.x = 1000;
    winSprite.y = 625;
    winSprite.visible = false;
    stage.addChild(winSprite);
    STAGE_OBJECTS.winSprite = winSprite;

    const loseSprite = new Sprite(texturesThatAreLoaded.lose);
    loseSprite.label = "loseSprite";
    loseSprite.x = 1000;
    loseSprite.y = 625;
    loseSprite.visible = false;
    stage.addChild(loseSprite);
    STAGE_OBJECTS.loseSprite = loseSprite;
}