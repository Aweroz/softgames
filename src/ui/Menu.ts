import { Container, Graphics } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH, GAMES } from "../constants/Constants";
import { Button } from "./Button";
import { GameManager } from "../GameManager";

/**
 * The Menu class displays in-game menu
 */
export class Menu extends Container {

  private bg: Graphics;
  private buttons: Button[];
  private buttonsContainer: Container;

  constructor() {
    super();
    
    // add background
    this.bg = new Graphics().beginFill(0, 0.85).drawRect(0, 0, GAME_WIDTH, GAME_HEIGHT).endFill();
    this.addChild(this.bg);
    this.bg.eventMode = "dynamic";

    // add buttons
    this.buttons = [];
    this.buttons.push(new Button("Home", "home"));
    this.buttons.push(new Button("Ace of Shadows", GAMES.CARDS));
    this.buttons.push(new Button("Magic Words", GAMES.DIALOGUE));
    this.buttons.push(new Button("Phoenix Flame", GAMES.FIRE));
    this.buttons.push(new Button("Resume", "resume"));

    this.buttons.forEach((btn, i) => {
      btn.on("buttonselect", this.handleButtonSelect, this);
      btn.y = i * 80;
    })

    // add container for the buttons
    this.buttonsContainer = new Container();
    this.addChild(this.buttonsContainer);

    this.buttonsContainer.addChild(...this.buttons);

    this.resize(GameManager.sceneManager.screenWidth, GameManager.sceneManager.screenHeight);
  }

  handleButtonSelect(id: string): void {
    switch(id) {
      case "home":
        GameManager.welcome();
        break;
      case "resume":
        this.emit("close");
        break;
      default:
        GameManager.startGame(id);
    }
  }

  update(_deltaTime: number): void {}

  resize(screenWidth: number, screenHeight: number): void {
    this.buttonsContainer.x = screenWidth / 2;
    this.buttonsContainer.y = (screenHeight - this.buttonsContainer.height) / 2 + 30;
  }
}