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
                "fire" : "./images/fire.json",
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
                "uni_fnt" : "./fonts/uni0554.fnt",
            }
        }
    ]
}