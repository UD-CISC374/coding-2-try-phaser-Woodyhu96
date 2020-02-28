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
  }

  create() {
    this.add.text(20,20,"Loading game",{
      font: "25px Arial", 
      fill:"yllow"
    });
    this.scene.start('MainScene');
  }
}
