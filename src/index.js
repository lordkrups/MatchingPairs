import { app } from '../libs/renderer/index.js';
import { loadTextures, texturesThatAreLoaded } from '../libs/loader/loader.js';
import cardsManager from './cardsManager.js';
import gameScene from './gameScene.js';
import * as renderer from '../libs/renderer/index.js';
import { suits, cardsLayout, cardStates } from './gameConfigs.js';

// Importing GSAP and PixiPlugin for animations, don't like this way but it works for now
import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/index.js";
import { PixiPlugin } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/PixiPlugin.js";

gsap.registerPlugin(PixiPlugin);

export const STAGE_OBJECTS = {};

export const PLAYING_CARDS = [];

// GAME STATE VARIABLES
export let ATTEMPTS = 0;
export let SUCCESS = 0;
export let FAILURES = 0;

export let CURRENT_CARD = undefined;
export let PREVIOUS_CARD = undefined;


/**
 * The main game logic.
*/
export async function init() {
    // Set the game up, ready to use
    await renderer.setup();

    // Load the textures
    await loadTextures();

    // Initial setup of the game
    await cardsManager(onCardClick);

    // Start the game scene
    await gameScene();
}

// anonymous function to call when card if clicked
export function onCardClick(dataOfCard) {

    // LOGIC WIP
    // if (CURRENT_CARD === undefined) {
    //     CURRENT_CARD = dataOfCard;
    // } else if (PREVIOUS_CARD === undefined) {
    //     PREVIOUS_CARD = CURRENT_CARD;
    //     CURRENT_CARD = dataOfCard;
    // }

    if (dataOfCard.state === cardStates.faceDown) {
        ATTEMPTS++;
        moveShowLastCardIndicator(dataOfCard.cardSprite);
    } else {
        hideLastCardIndicator();
    }

    console.log(`Clicked on: ${dataOfCard.label}`);


}

function moveShowLastCardIndicator(cardSprite) {
    const lastCardIndicator = STAGE_OBJECTS.lastCardIndicator;

    lastCardIndicator.x = cardSprite.x + 80;
    lastCardIndicator.y = cardSprite.y + 200;
    lastCardIndicator.visible = true;
}

function hideLastCardIndicator() {
    STAGE_OBJECTS.lastCardIndicator.visible = false;
}
