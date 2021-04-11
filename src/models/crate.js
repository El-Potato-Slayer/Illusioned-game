import Phaser from 'phaser'

export default class Crate extends Phaser.Physics.Matter.Image {
  constructor(scene, x, y, texture, options)
  {
    super(scene.matter.world, x, y, texture, 0, options)
    scene.add.existing(this)
    this.setScale(0.15)
    this.setFriction(1, 0, Infinity)
    this.startX = x
    this.startY = y
  }

  moveVertically(start, end, time){
    this.scene.tweens.addCounter({
      from: start,
      to: end,
      duration: time,
      ease: Phaser.Math.Easing.Sine.InOut,
      repeat: -1,
      yoyo: true,
      onUpdate: (tween, target) => {
        const y = this.startY + target.value
        const dy = y - this.y
        this.y = y
        this.setVelocityY(dy)
      }
    })
  }

  moveHorizontally(start, end, time)
  {
    this.scene.tweens.addCounter({
      from: start,
      to: end,
      duration: time,
      ease: Phaser.Math.Easing.Sine.InOut,
      repeat: -1,
      yoyo: true,
      onUpdate: (tween, target) => {
        const x = this.startX + target.value
        const dx = x - this.x
        this.x = x
        this.setVelocityX(dx)
      }
    })
  }

  
}