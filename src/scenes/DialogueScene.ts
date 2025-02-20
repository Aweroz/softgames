import { Assets, BitmapText, Container, Sprite } from "pixi.js";
import { IScene, SceneManager } from "../SceneManager";
import { Background } from "../ui/Background";
import { GameHUD } from "../ui/GameHUD";
import { TextFrame } from "../games/dialogue/TextFrame";

type DialogueData = {
  dialogue: { name: string, text: string }[],
  emojies: { name: string, url: string} [],
  avatars: { name: string, url: string, position: string }[]
}

export class DialogueScene extends Container implements IScene {

  private bg: Background;
  private dialogueContainer: Container;
  private loading: BitmapText;
  private hud: GameHUD;
  private data: DialogueData | undefined;
  private currentLine: number;
  private character: Sprite | undefined;
  private characterSide: string;
  private frame: TextFrame | undefined;
  private availableEmojis: string[] = [];

  constructor() {
    super();

    this.currentLine = 0;
    this.characterSide = "";

    // add background
    this.bg = new Background("bg_yellow");
    this.addChild(this.bg);

    this.dialogueContainer = new Container();
    this.addChild(this.dialogueContainer);

    // add hud
    this.hud = new GameHUD();
    this.addChild(this.hud);

    // get data
    this.loading = new BitmapText("Loading...",
      {
        fontName: "fnt_uni_32",
        fontSize: 32,
        tint: 0xFFFFFF
      });
    this.dialogueContainer.addChild(this.loading);
    this.fetchData().then(() => {
      this.loading.visible = false;
      this.startDialogue();
    });
  }

  private async fetchData(): Promise<any> {
    Assets.add({
      alias: "dialogues",
      src: "https://private-624120-softgamesassignment.apiary-mock.com/v2/magicwords",
      loadParser: "loadJson"
    });
    try {
      this.data = await Assets.load("dialogues");
    } catch (error) {
      console.error(error);
    }
    
    // load avatars and emojis
    const images: string[] = [];
    this.data?.avatars.forEach((av) => {
      Assets.add({
        alias: av.name,
        src: av.url,
        loadParser: "loadTextures"
      });
      images.push(av.name);
    });

    this.data?.emojies.forEach((em) => {
      Assets.add({
        alias: em.name,
        src: em.url.replace("com:81", "com"), // this fixes wrong url
        loadParser: "loadTextures"
      });
      images.push(em.name);
      this.availableEmojis.push(em.name);
    })
    try {
      await Assets.load(images);
    } catch (error) {
      console.error(error);
    }
  }

  private startDialogue(): void {
    this.currentLine = 0;
    this.showDialogue();

    this.bg.eventMode = "dynamic";
    this.bg.on("pointertap", this.handleTap, this);
  }

  private handleTap(): void {
    if (this.currentLine < this.data!.dialogue.length - 1) {
      this.currentLine++;
      this.showDialogue();
    }
    
  }

  private showDialogue():void {
    // clean up
    if (this.character) {
      this.character.destroy();
      this.character = undefined;
    }
    if (this.frame) {
      this.frame.destroy();
      this.frame = undefined;
    }

    //
    const dialogue = this.data?.dialogue[this.currentLine];

    // set character 
    const characterData = this.data?.avatars.find(av => av.name === dialogue?.name);
    // some characters do not have avatar
    if (characterData) {
      this.character = Sprite.from(dialogue!.name);
      this.dialogueContainer.addChild(this.character);
      this.character.anchor.set(0.5, 1);
      this.characterSide = characterData.position;
    } else {
      this.characterSide = "";
    }

    // display dialogue in frame
    this.frame = new TextFrame(dialogue!.name, dialogue!.text, this.availableEmojis);
    this.dialogueContainer.addChildAt(this.frame, 0);

    //
    this.positionFrame(SceneManager.screenWidth, SceneManager.screenHeight);
    this.positionCharacter(SceneManager.screenWidth, SceneManager.screenHeight);
  }

  private positionCharacter(screenWidth: number, screenHeight: number): void {
    if (this.character) {
      this.character.x = screenWidth / 2 + (this.frame!.width / 2 + 50) * (this.characterSide === "left" ? -1 : 1);
      this.character.y = screenHeight;
    }
  }

  private positionFrame(screenWidth: number, screenHeight: number): void {
    if (this.frame) {
      this.frame.drawFrame(Math.max(500, screenWidth * 0.6));
      this.frame.positionText();
      this.frame.x = screenWidth / 2;
      this.frame.y = screenHeight;
    }
  }

  update(_deltaTime: number): void {

  }

  resize(screenWidth: number, screenHeight: number): void {
    this.hud.resize(screenWidth, screenHeight);

    this.loading.x = (screenWidth - this.loading.width) / 2;
    this.loading.y = screenHeight / 2;

    this.positionFrame(screenWidth, screenHeight);
    if (this.character) {
      this.positionCharacter(screenWidth, screenHeight);
    }
  }
}