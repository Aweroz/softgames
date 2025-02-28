import { Container } from "pixi.js";
import { IScene } from "../SceneManager";
import { Background } from "../ui/Background";
import { Stack } from "../games/cards/Stack";
import { GAME_HEIGHT, GAME_WIDTH } from "../constants/Constants";
import { Card } from "../games/cards/Card";
import { GameHUD } from "../ui/GameHUD";

export class CardsScene extends Container implements IScene {

  readonly SPAWN_TIME: number = 1;
  
  private bg: Background;
  private cardsContainer: Container;
  private stack1: Stack;
  private stack2: Stack;
  private stack3: Stack;
  private timeToSpawn: number;
  private hud: GameHUD;

  constructor() {
    super();

    // add background
    this.bg = new Background("bg_yellow");
    this.addChild(this.bg);

    // create stacks
    this.cardsContainer = new Container();
    this.addChild(this.cardsContainer);
    this.stack1 = new Stack(GAME_WIDTH / 2 - 300, GAME_HEIGHT * 0.6);
    this.stack2 = new Stack(GAME_WIDTH / 2 + 300, GAME_HEIGHT * 0.7);
    this.stack3 = new Stack(GAME_WIDTH / 2 + 100, GAME_HEIGHT * 0.3);
    this.cardsContainer.addChild(this.stack1, this.stack2, this.stack3);

    // add cards to 1st slot
    this.stack1.addCards(144);

    // add hud
    this.hud = new GameHUD();
    this.addChild(this.hud);

    //
    this.timeToSpawn = this.SPAWN_TIME;
  }

  update(deltaTime: number): void {
    if (this.stack1.isEmpty()) return;

    this.timeToSpawn -= deltaTime;
    if (this.timeToSpawn <= 0) {
      // spawn new card
      this.timeToSpawn = this.SPAWN_TIME;
      this.spawnCard();
    }
  }

  private spawnCard(): void {
    const card: Card | undefined = this.stack1.getTopCard();
    if (card) {
      const pos = this.cardsContainer.toLocal(card.getGlobalPosition());
      this.stack1.removeCard(card);
      card.position = pos;
      this.cardsContainer.addChild(card);
      card.goToStack(Math.random() < 0.5 ? this.stack2 : this.stack3);
    }
  }

  resize(screenWidth: number, screenHeight: number): void {
    // position elements on screen
    this.stack1.x = 200;
    this.stack1.y = screenHeight * 0.6;
    this.stack2.x = screenWidth - 200;
    this.stack2.y = screenHeight * 0.75;
    this.stack3.x = screenWidth / 2 + 50;
    this.stack3.y = screenHeight * 0.3;
    //
    this.hud.resize(screenWidth, screenHeight);
  }
}