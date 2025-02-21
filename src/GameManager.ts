import { Application } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH, GAMES } from "./constants/Constants";
import { SceneManager } from "./SceneManager";
import { LoaderScene } from "./scenes/LoaderScene";
import { WelcomeScene } from "./scenes/WelcomeScene";
import { CardsScene } from "./scenes/CardsScene";
import { DialogueScene } from "./scenes/DialogueScene";
import { FireScene } from "./scenes/FireScene";
import { FPS } from "./ui/FPS";

export class GameManager {
  private constructor() {}

  private static _app: Application;
  private static fps: FPS;

  public static get app(): Application {
    return GameManager._app;
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

    SceneManager.initialize(GameManager._app);

    // load assets
    SceneManager.changeScene(new LoaderScene());
  }

  public static welcome() {
    // add fps
    if (!GameManager.fps) {
      GameManager.fps = new FPS();
      GameManager.app.stage.addChild(GameManager.fps);
    }

    SceneManager.changeScene(new WelcomeScene());
  }

  public static startGame(gameID: string) {
    switch(gameID) {
      case GAMES.CARDS:
        SceneManager.changeScene(new CardsScene());
        break;
      case GAMES.DIALOGUE:
        SceneManager.changeScene(new DialogueScene());
        break;
      case GAMES.FIRE:
        SceneManager.changeScene(new FireScene());
        break;
    }
  }
}