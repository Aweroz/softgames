import { Container } from "pixi.js";
import { IScene } from "../SceneManager";

export class FireScene extends Container implements IScene {
  constructor() {
    super();
  }

  update(_deltaTime: number): void {

  }

  resize(_screenWidth: number, _screenHeight: number): void {
    
  }
}