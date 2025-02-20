import { Container, Sprite, FederatedPointerEvent, Graphics, Texture } from "pixi.js";
import { sound } from "@pixi/sound";
import { IScene } from "../SceneManager";
import { GAME_HEIGHT, GAME_WIDTH } from "../constants/Constants";


export class GameScene extends Container implements IScene {

    private clampy: Sprite;
    private tr: Graphics;
    private texture: Texture;

    constructor() {
        super();

        this.texture = Texture.from("_clampy");
        this.clampy = Sprite.from(this.texture);
        this.clampy.anchor.set(0.5);
        this.clampy.x = GAME_WIDTH / 2;
        this.clampy.y = GAME_HEIGHT / 2;
        this.addChild(this.clampy);

        //
        this.clampy.on("pointertap", this.handleClick, this);
        this.clampy.eventMode = "dynamic";

        const spr:Sprite = Sprite.from(this.texture);
        spr.tint = 0x00ff00;
        spr.x = 0;
        spr.y = 0;
        this.addChild(spr);

        //
        const graphy: Graphics = new Graphics();
        graphy.beginFill(0xFF3300);
        graphy.drawRect(0, 0, 100, 100);
        graphy.endFill();
        this.addChild(graphy);

        this.tr = new Graphics();
        this.tr.beginFill(0xFF3300);
        this.tr.drawRect(0, 0, 100, 100);
        this.tr.endFill();
        this.addChild(this.tr);
        this.tr.pivot.set(100, 0);
    }

    update(_deltaTime: number): void {
        
    }

    resize(screenWidth: number, screenHeight: number): void {
        this.clampy.x = screenWidth / 2;
        this.clampy.y = screenHeight / 2;

        this.tr.x = screenWidth;
    }

    private handleClick(_e: FederatedPointerEvent): void {
        console.log("scene", this.toLocal(_e.global));
        console.log("global", _e.global);
        sound.play("jump");
    }
}