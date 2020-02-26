import ExampleObject from '../objects/exampleObject';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  supreme: Phaser.GameObjects.Image;
  adidas: Phaser.GameObjects.Image;
  nike: Phaser.GameObjects.Image;
  stockx: Phaser.GameObjects.Image;
  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    var random1 = Phaser.Math.Between(50, 1200);
    var random2 = Phaser.Math.Between(50, 1200);
    var random3 = Phaser.Math.Between(50, 1200);
    var random4 = Phaser.Math.Between(50, 1200);
    
    this.add.image(600,400,"background");
    this.supreme = this.add.image(random1, -300, "supreme");
    this.supreme.setScale(0.5);
    this.adidas = this.add.image(random2, -100, "adidas");
    this.adidas.setScale(0.05);
    this.nike = this.add.image(random3, 200, "nike");
    this.nike.setScale(0.2);
    this.stockx = this.add.image (random4, -500, "stockx");
    this.stockx.setScale(0.5);

    this.add.text(20,20, "Playing game", {font: "25px Arial", fill:"yellow"});
    ///this.exampleObject = new ExampleObject(this, 0, 0);
  }
  moveicon(icon,speed,rotate){
    icon.y += speed;
    if(rotate === true){
      icon.angle += 2;
    }
    if(icon.y > 1100){
      this.resetIconPos(icon);
    }
  }
  resetIconPos(icon){
    icon.y = -50;
    var randomx = Phaser.Math.Between(50, 1200);
    icon.x = randomx;
  }
  respawn(num){
    
  }
  update() {
      this.moveicon(this.nike, 1,false);
      this.moveicon(this.supreme, 1,false);
      this.moveicon(this.stockx, 1,true);
      this.moveicon(this.adidas, 1,false);
  }
}
