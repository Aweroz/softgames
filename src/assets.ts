import { AssetsManifest } from "pixi.js";


export const manifest:AssetsManifest = {
    bundles: [
        {
            name : "images",
            assets:
            {
                "bg_blue" : "./images/bg_blue.png",
                "bg_yellow" : "./images/bg_yellow.png",
                "bg_green" : "./images/bg_green.png",
                "bg_dark" : "./images/bg_dark.png",
                "cards" : "./images/cards.json",
                "flame1" : "./images/flame1.png",
                "dragon" : "./images/dragon.png",
            }
        },
        {
            name : "data",
            assets:
            {
                "emitter" : "./data/emitter.json",
            }
        },
        {
            name : "fonts",
            assets:
            {
                "fnt_uni05" : "./fonts/uni05_54.woff2",
            }
        }
    ]
}