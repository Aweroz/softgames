import { Container } from "pixi.js";
import { IScene } from "../SceneManager";
import { Background } from "../ui/Background";
import { Button } from "../ui/Button";
import { GameManager } from "../GameManager";
import { GAMES } from "../constants/Constants";

export class WelcomeScene extends Container implements IScene {
  
  private bg: Background;
  private buttonsContainer: any;
  private btnCards: Button;
  private btnDialogue: Button;
  private btnFire: Button;

  constructor() {
    super();

    // add background
    this.bg = new Background("bg_blue");
    this.addChild(this.bg);

    // add buttons
    this.btnCards = new Button("Ace of Shadows", GAMES.CARDS);
    this.btnCards.y = - 80;
    this.btnDialogue = new Button("Magic Words", GAMES.DIALOGUE);
    this.btnFire = new Button("Phoenix Flame", GAMES.FIRE);
    this.btnFire.y = 80;

    this.btnCards.on("buttonselect", this.handleButtonSelect, this);
    this.btnDialogue.on("buttonselect", this.handleButtonSelect, this);
    this.btnFire.on("buttonselect", this.handleButtonSelect, this);

    // add container for the buttons
    this.buttonsContainer = new Container();
    this.addChild(this.buttonsContainer);

    this.buttonsContainer.addChild(this.btnCards, this.btnDialogue, this.btnFire);
  }

  handleButtonSelect(data:any): void {
    GameManager.startGame(data.id);
  }

  update(_deltaTime: number): void {}

  resize(screenWidth: number, screenHeight: number): void {
    this.buttonsContainer.x = screenWidth / 2;
    this.buttonsContainer.y = screenHeight / 2;
  }
}