import Phaser from 'phaser';

export default class Crawler extends Phaser.Physics.Matter.Sprite {
  constructor(scene, x, y, texture, options) {
    super(scene.matter.world, x, y, texture, 0, options);
    scene.add.existing(this);
    this.scene = scene;
    this.setPosition(x, y);
    this.setTexture(texture);
    this.body.label = 'crawler';
    this.startX = x;
    this.startY = y;
  }

  moveHorizontally(start, end, time) {
    this.scene.tweens.addCounter({
      from: start,
      to: end,
      duration: time,
      ease: Phaser.Math.Easing.Sine.InOut,
      repeat: -1,
      yoyo: true,
      onUpdate: (tween, target) => {
        const x = start + target.value;
        if (x < start + start + 1) {
          this.scaleX = -1;
        } else if (x >= start + end - 1) {
          this.scaleX = 1;
        }
        this.x = x;
      },
    });
  }
}