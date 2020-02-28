import { GameObjects, Input } from 'phaser';


export default class MainScene extends Phaser.Scene {
  background: any;
  ship1:any;
  ship2:any;
  ship3:any;
  powerUps: any;
  player: any;
  cursorKeys: any;
  spacebar: any;
  DEFAULT_WIDTH = 1280;
  DEFAULT_HEIGHT = 800;
  constructor() {
    super({ key: 'MainScene' });
  }
  
  create() {
    
    this.background = this.add.tileSprite(600,400,1280,800,"background");
    this.ship1 = this.add.sprite(this.DEFAULT_WIDTH/2 -150, this.DEFAULT_HEIGHT/2 ,"ship");
    this.ship2 = this.add.sprite(this.DEFAULT_WIDTH/2 , this.DEFAULT_HEIGHT/2 ,"ship2");
    this.ship3 = this.add.sprite(this.DEFAULT_WIDTH/2 +150, this.DEFAULT_HEIGHT/2 ,"ship3");
    this.ship1.setScale(4);
    this.ship2.setScale(4);
    this.ship3.setScale(4);
    // this.ship1.play("ship1_anim");
    // this.ship2.play("ship2_anim");
    // this.ship3.play("ship3_anim");
    this.ship1.setInteractive();
    this.ship2.setInteractive();
    this.ship3.setInteractive();

    this.input.on('gameobjectdown',this.destroyShip,this);
    this.add.text(20,20, "Game is running", {
      font: "15px Arial", 
      fill:"red"});
    
      this.physics.world.setBoundsCollision();
   
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

    this.player = this.physics.add.sprite(this.DEFAULT_WIDTH/2 -8,
      this.DEFAULT_HEIGHT - 64, "player");
      //this.player.play("thrust");
      this.player.setScale(4);
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);

    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

  }

  update() {
    this.moveShip(this.ship1, 1);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 3);
    
    this.background.tilePositionY -= 0.5; 
    this.movePlayerManager();
    if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
      console.log("Fire");
    }
  }
  movePlayerManager(){
    this.player.setVelocity(0);
    
    if(this.cursorKeys.left.isDown){
      this.player.setVelocityX(-200);
    }
    else if(this.cursorKeys.right.isDown){
      this.player.setVelocityX(200);
    }
    if(this.cursorKeys.up.isDown){
      this.player.setVelocityY(-200);
    }else if(this.cursorKeys.down.isDown){
      this.player.setVelocityY(200);
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
}
