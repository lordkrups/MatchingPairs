import { app } from '../libs/renderer/index.js';


/**
 * The main game logic.
*/
export async function init() {
    // You now have access to app.stage here
    const stage = app.stage;

    // Example: add a test graphic to stage
    const graphic = new PIXI.Graphics();
    graphic.beginFill(0xff0000);
    graphic.drawRect(0, 0, 100, 100);
    graphic.endFill();
    stage.addChild(graphic);

    const img = './assets/face.png'; // Ensure the path is correct

    const faceAsset = PIXI.Assets.load(img);

    faceAsset.then((myTexture) => {
    const sprite = new PIXI.Sprite(myTexture); // Directly use the resolved texture
    sprite.x = 100;
    sprite.y = 100;
    sprite.scale.set(0.5);

    app.stage.addChild(sprite);

    });
}

