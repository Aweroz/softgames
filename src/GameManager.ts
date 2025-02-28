import { Application } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH, GAMES } from "./constants/Constants";
import { SceneManager } from "./SceneManager";
import { LoaderScene } from "./scenes/LoaderScene";
import { WelcomeScene } from "./scenes/WelcomeScene";
import { CardsScene } from "./scenes/CardsScene";
import { DialogueScene } from "./scenes/DialogueScene";
import { FireScene } from "./scenes/FireScene";
import { FPS } from "./ui/FPS";

/**
 * The GameManager is responsible for initialization of the PixiJS Application and handles all the navigation between scenes
 */
export class GameManager {
  private constructor() {}

  private static _app: Application;
  private static _sceneManager: SceneManager;
  private static fps: FPS;

  public static get app(): Application {
    return GameManager._app;
  }

  public static get sceneManager(): SceneManager {
    if (!GameManager._sceneManager) {
      GameManager._sceneManager = SceneManager.GetInstance();
    }
    return GameManager._sceneManager;
  }

  public static initialize(background: number): void {
    GameManager._app = new Application<HTMLCanvasElement>({
      view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
      width: GAME_WIDTH,
      height: GAME_HEIGHT,
      resolution: Math.floor(window.devicePixelRatio) || 1,
      autoDensity: true,
      backgroundColor: background
    });

    // load assets
    GameManager.sceneManager.changeScene(new LoaderScene());
  }

  public static welcome() {
    // add fps
    if (!GameManager.fps) {
      GameManager.fps = new FPS();
      GameManager.app.stage.addChild(GameManager.fps);
    }

    GameManager.sceneManager.changeScene(new WelcomeScene());
  }

  public static startGame(gameID: string) {
    switch(gameID) {
      case GAMES.CARDS:
        GameManager.sceneManager.changeScene(new CardsScene());
        break;
      case GAMES.DIALOGUE:
        GameManager.sceneManager.changeScene(new DialogueScene());
        break;
      case GAMES.FIRE:
        GameManager.sceneManager.changeScene(new FireScene());
        break;
    }
  }
}