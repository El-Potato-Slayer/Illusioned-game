import { CST } from '../CST';

export default class FirstLevel extends Phaser.Scene {
  constructor() {
    super({
      key: CST.scenes.firstLevel,
    });
  }

  init(data) {
    console.log(data);
  }

  preload() {

  }

  create() {

  }

  update() {

  }
}