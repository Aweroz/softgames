import { BitmapText, Container, Graphics, IDestroyOptions, Sprite, Ticker } from "pixi.js";
import { Group, Tween } from "tweedle.js";

export class TextFrame extends Container {

  private frame: Graphics | undefined;
  private charName: BitmapText;
  private words: Container[];
  private tweens: Tween<any>[] = [];

  constructor(name: string, text: string, availableEmojies: string[]) {
    super();

    this.words = [];

    //
    this.drawFrame(500);

    // character name
    this.charName = new BitmapText(name,
    {
      fontName: "Uni0554",
      fontSize: 24,
      tint: 0xFAF525
    });
    this.addChild(this.charName);

    // create words and emojies
    const chunks = text.split(" ");

    chunks.forEach((chunk) => {
      if (chunk.includes("{")) {
        // emoji
        const emojiName: string = chunk.substring(1, chunk.length - 1);
        if (availableEmojies.includes(emojiName)) {
          const emoji: Sprite = Sprite.from(emojiName);
          emoji.width = emoji.height = 30;
          this.words.push(emoji);
        }
      } else {
        // word
        this.words.push(new BitmapText(chunk,
          {
            fontName: "Uni0554",
            fontSize: 24,
            tint: 0xFFFFFF
          })
        );
      }
    });

    //
    this.addChild(...this.words);
    
    //
    this.positionText();
    this.animateText();
  }

  drawFrame(width: number): void {
    if (!this.frame) {
      this.frame = new Graphics();
      this.addChild(this.frame);
    } else {
      this.frame.clear();
    }
    this.frame.beginFill(0x2428D2, 0.6);
    this.frame.lineStyle(2, 0xffffff);
    this.frame.drawRoundedRect(0, 0, width, 200, 15);
    this.frame.endFill();
    //
    this.frame.x = -this.frame.width / 2;
    this.frame.y = -this.frame.height;
  }

  positionText(): void {
    this.positionName();
    this.positionWords();
  }

  private positionName(): void {
    const left: number = this.frame!.x + 40;
    const top: number = this.frame!.y + 20;
    this.charName.x = left;
    this.charName.y = top;
  }

  private positionWords(): void {
    const width: number = this.frame!.width - 80;
    const left: number = this.frame!.x + 40;
    const top: number = this.charName!.y + 40;
    let x: number = 0;
    let y: number = 0;
    const gap: number = 10;
    this.words.forEach(word => {
      word.x = left + x;
      word.y = top + y;
      if (x + word.width >= width) {
        x = 0;
        y += 40;
        word.x = left + x;
        word.y = top + y;
      }
      x += gap + word.width;
    });
  }

  private animateText(): void {
    this.tweens = [];
    this.words.forEach((word, i) => {
      word.alpha = 0;
      const tween:Tween<any> = new Tween(word)
        .to({ alpha: 1}, 100)
        .delay(i * 50)
        .start();
      this.tweens.push(tween);
    })

    Ticker.shared.add(this.update, this);
  }
    
  private update(): void {
    Group.shared.update();
  }

  override destroy(options?: IDestroyOptions | boolean): void {
    Ticker.shared.remove(this.update, this);
    super.destroy(options);
  }
}