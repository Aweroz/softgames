import { Assets, Container, IDestroyOptions, ParticleContainer, Sprite } from "pixi.js";
import { IScene } from "../SceneManager";
import { Background } from "../ui/Background";
import { GameHUD } from "../ui/GameHUD";
import * as particles from "@pixi/particle-emitter";

export class FireScene extends Container implements IScene {

  private bg: Background;
  private dragon: Sprite;
  private effectContainer: ParticleContainer;
  private hud: GameHUD;
  private emitter: particles.Emitter;
  
  constructor() {
    super();

    this.bg = new Background("bg_dark");
    this.addChild(this.bg);

    // dragon
    this.dragon = Sprite.from("dragon");
    this.dragon.x = 300;
    this.dragon.y = 100;
    this.addChild(this.dragon);

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

  update(_deltaTime: number): void {

  }

  resize(screenWidth: number, screenHeight: number): void {
    this.hud.resize(screenWidth, screenHeight);

    this.dragon.x = screenWidth / 2 - this.dragon.width * 0.3;
    this.emitter.updateSpawnPos(this.dragon.x + 60, this.dragon.y + 180);
  }

  override destroy(options?: IDestroyOptions | boolean): void {
    this.emitter.destroy();
    super.destroy(options);
  }
}