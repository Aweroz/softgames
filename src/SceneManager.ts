import { DisplayObject } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH } from "./constants/Constants";
import { GameManager } from "./GameManager";

/**
 * The SceneManager class that handles changing scenes and add calls update for current scene
 */
export class SceneManager {
  private static _instance: SceneManager;

  public screenWidth: number = GAME_WIDTH;
  public screenHeight: number = GAME_HEIGHT;
  private currentScene: IScene | undefined;
  
  private constructor() {}

  public static GetInstance(): SceneManager {
    if (!SceneManager._instance) {
      SceneManager._instance = new SceneManager();
      SceneManager._instance.initialize();
    }
    return SceneManager._instance;
  }

  private get width(): number {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  }

  private get height(): number {
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  }


  private initialize(): void {
    GameManager.app.ticker.add(this.update, this);

    // listen for the browser telling us that the screen size changed
    window.addEventListener("resize", this.resize.bind(this));

    // call it manually once so we are sure we are the correct size after starting
    this.resize();
  }

  public changeScene(newScene: IScene):void {
    // Remove and destroy old scene...
    if (this.currentScene) {
      GameManager.app.stage.removeChild(this.currentScene);
      this.currentScene.destroy({ children: true });
    }

    // Add the new one to the bottom
    this.currentScene = newScene;
    GameManager.app.stage.addChildAt(this.currentScene, 0);

    //
    this.resize();
  }

  // This update will be called by a pixi ticker and tell the scene that a tick happened
  private update(_framesPassed: number): void {
    if (this.currentScene) {
      this.currentScene.update(GameManager.app.ticker.deltaMS / 1000);
    }
  }

  public resize(): void {
    let width: number = this.width;
    let height: number = this.height;

    // keep aspect ratio between 4:3 and 7:3
    let ar: number = width / height;
    if (ar < 4 / 3) {
      height = width * 0.75;
    } else if (ar > 8 / 3) {
      width = height * (8 / 3);
    }
    // calculate new aspect ratio
    ar = width / height;

    // resize renderer
    this.screenWidth = GAME_HEIGHT * ar;
    this.screenHeight = GAME_HEIGHT;
    GameManager.app.renderer.resize(this.screenWidth, this.screenHeight);
    // apply style to canvas - HAS to be done AFTER renderer resize
    if (GameManager.app.view.style) {
      GameManager.app.view.style.width = `${width}px`;
      GameManager.app.view.style.height = `${height}px`;
    }

    // resize scene if exists
    if (this.currentScene) {
      this.currentScene.resize(this.screenWidth, this.screenHeight);
    }
  }
}


// ----------------------------------------------------------------------------
// Scene interface
// ----------------------------------------------------------------------------
export interface IScene extends DisplayObject {
  update(deltaTime: number): void;
  resize(screenWidth: number, screenHeight: number): void;
}