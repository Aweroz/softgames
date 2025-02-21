import { Assets, Container, IDestroyOptions, Point, Sprite, Spritesheet, Ticker } from "pixi.js";
import { Stack } from "./Stack";
import { Tween, Group, Easing } from "tweedle.js";

export class Card extends Container {

  private destStack: Stack | undefined = undefined;
  private tween1: Tween<any> | undefined;
  private tween2: Tween<any> | undefined ;

  constructor() {
    super();

    const sheet: Spritesheet = Assets.get("cards");
    const card:Sprite = Sprite.from(sheet.textures["card.png"]);
    card.anchor.set(0.5);
    this.addChild(card);
  }

  goToStack(stack: Stack, duration: number = 2000): void {
    this.destStack = stack;
    const startPos: Point = this.position.clone();
    
    Ticker.shared.add(this.update, this);

    // movement
    this.tween1 = new Tween({ t: 0 })
      .to({ t: 1 }, duration)
      .onComplete(() => this.handleAnimComplete())
      .onUpdate((obj) => {
        if (stack) {
          const pos: Point = stack.getDestPosition();
          const dx: number = pos.x - startPos.x;
          const dy: number = pos.y - startPos.y;
          this.position.set(startPos.x + dx * obj.t, startPos.y + dy * obj.t);
        }
      })
      .easing(Easing.Sinusoidal.InOut)
      .start();
      
    // rotation
    this.tween2 = new Tween(this)
      .to({ rotation: Math.PI * 2}, duration)
      .easing(Easing.Sinusoidal.InOut)
      .start();
  }

  private update(): void {
    Group.shared.update();
  }

  private handleAnimComplete(): void {
    Ticker.shared.remove(this.update, this);
    this.destStack!.addCard(this);
  }

  override destroy(options?: IDestroyOptions | boolean): void {
    this.tween1?.stop();
    this.tween2?.stop();
    super.destroy(options);
  }
}