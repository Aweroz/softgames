import { Assets, Container, IDestroyOptions, ParticleContainer, Sprite, Spritesheet } from "pixi.js";
import { IScene } from "../SceneManager";
import { Background } from "../ui/Background";
import { GameHUD } from "../ui/GameHUD";
import * as particles from "@pixi/particle-emitter";
import { GAME_HEIGHT, GAME_WIDTH } from "../constants/Constants";

export class FireScene extends Container implements IScene {

  private bg: Background;
  private ground: Sprite;
  private dragon: Sprite;
  private dragonShadow: Sprite;
  private knight: Sprite;
  private knightShadow: Sprite;
  private effectContainer: ParticleContainer;
  private hud: GameHUD;
  private emitter: particles.Emitter;
  private dragonAngle: number;
  
  constructor() {
    super();

    this.dragonAngle = 0;

    this.bg = new Background("bg_dark");
    this.addChild(this.bg);

    const sheet: Spritesheet = Assets.get("fire");

    this.ground = Sprite.from(sheet.textures["ground.png"]);
    this.ground.anchor.set(0, 1);
    this.ground.y = GAME_HEIGHT;
    this.ground.width = GAME_WIDTH;
    this.addChild(this.ground);

    // dragon
    this.dragon = Sprite.from(sheet.textures["dragon.png"]);
    this.dragon.x = 300;
    this.dragon.y = 100;

    this.dragonShadow = Sprite.from(sheet.textures["shadow.png"]);
    this.dragonShadow.anchor.set(0.5);
    this.dragonShadow.scale.set(2);
    this.dragonShadow.x = this.dragon.x + this.dragon.width / 2;
    this.dragonShadow.y = this.dragon.y + this.dragon.height;

    // knight
    this.knight = Sprite.from(sheet.textures["knight.png"]);
    this.knight.anchor.set(0.5, 1);
    this.knight.x = 300;
    this.knight.y = 700;

    this.knightShadow = Sprite.from(sheet.textures["shadow.png"]);
    this.knightShadow.anchor.set(0.5);
    this.knightShadow.x = this.knight.x;
    this.knightShadow.y = this.knight.y;

    this.addChild(this.dragonShadow, this.dragon, this.knightShadow, this.knight);

    // particles
    this.effectContainer = new ParticleContainer();
    this.addChild(this.effectContainer);

    // add hud
    this.hud = new GameHUD();
    this.addChild(this.hud);

    //
    const particleSettings = Assets.get("emitter");
    this.emitter = new particles.Emitter(this.effectContainer, particles.upgradeConfig(particleSettings, ["flame1"]));
    this.emitter.autoUpdate = true;
    this.emitter.emit = true;
    this.emitter.updateSpawnPos(this.dragon.x + 60, this.dragon.y + 180);
  }

  update(deltaTime: number): void {
    this.dragonAngle += deltaTime * 2;
    this.dragon.y = 100 + Math.sin(this.dragonAngle) * 10;
    this.dragonShadow.scale.set(2 + Math.sin(this.dragonAngle) * 0.1);
    this.emitter.updateSpawnPos(this.dragon.x + 60, this.dragon.y + 180);
  }

  resize(screenWidth: number, screenHeight: number): void {
    this.hud.resize(screenWidth, screenHeight);

    this.dragon.x = screenWidth / 2 - this.dragon.width * 0.3;
    this.dragonShadow.x = this.dragon.x + this.dragon.width / 2;
    this.emitter.updateSpawnPos(this.dragon.x + 60, this.dragon.y + 180);

    this.knight.x = this.dragon.x - 140;
    this.knight.y = screenHeight - 80;
    this.knightShadow.x = this.knight.x;
    this.knightShadow.y = this.knight.y;
  }

  override destroy(options?: IDestroyOptions | boolean): void {
    this.emitter.destroy();
    super.destroy(options);
  }
}