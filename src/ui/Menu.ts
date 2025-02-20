import { Container, Graphics } from "pixi.js";
import { GAME_HEIGHT, GAME_WIDTH, GAMES } from "../constants/Constants";
import { Button } from "./Button";
import { GameManager } from "../GameManager";
import { SceneManager } from "../SceneManager";

export class Menu extends Container {

  private bg: Graphics;
  private buttons: Button[];
  private buttonsContainer: any;

  constructor() {
    super();
    
    // add background
    this.bg = new Graphics().beginFill(0, 0.8).drawRect(0, 0, GAME_WIDTH, GAME_HEIGHT).endFill();
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

    this.resize(SceneManager.screenWidth, SceneManager.screenHeight);
  }

  handleButtonSelect(data:any): void {
    switch(data.id) {
      case "home":
        GameManager.welcome();
        break;
      case "resume":
        this.emit("close");
        break;
      default:
        GameManager.startGame(data.id);
    }
  }

  update(_deltaTime: number): void {}

  resize(screenWidth: number, screenHeight: number): void {
    this.buttonsContainer.x = screenWidth / 2;
    this.buttonsContainer.y = screenHeight / 2 - this.buttonsContainer.height / 2;
  }
}