export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("background","assets/background.jpg");
    this.load.image("supreme", "assets/sup.png");
    this.load.image("stockx","assets/stockx.png");
    this.load.image("adidas","assets/adidas.png");
    this.load.image("nike","assets/nike.png");
  }

  create() {
    this.add.text(20,20,"Loading game",{
      font: "25px Arial", 
      fill:"yllow"
    });
    this.scene.start('MainScene');
  }
}
