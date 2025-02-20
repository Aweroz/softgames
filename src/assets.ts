import { AssetsManifest } from "pixi.js";


export const manifest:AssetsManifest = {
    bundles: [
        {
            name : "images",
            assets:
            {
                "bg_blue" : "./images/bg_blue.png",
                "bg_yellow" : "./images/bg_yellow.png",
            }
        },
        {
            name : "audio",
            assets:
            {
                "jump" : "./audio/jump.wav",
            }
        },
    ]
}