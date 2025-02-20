import { Container, Graphics, Texture } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from "../constants/Constants";

export class Background extends Container {
  constructor(textureId: string) {
    super();

    const texture: Texture = Texture.from(textureId);
    const bg:Graphics = new Graphics();
    bg.beginTextureFill({ texture: texture });
    bg.drawRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    bg.endFill();

    this.addChild(bg);
  }
}