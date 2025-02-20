import { AssetsManifest } from "pixi.js";


export const manifest:AssetsManifest = {
    bundles: [
        {
            name : "images",
            assets:
            {
                "bg_blue" : "./images/bg_blue.png",
                "bg_yellow" : "./images/bg_yellow.png",
                "cards" : "./images/cards.json",
            }
        },
        {
            name : "fonts",
            assets:
            {
                "fnt_uni05" : "./fonts/uni05_54.woff2",
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