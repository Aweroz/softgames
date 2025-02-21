import { Container, IDestroyOptions, Sprite, Ticker } from "pixi.js";
import { Easing, Group, Tween } from "tweedle.js";

export class Character extends Container {

  side: string = "";
  private character: Sprite;
  private tween1: Tween<any>;

  constructor(charName: string, side: string) {
    super();

    this.character = Sprite.from(charName);
    this.character.anchor.set(0.5, 1);
    this.addChild(this.character);

    this.side = side;

    // animate
    Ticker.shared.add(this.update, this);
    
    this.character.alpha = 0;
    this.character.x = this.side === "left" ? -50 : 50;
    this.tween1 = new Tween(this.character)
          .to({ alpha: 1, x: 0 }, 300)
          .easing(Easing.Sinusoidal.Out)
          .start();
  }
  
  private update(): void {
    Group.shared.update();
  }

  override destroy(options?: IDestroyOptions | boolean): void {
    this.tween1.stop();
    Ticker.shared.remove(this.update, this);
    super.destroy(options);
  }
}