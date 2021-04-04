import * as Phaser from 'phaser';
import CST from '../CST';

export default class FirstLevel extends Phaser.Scene {
  constructor() {
    super({
      key: CST.scenes.firstLevel,
    });
    let player;
    let ground;
    let cursors;
  }


  init(data) {
    console.log('ssd');
  }

  preload() {
    this.load.image('bg', './assets/bg-1/bg-r.png');
    this.load.image('ground', './assets/bg-1/ground1.png');
    this.load.spritesheet('player', 'assets/walk.png', { frameWidth: 85, frameHeight: 110 });
  }

  create() {
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    this.add.image(680, 350, 'bg');
    // this.add.image(680, 310, 'ground1');
    // this.ground = this.physics.add.staticGroup();
    // this.ground.create(680, 700, 'ground')
    // this.player = this.physics.add.sprite(0, 100, 'player');
    // this.player.setBounce(0.2)
    // this.player.setCollideWorldBounds(true)
    // this.cursors = this.input.keyboard.createCursorKeys();

    // this.anims.create({
    //   key: 'left',
    //   frames: this.anims.generateFrameNumbers('player', { start: 1, end: 12 }),
    //   frameRate: 25,
    //   repeat: -1
    // });

    // this.anims.create({
    //   key: 'turn',
    //   frames: [ { key: 'player', frame: 0 } ],
    //   frameRate: 25
    // });

    // this.anims.create({
    //   key: 'right',
    //   frames: this.anims.generateFrameNumbers('player', { start: 1, end: 12 }),
    //   frameRate: 25,
    //   repeat: -1
    // });

    // this.physics.add.collider(player, ground);
  }

  // update() {
  //   if (cursors.left.isDown)
  //   {
  //     this.player.setVelocityX(-300);
  //     this.player.scaleX = -1
  //     this.player.anims.play('left', true);
  //   }
  //   else if (cursors.right.isDown)
  //   {
  //     this.player.setVelocityX(300);
  //     this.player.scaleX = 1
  //     this.player.anims.play('right', true);
  //   }
  //   else
  //   {
  //     this.player.setVelocityX(0);
  //     this.player.anims.play('turn');
  //   }

  //   if (cursors.up.isDown && player.body.touching.down)
  //   {
  //     this.player.setVelocityY(-330);
  //   }
  // }
}