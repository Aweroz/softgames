import { Application, DisplayObject } from "pixi.js";
import { GAME_HEIGHT } from "./constants/Constants";

export class SceneManager {
  static screenWidth: number;
  static screenHeight: number;
  
  private static app: Application;
  private static currentScene: IScene;
  
  private constructor() { }

  public static get width(): number {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  }

  public static get height(): number {
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  }


  public static initialize(app: Application): void {
    SceneManager.app = app;

    // 
    SceneManager.app.ticker.add(SceneManager.update);

    // listen for the browser telling us that the screen size changed
    window.addEventListener("resize", SceneManager.resize);

    // call it manually once so we are sure we are the correct size after starting
    SceneManager.resize();
  }

  public static changeScene(newScene: IScene):void {
    // Remove and destroy old scene... if we had one..
    if (SceneManager.currentScene) {
      SceneManager.app.stage.removeChild(SceneManager.currentScene);
      SceneManager.currentScene.destroy({ children: true });
    }

    // Add the new one to the bottom
    SceneManager.currentScene = newScene;
    SceneManager.app.stage.addChildAt(SceneManager.currentScene, 0);

    //
    SceneManager.resize();
  }

  // This update will be called by a pixi ticker and tell the scene that a tick happened
  private static update(_framesPassed: number): void {
    if (SceneManager.currentScene) {
      SceneManager.currentScene.update(SceneManager.app.ticker.deltaMS / 1000);
    }
  }

  public static resize(): void {
    let width: number = SceneManager.width;
    let height: number = SceneManager.height;

    // keep aspect ratio between 4:3 and 7:3
    let ar: number = width / height;
    if (ar < 4 / 3) {
      height = width * 0.75;
    } else if (ar > 7 / 3) {
      width = height * (7 / 3);
    }
    // calculate new aspect ratio
    ar = width / height;

    // resize renderer
    SceneManager.screenWidth = GAME_HEIGHT * ar;
    SceneManager.screenHeight = GAME_HEIGHT;
    SceneManager.app.renderer.resize(SceneManager.screenWidth, SceneManager.screenHeight);
    // apply style to canvas - HAS to be done AFTER renderer resize !!!
    SceneManager.app.view.style!.width = `${width}px`;
    SceneManager.app.view.style!.height = `${height}px`;

    // resize scene if exists
    if (SceneManager.currentScene) {
      console.log(SceneManager.screenWidth, SceneManager.screenHeight);
      SceneManager.currentScene.resize(SceneManager.screenWidth, SceneManager.screenHeight);
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