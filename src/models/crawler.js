import * as Phaser from 'phaser'

export default class Crawler extends Phaser.GameObjects.Sprite {
  constructor(x, y, texture = 'crawler') {
    super(x, y, texture)
  }

}