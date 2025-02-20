import { BitmapText, Container, Graphics } from "pixi.js";
import { GameManager } from "../GameManager";

export class FPS extends Container {
  private back: Graphics;
  private label: BitmapText;

  constructor() {
    super();

    this.back = new Graphics();
    this.back.beginFill(0x000000, 0.2);
    this.back.drawRect(0, 0, 100, 30);
    this.back.endFill();

    this.label = new BitmapText("FPS: 0",
    {
        fontName: "fnt_uni_32",
        fontSize: 16,
        tint: 0xFFFFFF
    });
    this.label.x = 10;
    this.label.y = 5;

    //
    this.addChild(this.back, this.label);

    //
    GameManager.app.ticker.add(() => {
      this.label.text = `FPS: ${Math.round(GameManager.app.ticker.FPS)}`;
    })
  }
}