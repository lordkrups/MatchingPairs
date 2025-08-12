// Third-party libs
import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/index.js";
import { PixiPlugin } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/PixiPlugin.js";
const { Sprite, Container, Text } = PIXI;

// Local libs and modules
import { app } from '../libs/renderer/index.js';
import * as renderer from '../libs/renderer/index.js';
import { loadTextures, texturesThatAreLoaded } from '../libs/loader/loader.js';

import cardsManager, { flipCard, makeMatchedCardsNonInteractive, makeCardsNonInteractive, resetCards } from './cardsManager.js';
import gameScene from './gameScene.js';

import { cardStates, gameState, maxAttempts } from './gameConfigs.js';

gsap.registerPlugin(PixiPlugin);

// Global variables
export const STAGE_OBJECTS = {};
export const PLAYING_CARDS = [];

// GAME STATE VARIABLES
export let GAME_STATE = gameState.init;

export let ATTEMPTS = 0;
export let SUCCESS = 0;
export let FAILURES = 0;

export const CARD_STATES = {
    CURRENT_CARD: undefined,
    PREVIOUS_CARD: undefined
};

let poop = true; // Set to false to skip game setup

/**
 * The main game logic.
*/
export async function init() {
    if (GAME_STATE === gameState.init) {
        // Set the game up, ready to use
        await renderer.setup();

        // Load the textures
        await loadTextures();

        // Setup cards, pass callback for card click handling
        cardsManager(onCardClick);

        // Initial setup of the game
        await gameScene();

        instantiateClickCatcher(app.stage);

        GAME_STATE = gameState.playing;
    }


    await waitForAllCardsToBeMatched();
}

async function waitForAllCardsToBeMatched(cardSprite) {
    // Waits for all cards to be matched, naughty but works
    return new Promise(resolve => {
        const checkInterval = setInterval(() => {
            if (PLAYING_CARDS.every(card => card.state === cardStates.matched)) {
                clearInterval(checkInterval);
                resolve();
                allCardsMatched();
            }

            if (ATTEMPTS >= maxAttempts) {
                clearInterval(checkInterval);
                resolve();
                tooManyAttempts();
            }
        }, 500);
    });
}

async function allCardsMatched() {

    const winSprite = STAGE_OBJECTS.winSprite;
    winSprite.alpha = 0;
    winSprite.visible = true;
    STAGE_OBJECTS.restartText.visible = true;
    await gsap.to(winSprite, {
        // pixi: { scaleX: 1, scaleY: 1},
        pixi: { alpha: 1 },
        duration: 1,
    });

    GAME_STATE = gameState.won;

    STAGE_OBJECTS.clickCatcher.interactive = true;
    console.log('ALL CARDS MATCHED.');
    console.log('WON');
}

async function tooManyAttempts() {
    makeCardsNonInteractive();

    const loseSprite = STAGE_OBJECTS.loseSprite;
    loseSprite.alpha = 0;
    loseSprite.visible = true;
    STAGE_OBJECTS.restartText.visible = true;

    await gsap.to(loseSprite, {
        // pixi: { scaleX: 1, scaleY: 1},
        pixi: { alpha: 1 },
        duration: 1,
    });

    GAME_STATE = gameState.lost;

    STAGE_OBJECTS.clickCatcher.interactive = true;
    console.log('Game Over! Too many attempts.');
    console.log('LOSE');
}

export function onCardClick(dataOfCard) {
    // Move and show the last card indicator if the card is now face up
    if (dataOfCard.state === cardStates.faceUp) {
        moveShowLastCardIndicator(dataOfCard.cardSprite);
    } else {
        hideLastCardIndicator();
    }

    performCardChecks(dataOfCard);
}

function performCardChecks(dataOfCard) {
    if (!CARD_STATES.CURRENT_CARD) {
        // No card selected yet, set current
        CARD_STATES.CURRENT_CARD = dataOfCard;
        return;
    }

    // If clicked the same card again, ignore
    if (CARD_STATES.CURRENT_CARD.label === dataOfCard.label) {
        CARD_STATES.CURRENT_CARD = undefined;
        return;
    }

    if (!CARD_STATES.PREVIOUS_CARD) {
        // Have a current, but no previous, Increment attempts
        ATTEMPTS++;
        // Move current to previous and set new current
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
            hideLastCardIndicator();

            // Clear selections after match
            CARD_STATES.CURRENT_CARD = undefined;
            CARD_STATES.PREVIOUS_CARD = undefined;
        } else {
            // Cards do NOT match
            flipCard(CARD_STATES.CURRENT_CARD, true);
            flipCard(CARD_STATES.PREVIOUS_CARD, true);
            FAILURES++;
            hideLastCardIndicator();
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

function instantiateClickCatcher(stage) {
    const clickCatcher = new Container();
    clickCatcher.name = 'clickCatcher';
    clickCatcher.x = 0;
    clickCatcher.y = 0;
    clickCatcher.width = app.screen.width;
    clickCatcher.height = app.screen.height;
    stage.addChild(clickCatcher);
    STAGE_OBJECTS.clickCatcher = clickCatcher;

    // Add a transparent sprite to catch clicks for resetting the game
    const transparentSprite = new Sprite();
    transparentSprite.width = app.screen.width;
    transparentSprite.height = app.screen.height;
    transparentSprite.interactive = false;
    clickCatcher.addChild(transparentSprite);

    STAGE_OBJECTS.clickCatcher.on('pointerdown', () => {
        STAGE_OBJECTS.clickCatcher.interactive = false;
        resetGame();
    });

    function resetGame() {
        // Reset game state and UI elements
        ATTEMPTS = 0;
        SUCCESS = 0;
        FAILURES = 0;
        updateGameStats();

        CARD_STATES.CURRENT_CARD = undefined;
        CARD_STATES.PREVIOUS_CARD = undefined;

        resetCards();

        // Reset UI elements
        STAGE_OBJECTS.attemptCounterText.text = `Attempts: ${ATTEMPTS}`;
        STAGE_OBJECTS.successCounterText.text = `Success: ${SUCCESS}`;
        STAGE_OBJECTS.failedCounterText.text = `Failures: ${FAILURES}`;
        STAGE_OBJECTS.lastCardIndicator.visible = false;

        // Hide win/lose sprites
        STAGE_OBJECTS.winSprite.visible = false;
        STAGE_OBJECTS.loseSprite.visible = false;
        STAGE_OBJECTS.restartText.visible = false;

        // debugger;

        init(); // Reinitialize the game
    }
}