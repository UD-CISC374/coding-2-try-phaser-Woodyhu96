export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("background","assets/background.jpg");
    this.load.spritesheet("ship","assets/spritesheets/ship.png",{
      frameWidth:64,
      frameHeight:64
    });
    this.load.spritesheet("ship2","assets/spritesheets/ship2.png",{
      frameWidth:64,
      frameHeight:64
    });
    this.load.spritesheet("ship3","assets/spritesheets/ship3.png",{
      frameWidth:64,
      frameHeight:64
    });
    this.load.spritesheet("explosion","assets/spritesheets/explosion.png",{
      frameWidth:64,
      frameHeight:64
    });
    this.load.spritesheet("power-up","assets/spritesheets/power-up.png",{
      frameWidth:64,
      frameHeight:64
    });
    this.load.spritesheet("player", "assets/spritesheets/player.png",{
      frameWidth: 64,
      frameHeight: 96
    });
    this.load.spritesheet("beam", "assets/spritesheets/beam.png",{
      frameWidth: 64,
      frameHeight: 64
    });
  }

  create() {
    this.add.text(20,20,"Loading game",{
      font: "25px Arial", 
      fill:"yllow"
    });
    this.scene.start('MainScene');
    this.anims.create({
      key: "ship1_anim",
      frames: this.anims.generateFrameNumbers("ship", { 
        start: 0, end: 1}),
      frameRate:20,
      repeat:-1
    });
    this.anims.create({
      key: "ship2_anim",
      frames: this.anims.generateFrameNumbers("ship2", { 
        start: 0, end: 1}),
      frameRate:20,
      repeat:-1
    });
    this.anims.create({
      key: "ship3_anim",
      frames: this.anims.generateFrameNumbers("ship3", { 
        start: 0, end: 1}),
      frameRate:20,
      repeat:-1
    });
    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion", { 
        start: 0, end: 4}),
      frameRate:20,
      repeat:0,
      hideOnComplete: true
    });
    this.anims.create({
      key: "red",
      frames: this.anims.generateFrameNumbers("power-up", { 
        start: 0, end: 1}),
      frameRate:20,
      repeat:-1
    });
    this.anims.create({
      key: "gray",
      frames: this.anims.generateFrameNumbers("power-up", { 
        start: 2, end: 3}),
      frameRate:20,
      repeat:-1
    });
    this.anims.create({
      key: "thrust",
      frames: this.anims.generateFrameNumbers("player",{
        start:0, end: 1}),
        frameRate: 20,
        repeat: -1
    });
    this.anims.create({
      key:"beam_anim",
      frames: this.anims.generateFrameNumbers("beam", {
        start:0, end: 1}),
      frameRate: 20,
      repeat: -1
    });

  }
}
