import { Container, Graphics, Assets, BitmapFont } from "pixi.js";
import { manifest } from "../assets";
import { IScene } from "../SceneManager";
import { GameManager } from "../GameManager";

export class LoaderScene extends Container implements IScene{

    private loaderBar: Container;
    private loaderBarBoder: Graphics;
    private loaderBarFill: Graphics;

    constructor() {
        super();

        const loaderBarWidth = 400;
        // the fill of the bar.
        this.loaderBarFill = new Graphics();
        this.loaderBarFill.beginFill(0x008800, 1)
        this.loaderBarFill.drawRect(0, 0, loaderBarWidth, 50);
        this.loaderBarFill.endFill();
        this.loaderBarFill.scale.x = 0; // we draw the filled bar and with scale we set the %

        // The border of the bar.
        this.loaderBarBoder = new Graphics();
        this.loaderBarBoder.lineStyle(10, 0x0, 1);
        this.loaderBarBoder.drawRect(0, 0, loaderBarWidth, 50);

        // Now we keep the border and the fill in a container so we can move them together.
        this.loaderBar = new Container();
        this.loaderBar.addChild(this.loaderBarFill);
        this.loaderBar.addChild(this.loaderBarBoder);
        this.addChild(this.loaderBar);

        // Start loading!
        this.initializeLoader().then(() => {
            // Remember that constructors can't be async, so we are forced to use .then(...) here!
            this.gameLoaded();
        })
    }

    update(_deltaTime: number): void {}
    
    resize(screenWidth: number, screenHeight: number): void {
        this.loaderBar.position.x = (screenWidth - this.loaderBar.width) / 2; 
        this.loaderBar.position.y = (screenHeight - this.loaderBar.height) / 2;
    }

    private async initializeLoader(): Promise<void>
    {
        await Assets.init({ manifest: manifest });

        // get list of bundle names
        const bundleIds =  manifest.bundles.map(bundle => bundle.name);
        await Assets.loadBundle(bundleIds, this.downloadProgress.bind(this));
    }

    private downloadProgress(progressRatio: number): void {
        this.loaderBarFill.scale.x = progressRatio;
    }

    private gameLoaded(): void {
        BitmapFont.from("comic 32", {
            fill: "#ffffff", // White, will be colored later
            fontFamily: "Comic Sans MS",
            fontSize: 32
        })
        // start game
        GameManager.welcome();
    }
}