import { texturesThatAreLoaded } from '../libs/loader/loader.js';
import { app } from '../libs/renderer/index.js';
import { STAGE_OBJECTS, PLAYING_CARDS } from './index.js';
const { Sprite, Container, Text } = PIXI;
import { suits, cardsLayout, cardStates } from './gameConfigs.js';

let clickCallback;

export default async function init(cardClickedCallback) {
    const stage = app.stage;
    clickCallback = cardClickedCallback;

    // Create a container for the cards
    const cardContainer = new Container();
    cardContainer.name = 'cardSelectorContainer';
    cardContainer.x = 150;
    cardContainer.y = 100;
    stage.addChild(cardContainer);

    STAGE_OBJECTS.cardSelectorContainer = cardContainer;

    // Create cards based on suits and numbers
    instantiateCards(cardContainer, texturesThatAreLoaded);

    makeCardsInteractive(cardClickedCallback);
    // makeCardsNonInteractive();
}

function instantiateCards(cardContainer, textures) {
    const suitList = Object.values(suits);
    const cardNumbers = [1, 2, 3, 4]; // Can be changed to however many you have
    const state = cardStates.faceDown; // Initial state of the cards

    for (let num of cardNumbers) {
        for (let suit of suitList) {
            PLAYING_CARDS.push({ suit, num, state });
        }
    }

    // Place them
    PLAYING_CARDS.forEach((cardData, i) => {
        const row = Math.floor(i / cardsLayout.cardsPerRow);
        const col = i % cardsLayout.cardsPerRow;

        // const card = new Sprite(texturesThatAreLoaded[`${cardData.suit}Card`]);
        const card = new Sprite(texturesThatAreLoaded.backCard);
        card.label = `${cardData.suit}${cardData.num}`;
        card.x = cardsLayout.startX + col * cardsLayout.colSpacing;
        card.y = cardsLayout.startY + row * cardsLayout.rowSpacing;
        card.anchor.set(0.5);
        cardContainer.addChild(card);
        PLAYING_CARDS[i].cardIndex = i;
    });
}

function makeCardsInteractive(cb) {
    PLAYING_CARDS.forEach(cardData => {
        const card = STAGE_OBJECTS.cardSelectorContainer.getChildByName(`${cardData.suit}${cardData.num}`);
        if (card) {
            card.interactive = true;
            card.on('pointerdown', async () => {
                // console.log(`Clicked on: ${card.label}`);

                const dataOfCard = {
                    cardSprite: card,
                    suit: cardData.suit,
                    num: cardData.num,
                    label: card.label,
                    state: cardData.state,
                    arrayIndex: cardData.cardIndex
                };

                await flipCard(dataOfCard); // Flip the card when clicked
                // cb(dataOfCard); // Call the callback function with the clicked card
            });
        }
    });
}

export function makeCardsNonInteractive() {
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

// Function to make non interactive cards that have been matched
export function makeMatchedCardsNonInteractive() {
    PLAYING_CARDS.forEach(cardData => {
        if (cardData.state === cardStates.matched) {
            const card = STAGE_OBJECTS.cardSelectorContainer.getChildByName(`${cardData.suit}${cardData.num}`);
            if (card) {
                card.interactive = false;
                card.on('pointerdown', () => {
                    console.log(`Interactive disabled on: ${card.label}`);
                });
                alphaDownCard(card);
            }
        }
    });
}

function alphaDownCard(cardSprite) {
    //GSAP tween to alpha the card down
    gsap.to(cardSprite, {
        // pixi: { scaleX: 1, scaleY: 1},
        pixi: { alpha: 0.5 },
        duration: 1,
    });
}

// Function to flip card
export async function flipCard(dataOfCard, reset = false) {
    dataOfCard.cardSprite.interactive = false;
    STAGE_OBJECTS.cardSelectorContainer.interactiveChildren = false;

    let newTexture;
    if (dataOfCard.state === cardStates.faceDown) {
        newTexture = texturesThatAreLoaded[dataOfCard.suit + 'Card'];
        PLAYING_CARDS[dataOfCard.arrayIndex].state = cardStates.faceUp;
        dataOfCard.state = cardStates.faceUp;
    } else if (dataOfCard.state === cardStates.faceUp) {
        newTexture = texturesThatAreLoaded.backCard;
        PLAYING_CARDS[dataOfCard.arrayIndex].state = cardStates.faceDown;
        dataOfCard.state = cardStates.faceDown;
    }

    await gsap.to(dataOfCard.cardSprite, {
        pixi: { scaleX: 0, scaleY: 1 },
        duration: 0.25,
    });

    // Change texture of card
    dataOfCard.cardSprite.texture = newTexture;

    await gsap.to(dataOfCard.cardSprite, {
        pixi: { scaleX: -1, scaleY: 1 },
        duration: 0.25,
    });


    dataOfCard.cardSprite.interactive = true;
    STAGE_OBJECTS.cardSelectorContainer.interactiveChildren = true;

    if (!reset) {
        clickCallback(dataOfCard);
    }
}