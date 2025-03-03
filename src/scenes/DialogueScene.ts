import { Assets, BitmapText, Container } from "pixi.js";
import { IScene, SceneManager } from "../SceneManager";
import { Background } from "../ui/Background";
import { GameHUD } from "../ui/GameHUD";
import { TextFrame } from "../games/dialogue/TextFrame";
import { Character } from "../games/dialogue/Character";
import { Group } from "tweedle.js";

type Dialogue = {
  name: string,
  text: string
}

type Emoji = {
  name: string,
  url: string
}

type Avatar = {
  name: string,
  url: string,
  position: string
}

type DialogueData = {
  dialogue: Dialogue[],
  emojies: Emoji[],
  avatars: Avatar[]
}

export class DialogueScene extends Container implements IScene {

  private bg: Background;
  private dialogueContainer: Container;
  private loading: BitmapText;
  private hud: GameHUD;
  private data: DialogueData | undefined;
  private currentLine: number;
  private character: Character | undefined;
  private frame: TextFrame | undefined;
  private availableEmojis: string[] = [];

  constructor() {
    super();

    this.currentLine = 0;

    // add background
    this.bg = new Background("bg_green");
    this.addChild(this.bg);

    this.dialogueContainer = new Container();
    this.addChild(this.dialogueContainer);

    // add hud
    this.hud = new GameHUD();
    this.addChild(this.hud);

    // show loader
    this.loading = new BitmapText("Loading...",
      {
        fontName: "Uni0554",
        fontSize: 32,
        tint: 0xFFFFFF
      });
    this.dialogueContainer.addChild(this.loading);

    // get data
    this.fetchData()
      .then(() => {
        this.loading.visible = false;
        this.startDialogue();
      })
      .catch((reason: unknown) => {
        console.log(reason);
      });
  }

  private async fetchData(): Promise<void> {
    Assets.add({
      alias: "dialogues",
      src: "https://private-624120-softgamesassignment.apiary-mock.com/v2/magicwords1",
      loadParser: "loadJson"
    });
    try {
      this.data = await Assets.load("dialogues");
    } catch (error) {
      console.error(error);
      throw Error("data load error");
    }

    //
    if (!this.data) throw Error("no data");

    await this.loadImages(this.data.avatars);
    this.availableEmojis = await this.loadImages(this.data.emojies);
  }

  private async loadImages(list: Emoji[] | Avatar[]): Promise<string[]> {
    const loaded: string[] = [];
    for (const item of list) {
      Assets.add({
        alias: item.name,
        src: item.url, //.replace(":81", ""), // dirty fix to solve issue with broken url - without this there is an issue on Apple devices, seems to be bug in pixi assets loader
        loadParser: "loadTextures"
      });
      loaded.push(item.name);
      try {
        await Assets.load(item.name);
      } catch (error) {
        this.availableEmojis = this.availableEmojis.filter(name => name !== item.name);
        console.error(error);
      }
    };
    return loaded;
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
    const dialogue = this.data!.dialogue[this.currentLine];

    // set character 
    const characterData = this.data?.avatars.find(av => av.name === dialogue.name);
    // some characters do not have avatar
    if (characterData) {
      this.character = new Character(dialogue.name, characterData.position);
      this.dialogueContainer.addChild(this.character);
    }

    // display dialogue in frame
    this.frame = new TextFrame(dialogue.name, dialogue.text, this.availableEmojis);
    this.dialogueContainer.addChildAt(this.frame, 0);

    //
    const width: number = SceneManager.GetInstance().screenWidth;
    const height: number = SceneManager.GetInstance().screenHeight;
    this.positionFrame(width, height);
    this.positionCharacter(width, height);
  }

  // set position of the character next to the frame
  private positionCharacter(screenWidth: number, screenHeight: number): void {
    if (this.character && this.frame) {
      this.character.x = screenWidth / 2 + (this.frame.width / 2 + 50) * (this.character.side === "left" ? -1 : 1);
      this.character.y = screenHeight;
    }
  }

  // set position of the frame at the bottom of the screen
  private positionFrame(screenWidth: number, screenHeight: number): void {
    if (this.frame) {
      this.frame.drawFrame(Math.max(500, screenWidth * 0.6));
      this.frame.positionText();
      this.frame.x = screenWidth / 2;
      this.frame.y = screenHeight;
    }
  }

  update(_deltaTime: number): void {
    Group.shared.update();
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