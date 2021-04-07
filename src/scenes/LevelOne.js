import * as Phaser from 'phaser';
import CST from '../CST';

export default class FirstLevel extends Phaser.Scene {
  constructor() {
    super({
      key: CST.scenes.firstLevel,
    });
    this.player = null;
    this.ground = null;
    this.cursors = null;
    this.wasd = null;
    this.isTouchingGround = false;
    this.background = null;
    this.cityBackground1 = null;
    this.cityBackground2 = null;
    this.cloud = null;
  }

  preload() {
    // this.load.image('bg', './assets/bg-1/bg-r.png');
    this.load.image('sky', './assets/bg-1/background.png');
    this.load.image('cloud', './assets/bg-1/layers/2.png');
    this.load.image('ground', './assets/bg-1/ground.png');
    this.load.image('l1_city1', './assets/bg-1/layers/3.png')
    this.load.image('l1_city2', './assets/bg-1/city2.png')
    // this.load.image('house', './assets/bg-1/layers/6.png');

    this.load.atlas('sheet', './assets/bg-1/spritesheet.png', './assets/bg-1/spritesheet.json')
    this.load.atlas('player', './assets/player3.png', './assets/player3.json')
    this.load.json('shapes', './assets/shapes.json')
    
    // this.load.spritesheet('player', 'assets/player.png', { frameWidth: 488, frameHeight: 694 });
    
  }

  create() {
    this.cameras.main.fadeIn(1000, 0, 0, 0)

    this.background = this.add.tileSprite(0,0,1360,1000, 'sky').setOrigin(0,0);
    this.background.setScrollFactor(0)
    this.background.scaleX = 3
    // this.background.fixedToCamera = true
    // bg.setScale(2)
    // bg = this.add.image(bg.displayWidth,0,'sky').setOrigin(0,0);

    this.cityBackground1 = this.add.tileSprite(0,0, 1920, 1080, 'l1_city1').setOrigin(0,0)
    this.cityBackground1.setScrollFactor(0)

    this.cityBackground2 = this.add.tileSprite(0,0, 1920, 1080, 'l1_city2').setOrigin(0,0)
    this.cityBackground2.setScrollFactor(0)
    
    this.cloud = this.add.tileSprite(0, -200, 1920, 2000, 'cloud').setOrigin(0,0)
    this.cloud.setScrollFactor(0)
    this.cloud.setScale(0.8)
    // cloud = this.add.image(cloud.displayWidth, 0, 'cloud').setOrigin(0,0)

    // cloud = this.add.image(60, 700, 'cloud').setOrigin(0,0)

    let shapes = this.cache.json.get('shapes')
    this.matter.world.setBounds(0,0, this.background.displayWidth, this.background.displayHeight + 20);

    this.player = this.matter.add.sprite(100, 650, 'player')
    this.player.setScale(0.15)
    // this.player.setFixedRotation()

    this.createAnimation('run', 'player', 'run', 1, 15)
    this.createAnimation('stand', 'player', 'stand', 1, 1)
    this.createAnimation('jump', 'player', 'jump', 1, 1)
    this.createAnimation('fall', 'player', 'land', 1, 1)

    let house = this.matter.add.sprite(0, 0, 'sheet', 'house.png', {shape: shapes.house})
    house.setPosition(1600, this.background.displayHeight - 360)
    house.setScale(0.65)
    house.setStatic(true)

    this.cameras.main.setBounds(0,0,this.background.displayWidth * 2, this.background.displayHeight)
    this.cameras.main.startFollow(this.player)
    
    this.createPlatforms(shapes, this.background)

    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys(
      {up:Phaser.Input.Keyboard.KeyCodes.W,
      down:Phaser.Input.Keyboard.KeyCodes.S,
      left:Phaser.Input.Keyboard.KeyCodes.A,
      right:Phaser.Input.Keyboard.KeyCodes.D});

    this.input.keyboard.on('keydown-W', () => this.jump());
    this.input.keyboard.addCapture('W');
    this.input.keyboard.on('keydown-UP', () => this.jump());
    this.input.keyboard.addCapture('UP');

    this.matter.world.on("collisionstart", (event) => {
      event.pairs.forEach(pair => {
        const { bodyA, bodyB } = pair;
        if (bodyA.id !== 1 && bodyA.id !== 2 && bodyA.id !== 3 && bodyA.id !== 4) {
          this.isTouchingGround = true;
        } 
        if (bodyA.id === 1) {
          // this.player.setSensor(true)
          // this.player.body.enable = false
          // this.scene.pause()
        }
      });
    });
    
  }

  update() {
    
    if (this.player.body.velocity.y > 0 && !this.isTouchingGround) {
      this.player.anims.play('fall', true)
    }
    if (this.cursors.left.isDown || this.wasd.left.isDown)
    {
      this.player.setVelocityX(-5);
      this.player.scaleX = -0.15
      if (this.isTouchingGround) {
        this.player.anims.play('run', true);
      }
      // this.cityBackground1.tilePositionX += 2
    }
    else if (this.cursors.right.isDown || this.wasd.right.isDown)
    {
      this.player.setVelocityX(5);
      this.player.scaleX = 0.15
      if (this.isTouchingGround) {
        this.player.anims.play('run', true);
      }
      // this.cityBackground1.tilePositionX -= 2

    }
    else if(this.isTouchingGround)
    {
      this.player.setVelocityX(0);
      this.player.anims.play('stand');
    }
    this.player.angle = 0
    if (this.player.body.onWorldBounds) {
      this.isTouchingGround = false 
      console.log('sds');
    }
    this.tileSpritePositionChanges()
  }

  tileSpritePositionChanges(){
    this.cityBackground1.tilePositionX = this.cameras.main.scrollX * 0.3
    this.cityBackground1.tilePositionY = this.cameras.main.scrollY * 0.3
    this.cityBackground2.tilePositionX = this.cameras.main.scrollX * 0.4
    this.cityBackground2.tilePositionY = this.cameras.main.scrollY * 0.4
    this.cloud.tilePositionX += 0.5
    this.cloud.tilePositionY = 1000 + this.cameras.main.scrollY * 0.3
  }
  
  jump() {
    if (this.isTouchingGround)
    {
      this.player.setVelocityY(-12);
      this.isTouchingGround = false
      this.player.anims.play('jump', true);
    }
  }

  createAnimation(key, atlasName, prefix, start, end) {
    this.anims.create({
      key: key,
      frames: this.anims.generateFrameNames(atlasName, {
        prefix: prefix,
        // suffix: ".png",
        start: start,
        end: end
      }),
      frameRate: 40,
      repeat: -1
    });
  }

  createPlatforms(shapes, background) {
    for (let i = 1; i <= 4; i++) {
      if (i !== 4) {
        this.createGround(shapes, 680 * i, background.displayHeight - 60)
      } else{
        this.createGround(shapes, 680 * i, background.displayHeight - 60, 400)
      }
    }    

    this.createGround(shapes, 1000, background.displayHeight - 260, 600, 0.6)
    this.createGround(shapes, 1150, background.displayHeight - 430, 400, 0.6)
  }

  createGround(shapes, x, y, width, scale) {
    let ground = this.matter.add.sprite(0, 0, 'ground', {shape:shapes.ground});
    ground.setPosition(x, y)
    if (scale !== undefined) {
      ground.setScale(scale)
    }
    if (width !== undefined) {
      ground.displayWidth = width
    }
    ground.setStatic(true)
    // ground.setOnCollide(() => {
    //   this.isTouchingGround = true
    // })
  }
}