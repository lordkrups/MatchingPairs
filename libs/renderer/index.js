import {RESOLUTION} from './consts.js';

/**
 * The selector for finding the renderer.
 *
 * @type {String}
 */
export const SELECTOR = 'canvas';

/**
 * Our found canvas HTML element.
 *
 * @type {?HTMLCanvasElement}
 */
export let canvas = null;

/**
 * The created PIXI application.
 *
 * @type {?PIXI.Application}
 */
export let app = null;

/**
 * The current resolution.
 *
 * @type {?{width: Number, height: Number}}
 */
export let resolution = null;

/**
 * Create the renderer required for the game.
 *
 * @param {HTMLCanvasElement} view The target canvas to render to.
 * @param {{width: Number, height: Number}} resolution The resolution to target.
 */
export async function create(view) {
    canvas = view;
    resolution = {...RESOLUTION};

    app = new PIXI.Application();

    await app.init({
        ...resolution,
        canvas
    });

    app.stage.visible = true;
    app.stage.interactiveChildren = true;
}

/**
 * @typedef {Object} GameConfig
 * @property {{width: Number, height: Number}} RESOLUTION The resolution to render at.
 */

/**
 * Setup our basic application structure.
 *
 * @param {GameConfig} config The config of the game.
 */
export async function setup() {
    // Find the canvas in the page
    const canvas = document.querySelector(SELECTOR);

    await create(canvas);
}
