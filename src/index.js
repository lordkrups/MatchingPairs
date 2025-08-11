import { loadTextures, texturesThatAreLoaded } from '../libs/loader/loader.js';
import cardsManager from './cardsManager.js';
import gameScene from './gameScene.js';
import * as renderer from '../libs/renderer/index.js';
import { cardStates } from './gameConfigs.js';
import { flipCard, makeMatchedCardsNonInteractive } from './cardsManager.js';

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


export const CARD_STATES = {
    CURRENT_CARD: undefined,
    PREVIOUS_CARD: undefined
};

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

export function onCardClick(dataOfCard) {
    if (dataOfCard.state === cardStates.faceUp) {
        moveShowLastCardIndicator(dataOfCard.cardSprite);
    } else {
        hideLastCardIndicator();
        // Do NOT reset CURRENT_CARD here!
    }

    console.log(`Clicked on: ${dataOfCard.label}`);

    if (!CARD_STATES.CURRENT_CARD) {
        // No card selected yet, set CURRENT_CARD
        CARD_STATES.CURRENT_CARD = dataOfCard;
        return;
    }

    // If clicked the same card again, ignore
    if (CARD_STATES.CURRENT_CARD.label === dataOfCard.label) {
        CARD_STATES.CURRENT_CARD = undefined;
        return;
    }

    if (!CARD_STATES.PREVIOUS_CARD) {
        ATTEMPTS++;
        // Move CURRENT_CARD to PREVIOUS_CARD and set new CURRENT_CARD
        CARD_STATES.PREVIOUS_CARD = CARD_STATES.CURRENT_CARD;
        CARD_STATES.CURRENT_CARD = dataOfCard;
    }

    // Now we have two cards selected, check match
    if (CARD_STATES.CURRENT_CARD && CARD_STATES.PREVIOUS_CARD) {
        if (CARD_STATES.CURRENT_CARD.suit === CARD_STATES.PREVIOUS_CARD.suit) {
            // Cards match
            SUCCESS++;
            // Set PLAYING_CARDS to matched state
            PLAYING_CARDS[CARD_STATES.CURRENT_CARD.arrayIndex].state = cardStates.matched;
            PLAYING_CARDS[CARD_STATES.PREVIOUS_CARD.arrayIndex].state = cardStates.matched;
            makeMatchedCardsNonInteractive();

            // Clear selections after match
            CARD_STATES.CURRENT_CARD = undefined;
            CARD_STATES.PREVIOUS_CARD = undefined;
        } else {
            // Cards do NOT match
            flipCard(CARD_STATES.CURRENT_CARD, true);
            flipCard(CARD_STATES.PREVIOUS_CARD, true);
            FAILURES++;
            // Clear selections after mismatch
            CARD_STATES.CURRENT_CARD = undefined;
            CARD_STATES.PREVIOUS_CARD = undefined;
        }
    }

    updateGameStats();
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

export function updateGameStats() {
    STAGE_OBJECTS.attemptCounterText.text = `Attempts: ${ATTEMPTS}`;
    STAGE_OBJECTS.successCounterText.text = `Success: ${SUCCESS}`;
    STAGE_OBJECTS.failedCounterText.text = `Failures: ${FAILURES}`;
}
