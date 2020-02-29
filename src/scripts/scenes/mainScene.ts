import { GameObjects, Input } from 'phaser';
import Beam from './Beam';
import Explosion from './Explosion';
//import Explosion from './Explosion';
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
  beam: Phaser.Physics.Arcade.Sprite;
  scoreLabel;
  score: number;
  DEFAULT_WIDTH = 1280;
  DEFAULT_HEIGHT = 800;
  beamSound;
  explosionSound;
  pickupSound;
  music;
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

    let graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.beginPath();
    graphics.moveTo(0, 0);
    graphics.lineTo(this.scale.width, 0);
    graphics.lineTo(this.scale.width, 20);
    graphics.lineTo(0, 20);
    graphics.lineTo(0, 0);
    graphics.closePath();
    graphics.fillPath();
    this.score = 0;
    let scoreFormated = this.zeroPad(this.score, 6);
    this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE " + scoreFormated, 16);
    this.add.text(10, 20, "Playing game...", {font: "12px Arial", fill: "black"});


    this.physics.add.overlap(this.player, this.powerUps,this.pickPowerUp, undefined, this);
    this.physics.add.overlap(this.player, this.enemies,this.hurtPlayer, undefined, this);
    this.physics.add.overlap(this.projectiles, this.enemies,this.hitEnemy, undefined, this);
    this.beamSound = this.sound.add("audio_beam");
    this.explosionSound = this.sound.add("audio_explosion");
    this.pickupSound = this.sound.add("audio_pickup");

    this.music = this.sound.add("music");
    var musicConfig ={
      mute: false,
      volume: 1,
      rate:1,
      detune:0,
      seek:0,
      loop: false,
      delay:0
    }
    this.music.play(musicConfig);
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
    if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
      if(this.player.active){
        this.shootBeam();
      }
    }
  }
  shootBeam(){
    var beam = new Beam(this); 
    this.beamSound.play();
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
    this.score +=30;
    var scoreFormated = this.zeroPad(this.score,6);
    this.scoreLabel.text = "SCORE " + scoreFormated;
    this.pickupSound.play();
  }
  
  hurtPlayer(player,enemy){
    this.resetPos(enemy);
    if(this.player.alpha < 1){
      return;
    }
    var explosion = new Explosion(this, player.x, player.y);
    player.disableBody(true, true);
    this.time.addEvent({
      delay:1000,
      callback: this.resetPlayer,
      callbackScope: this,
      loop:false
    })
    this.score -= 15;
    var scoreFormated = this.zeroPad(this.score,6);
    this.scoreLabel.text = "SCORE " + scoreFormated;
    this.resetPlayer();
  } 
  hitEnemy(projectiles, enemy){
    var explosion = new Explosion(this,enemy.x, enemy.y);
    projectiles.destroy();
    this.resetPos(enemy);
    this.score +=15;
    var scoreFormated = this.zeroPad(this.score,6);
    this.scoreLabel.text = "SCORE " + scoreFormated;
    this.explosionSound.play();
  }
  zeroPad(number, size){
    var stringNumber = String(number);
    while(stringNumber.length < (size ||2)){
      stringNumber = "0" + stringNumber;
    }
    return stringNumber;
  }
  resetPlayer(){
    var x = this.DEFAULT_WIDTH/2 ;
    var y = this.DEFAULT_HEIGHT+64;
    this.player.enableBody(true,x,y,true,true);
    this.player.alpha = 1;
  }
}
