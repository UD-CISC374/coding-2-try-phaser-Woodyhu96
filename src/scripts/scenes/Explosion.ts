export default class Explosion extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x,y){
        super(scene,x,y,"explosion");
        scene.add.existing(this);
        this.play("explode");
    }
}