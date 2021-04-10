import Matter from 'matter-js'
import * as Phaser from 'phaser'

export default class Crawler extends Phaser.Physics.Matter.Sprite {
  constructor(scene, x, y, texture = 'crawler') {
    super(scene.matter.world, x, y, texture)
    scene.add.existing(this)
    this.scene = scene;
    this.setPosition(x, y)
    this.setTexture(texture)
    this.body.label = 'crawler'
    
    // scene.anims.create({
    //   key: 'crawler-walk',
    //   frameRate: 40,
    //   frames: scene.anims.generateFrameNames('crawler', {
    //     prefix: 'walk',
    //     start:1,
    //     end:13
    //   })
    // })

  }

}