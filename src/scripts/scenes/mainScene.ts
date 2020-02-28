import { GameObjects, Input } from 'phaser';


export default class MainScene extends Phaser.Scene {
  background: Phaser.GameObjects.Image;
  ship1:any;
  ship2:any;
  ship3:any;
  powerUps: any;
  DEFAULT_WIDTH = 1280;
  DEFAULT_HEIGHT = 968;
  constructor() {
    super({ key: 'MainScene' });
  }
  
  create() {
    this.add.text(20,20, "Game is running", {font: "15px Arial", fill:"red"});
    this.background = this.add.image(600,400,"background");
    this.ship1 = this.add.sprite(this.DEFAULT_WIDTH/2 -150, this.DEFAULT_HEIGHT/2 ,"ship");
    this.ship2 = this.add.sprite(this.DEFAULT_WIDTH/2 , this.DEFAULT_HEIGHT/2 ,"ship2");
    this.ship3 = this.add.sprite(this.DEFAULT_WIDTH/2 +150, this.DEFAULT_HEIGHT/2 ,"ship3");
    this.ship1.setScale(4);
    this.ship2.setScale(4);
    this.ship3.setScale(4);

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
    
    // this.ship1.play("ship1_anim");
    // this.ship2.play("ship2_anim");
    // this.ship3.play("ship3_anim");
    this.ship1.setInteractive();
    this.ship2.setInteractive();
    this.ship3.setInteractive();

    this.input.on('gameobjectdown',this.destroyShip,this);
    
    
    this.powerUps = this.physics.add.group();
    var maxObjects = 4;
    for(var i = 0; i<= maxObjects; i++){
      var powerUp = this.physics.add.sprite(64,64, "power-up");
      this.powerUps.add(powerUp);
      powerUp.setRandomPosition(0,0,this.DEFAULT_WIDTH,this.DEFAULT_HEIGHT);
      
      if(Math.random() > 0.5){
        //powerUp.play("red");
      }else {
        //powerUp.play("grey");
      }
      powerUp.setVelocity(100,100);
      powerUp.setCollideWorldBounds(true);
      powerUp.setBounce(1);
    }
  }
  moveShip(ship,speed){
    ship.y += speed;
    if(ship.y > 1100){
      this.resetPos(ship);
    }
  }
  resetPos(ship){
    ship.y = -50;
    var randomx = Phaser.Math.Between(50, 1200);
    ship.x = randomx;
  }
  destroyShip(pointer,GameObject){
    GameObject.setTexture("explosion");
    GameObject.play("explode");
  }
  update() {
    this.moveShip(this.ship1, 1);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 3);
      //this.movePlayerManager();
  }

  // movePlayerManager(){
  //   this.cursor = this.input.keyboard.createCursorKeys();
  //   if(this.cursor.left?.isDown){
  //     this.player.setVelocityX(-200);
  //   }
  //   else if(this.cursor.right?.isDown){
  //     this.player.setVelocityX(200);
  //   }
  // }
}
