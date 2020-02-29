import { GameObjects, Input } from 'phaser';
import Beam from './Beam';

export default class MainScene extends Phaser.Scene {
  background: Phaser.GameObjects.TileSprite;
  ship1:Phaser.Physics.Arcade.Sprite;
  ship2:Phaser.Physics.Arcade.Sprite;
  ship3:Phaser.Physics.Arcade.Sprite;
  powerUps: any;
  player: Phaser.Physics.Arcade.Sprite;
  cursorKeys: any;
  spacebar: any;
  enemies: Phaser.Physics.Arcade.Group;
  projectiles: Phaser.Physics.Arcade.Group;
  beam: Phaser.Physics.Arcade.Sprite
  DEFAULT_WIDTH = 1280;
  DEFAULT_HEIGHT = 800;
  constructor() {
    super({ key: 'MainScene' });
  }
  
  create() {
    var gameSettings = {
      playerSpeed: 200,
      maxPowerups :2,
      powerUpVel: 50,
  }

    this.background = this.add.tileSprite(600,400,1280,800,"background");
    this.ship1 = this.physics.add.sprite(this.DEFAULT_WIDTH/2 -150, this.DEFAULT_HEIGHT/2 ,"ship1");
    this.ship2 = this.physics.add.sprite(this.DEFAULT_WIDTH/2 , this.DEFAULT_HEIGHT/2 ,"ship2");
    this.ship3 = this.physics.add.sprite(this.DEFAULT_WIDTH/2 +150, this.DEFAULT_HEIGHT/2 ,"ship3");
    this.ship1.setScale(4);
    this.ship2.setScale(4);
    this.ship3.setScale(4);
    this.ship1.play("ship1_anim");
    this.ship2.play("ship2_anim");
    this.ship3.play("ship3_anim");
    this.ship1.setInteractive();
    this.ship2.setInteractive();
    this.ship3.setInteractive();
    this.enemies = this.physics.add.group();
    this.enemies.add(this.ship1);
    this.enemies.add(this.ship2);
    this.enemies.add(this.ship3);
    
    this.input.on('gameobjectdown',this.destroyShip,this);
    this.add.text(20,20, "Game is running", {
      font: "15px Arial", 
      fill:"red"});
    
    this.physics.world.setBoundsCollision();
    this.powerUps = this.physics.add.group();

    for(var i = 0; i<= gameSettings.maxPowerups; i++){
      var powerUp = this.physics.add.sprite(64,64, "power-up");
      this.powerUps.add(powerUp);
      powerUp.setRandomPosition(0,0,this.DEFAULT_WIDTH,this.DEFAULT_HEIGHT);
      
      if(Math.random() > 0.5){
        powerUp.play("red");
      }else {
        powerUp.play("grey");
      }
      powerUp.setVelocity(gameSettings.powerUpVel,gameSettings.powerUpVel);
      powerUp.setCollideWorldBounds(true);
      powerUp.setBounce(1);
    }
    this.player = this.physics.add.sprite(this.DEFAULT_WIDTH/2 -8,
      this.DEFAULT_HEIGHT - 64, "player");
      this.player.play("thrust");
      this.player.setScale(4);
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);

    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.projectiles = this.physics.add.group();

    this.physics.add.collider(this.projectiles, this.powerUps, 
      function(projectiles, powerUp){
        projectiles.destroy();
    });
    this.physics.add.overlap(this.player, this.powerUps,this.pickPowerUp, undefined, this);
    this.physics.add.overlap(this.player, this.enemies,this.hurtPlayer, undefined, this);
    this.physics.add.overlap(this.projectiles, this.enemies,this.hitEnemy, undefined, this);
  }

  update() {
    this.moveShip(this.ship1, 1);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 3);
    
    this.background.tilePositionY -= 0.5; 
    this.movePlayerManager();
    if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
      this.shootBeam();
    }
    for(var i = 0; i < this.projectiles.getChildren().length; i++){
      var beam = this.projectiles.getChildren()[i];
      beam.update();
    }  
  }
  shootBeam(){
    var beam = new Beam(this); 
   
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
  pickPowerUp(Player, powerUp){
    powerUp.disableBody(true, true);
  }
  hurtPlayer(player,enemy){
    this.resetPos(enemy);
    player.x = this.DEFAULT_WIDTH/2 -8;
    player.y = this.DEFAULT_HEIGHT - 64;
  } 
  hitEnemy(projectiles, enemy){
    projectiles.destroy();
    this.resetPos(enemy);
  }
}
