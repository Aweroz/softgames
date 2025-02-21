import { BitmapText, Container, Graphics } from "pixi.js";
import { GameManager } from "../GameManager";

/**
 * The FPS displays average fps based on last 30 frames
 */
export class FPS extends Container {
  private back: Graphics;
  private label: BitmapText;
  private fpses: number[];

  constructor() {
    super();

    this.fpses = [];

    this.back = new Graphics();
    this.back.beginFill(0x000000, 0.2);
    this.back.drawRect(0, 0, 100, 30);
    this.back.endFill();

    this.label = new BitmapText("FPS: 0",
    {
        fontName: "Uni0554",
        fontSize: 16,
        tint: 0xFFFFFF
    });
    this.label.x = 10;
    this.label.y = 5;

    //
    this.addChild(this.back, this.label);

    //
    GameManager.app.ticker.add(() => {
      this.fpses.push(GameManager.app.ticker.FPS);
      if (this.fpses.length === 30) {
        const average: number = this.fpses.reduce((p, c) => p + c, 0) / 30;
        this.fpses = [];
        this.label.text = `FPS: ${Math.round(average)}`;
      }
    })
  }
}