import { Container } from "pixi.js";
import { Button } from "./Button";
import { Menu } from "./Menu";

/**
 * The GameHUD displays in game UI
 */
export class GameHUD extends Container {

  private btnMenu: Button;
  private menu: Menu | undefined; 

  constructor() {
    super();

    this.btnMenu = new Button("Menu", "menu", 100);
    this.addChild(this.btnMenu);
    this.btnMenu.on("buttonselect", this.handleButonSelect, this);
  }

  private handleButonSelect(): void {
    // show menu
    this.menu = new Menu();
    this.addChild(this.menu);
    this.menu.on("close", this.handleCloseMenu, this);
  }

  private handleCloseMenu(): void {
    this.menu?.off("close");
    this.menu?.destroy();
    this.menu = undefined;
  }

  resize(screenWidth: number, screenHeight: number): void {
    this.btnMenu.x = screenWidth - (this.btnMenu.width / 2 + 20);
    this.btnMenu.y = 50;

    this.menu?.resize(screenWidth, screenHeight);
  }
}