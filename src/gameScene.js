import { texturesThatAreLoaded } from '../libs/loader/loader.js';
import { app } from '../libs/renderer/index.js';


export default async function init() {
    const stage = app.stage;

    const bird = new PIXI.Sprite(texturesThatAreLoaded.bird);
    bird.x = 500;
    bird.y = 50;
    stage.addChild(bird);
}