import { Container } from "pixi.js";
import { IScene } from "../SceneManager";
import { Background } from "../ui/Background";

export class CardsScene extends Container implements IScene {
  
  private bg: Background;

  constructor() {
    super();

    // add background
    this.bg = new Background("bg_yellow");
    this.addChild(this.bg);
  }

  update(_deltaTime: number): void {

  }

  resize(_screenWidth: number, _screenHeight: number): void {

  }
}