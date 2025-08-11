import { texturesThatAreLoaded } from '../libs/loader/loader.js';
import { app } from '../libs/renderer/index.js';
import { STAGE_OBJECTS, PLAYING_CARDS } from './index.js';
const { Sprite, Container, Text } = PIXI;
import { suits, cardsLayout } from './gameConfigs.js';


export default async function init() {
    const stage = app.stage;

    // Create a container for the cards
    const cardContainer = new Container();
    cardContainer.name = 'cardSelectorContainer';
    cardContainer.x = 50;
    cardContainer.y = 50;
    stage.addChild(cardContainer);

    STAGE_OBJECTS.cardSelectorContainer = cardContainer;

    // Create cards based on suits and numbers
    instantiateCards(cardContainer, texturesThatAreLoaded);

    makeCardsInteractive();
    // makeCardsNonInteractive();
}

function instantiateCards(cardContainer, textures) {
    const suitList = Object.values(suits);
    const cardNumbers = [1, 2, 3, 4]; // Can be changed to however many you have

    for (let num of cardNumbers) {
        for (let suit of suitList) {
            PLAYING_CARDS.push({ suit, num });
        }
    }

    // Place them
    PLAYING_CARDS.forEach((cardData, i) => {
        const row = Math.floor(i / cardsLayout.cardsPerRow);
        const col = i % cardsLayout.cardsPerRow;

        const card = new Sprite(texturesThatAreLoaded[`${cardData.suit}Card`]);
        card.label = `${cardData.suit}${cardData.num}`;
        card.x = cardsLayout.startX + col * cardsLayout.colSpacing;
        card.y = cardsLayout.startY + row * cardsLayout.rowSpacing;

        cardContainer.addChild(card);
    });
}

function makeCardsInteractive() {
    PLAYING_CARDS.forEach(cardData => {
        const card = STAGE_OBJECTS.cardSelectorContainer.getChildByName(`${cardData.suit}${cardData.num}`);
        if (card) {
            card.interactive = true;
            card.on('pointerdown', () => {
                console.log(`Clicked on: ${card.label}`);
            });
        }
    });
}

function makeCardsNonInteractive() {
    PLAYING_CARDS.forEach(cardData => {
        const card = STAGE_OBJECTS.cardSelectorContainer.getChildByName(`${cardData.suit}${cardData.num}`);
        if (card) {
            card.interactive = false;
            card.on('pointerdown', () => {
                console.log(`FAILED on: ${card.label}`);
            });
        }
    });
}