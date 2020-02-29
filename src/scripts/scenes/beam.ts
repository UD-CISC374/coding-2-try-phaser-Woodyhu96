export default class Beam extends Phaser.Physics.Arcade.Sprite{
    
    constructor(scene){
        var x = scene.player.x;
        var y = scene.player.y;
        super(scene,x,y,"beam");

        scene.add.existing(this);
        //scene.projectiles.add(this);
        this.play("beam_anim");
        scene.physics.world.enableBody(this);
        this.body.velocity.y = -200;
        
    }
    update(){
        if(this.y < 50 ){
            this.destroy();
        }

        if(this.y > 600) {
            this.destroy();
        }

        if(this.x <70) {
            this.destroy();
        }

        if(this.x >700) {
            this.destroy();
        }
    }
   
}