import { Application } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH, GAMES } from "./constants/Constants";
import { SceneManager } from "./SceneManager";
import { LoaderScene } from "./scenes/LoaderScene";
import { WelcomeScene } from "./scenes/WelcomeScene";
import { CardsScene } from "./scenes/CardsScene";
import { DialogueScene } from "./scenes/DialogueScene";
import { FireScene } from "./scenes/FireScene";

export class GameManager {
  private constructor() {}

  private static app: Application;

  public static initialize(background: number): void {
    GameManager.app = new Application<HTMLCanvasElement>({
      view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
      width: GAME_WIDTH,
      height: GAME_HEIGHT,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      backgroundColor: background
    });

    SceneManager.initialize(GameManager.app);

    // load assets
    SceneManager.changeScene(new LoaderScene());
  }

  public static welcome() {
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