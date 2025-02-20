import { Assets, Container, Point, Sprite, Spritesheet } from "pixi.js";
import { Card } from "./Card";

export class Stack extends Container {

  private cards: Card[];

  constructor(x: number, y: number) {
    super();

    this.cacheAsBitmap = true;

    this.cards = [];

    this.x = x;
    this.y = y;

    // add slot
    const sheet: Spritesheet = Assets.get("cards");
    const slot:Sprite = Sprite.from(sheet.textures["slot.png"]);
    slot.anchor.set(0.5);
    this.addChild(slot);
  }

  isEmpty(): boolean {
    return this.cards.length === 0;
  }

  addCards(amount: number): void {
    for (let i: number = 0; i < amount; i++) {
      const card: Card = new Card();
      this.addCard(card);
    }
  }

  addCard(card: Card): void {
    this.cacheAsBitmap = false;
    card.position = this.getPosition();
    this.cards.push(card);
    this.addChild(card);
    this.cacheAsBitmap = true;
  }

  getTopCard(): Card | undefined {
    this.cacheAsBitmap = false;
    const card: Card | undefined = this.cards.pop();
    return card;
  }

  removeCard(card: Card) {
    this.removeChild(card);
    this.cacheAsBitmap = true;
  }

  getPosition(): Point {
    return new Point(0, -1 * this.cards.length);
  }

  getDestPosition(): Point {
    return new Point(this.x, this.y - 1 * this.cards.length);
  }
}