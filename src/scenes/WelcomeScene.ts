import { Container } from "pixi.js";
import { IScene } from "../SceneManager";
import { Background } from "../ui/Background";
import { Button } from "../ui/Button";
import { GameManager } from "../GameManager";
import { GAMES } from "../constants/Constants";

export class WelcomeScene extends Container implements IScene {
  
  private bg: Background;
  private buttonsContainer: Container;
  private buttons: Button[];

  constructor() {
    super();

    // add background
    this.bg = new Background("bg_blue");
    this.addChild(this.bg);

    // add buttons
    this.buttons = [];
    this.buttons.push(new Button("Ace of Shadows", GAMES.CARDS));
    this.buttons.push(new Button("Magic Words", GAMES.DIALOGUE));
    this.buttons.push(new Button("Phoenix Flame", GAMES.FIRE));

    this.buttons.forEach((btn: Button, i: number) => {
      btn.on("buttonselect", this.handleButtonSelect, this);
      btn.y = i * 80;
    })

    // add container for the buttons
    this.buttonsContainer = new Container();
    this.addChild(this.buttonsContainer);

    this.buttonsContainer.addChild(...this.buttons);
  }

  handleButtonSelect(id: string): void {
    GameManager.startGame(id);
  }

  update(_deltaTime: number): void {}

  resize(screenWidth: number, screenHeight: number): void {
    this.buttonsContainer.x = screenWidth / 2;
    this.buttonsContainer.y = (screenHeight - this.buttonsContainer.height) / 2 + 30;
  }
}