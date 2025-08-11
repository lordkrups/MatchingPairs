import { app } from '../libs/renderer/index.js';
import { loadTextures, texturesThatAreLoaded } from '../libs/loader/loader.js';
import cardsManager from './cardsManager.js';
import gameScene from './gameScene.js';
import * as renderer from '../libs/renderer/index.js';

// Importing GSAP and PixiPlugin for animations, don't like this way but it works for now
import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/index.js";
import { PixiPlugin } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/PixiPlugin.js";

gsap.registerPlugin(PixiPlugin);

export const STAGE_OBJECTS = {};

export const PLAYING_CARDS = [];


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

    const foundThing = app.stage.getChildByName("cardSelectorContainer");
    console.log(foundThing); // returns thing

    // const stage = app.stage;

    // debugger;

    // Start the game scene
    // await gameScene();
}

// anonymous function to call when card if clicked
export function onCardClick(card) {
    console.log(`Clicked on: ${card.label}`);
}
