import { BitmapText, Container, FederatedPointerEvent, Graphics } from "pixi.js";

export class Button extends Container {

  private id: string;
  private back: Graphics;
  private label: BitmapText;

  constructor(label: string, id: string, width: number = 300) {
    super();

    this.id = id;

    this.back = new Graphics();
    this.back.beginFill(0x000000, 0.2);
    this.back.lineStyle(2, 0xffffff);
    this.back.drawRoundedRect(-width / 2, -30, width, 60, 15);
    this.back.endFill();

    this.addChild(this.back);

    this.label = new BitmapText(label,
    {
        fontName: "fnt_uni_32",
        fontSize: 24,
        tint: 0xFFFFFF
    });
    this.label.anchor.set(0.5);
    this.label.y = -3;
    this.addChild(this.label);

    this.eventMode = "dynamic";

    this.on("pointertap", this.handleTap, this);
    this.cursor = "pointer";
  }

  handleTap(_e: FederatedPointerEvent): void {
    this.emit("buttonselect", { id: this.id });
  }
}