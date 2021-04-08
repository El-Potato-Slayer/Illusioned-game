import * as Phaser from 'phaser';
import CST from '../CST';

export default class FirstLevel extends Phaser.Scene {
  constructor() {
    super({
      key: CST.scenes.firstLevel,
    });
    this.level = null;
    this.player = null;
    this.ground = [];
    this.cursors = null;
    this.wasd = null;
    this.isTouchingGround = false;
    this.background = null;
    this.cityBackground1 = null;
    this.cityBackground2 = null;
    this.cloud = null;
  }

  init(level) {
    this.level = level
    // console.log(this.level);
  }

  preload() {
    console.log(CST[this.level].sky);
    this.load.image('sky', CST[this.level].sky);
    if (this.level !== 'secondLevel') {
      this.load.image('cloud', CST[this.level].cloud);
    }
    this.load.image('ground', CST[this.level].ground);
    this.load.image('background1', CST[this.level].background1)
    this.load.image('background2', CST[this.level].background2)

    // this.load.atlas('sheet', './assets/bg-1/spritesheet.png', './assets/bg-1/spritesheet.json')
    this.load.atlas('environment', './assets/environment.png', './assets/environment.json')
    this.load.atlas('player', './assets/player3.png', './assets/player3.json')
    // this.load.json('shapes', './assets/shapes.json')
    this.load.json('environmentshapes', './assets/environmentshapes.json')
    this.load.json('animationshapes', './assets/animations.json')
  }

  create() {
    this.cameras.main.fadeIn(1000, 0, 0, 0)

    this.background = this.add.tileSprite(0,0,1360,1000, 'sky').setOrigin(0,0);
    this.background.setScrollFactor(0)
    this.background.scaleX = 3

    this.cityBackground1 = this.add.tileSprite(0,0, 1920, 1080, 'background1').setOrigin(0,0)
    this.cityBackground1.setScrollFactor(0)

    this.cityBackground2 = this.add.tileSprite(0,0, 1920, 1080, 'background2').setOrigin(0,0)
    this.cityBackground2.setScrollFactor(0)
    
    if (this.level !== 'secondLevel') {
      this.cloud = this.add.tileSprite(0, -200, 1920, 2000, 'cloud').setOrigin(0,0)
      this.cloud.setScrollFactor(0)
      this.cloud.setScale(0.8)
    }

    // let shapes = this.cache.json.get('shapes')
    let environmentShapes = this.cache.json.get('environmentshapes')
    let animationShapes = this.cache.json.get('animationshapes')
    this.matter.world.setBounds(0,0, this.background.displayWidth, this.background.displayHeight + 20);
    this.player = this.matter.add.sprite(100, 700, 'player')//, 'run1', {shape: animationShapes.run1})
    this.player.setScale(0.15)
    this.player.setRectangle(35,100)
    // this.player.setFixedRotation()

    this.createAnimation('run', 'player', 'run', 1, 15)
    this.createAnimation('stand', 'player', 'stand', 1, 1)
    this.createAnimation('jump', 'player', 'jump', 1, 1)
    this.createAnimation('fall', 'player', 'land', 1, 1)

    let building = this.matter.add.sprite(0, 0, 'environment', `${this.level}Building.png`, {shape: environmentShapes[`${this.level}Building`]})
    building.setPosition(1600, this.background.displayHeight - 360)
    building.setScale(0.65)
    building.setStatic(true)

    this.cameras.main.setBounds(0,0,this.background.displayWidth * 2, this.background.displayHeight)
    this.cameras.main.startFollow(this.player)
    this.createPlatforms('ground', this.background)

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
        console.log(bodyA, bodyB);
        if (bodyA.id !== 1 && bodyA.id !== 2 && bodyA.id !== 3 && bodyA.id !== 4) {
          this.isTouchingGround = true;
        } 
        if (bodyA.id === 49) {
          this.registry.destroy(); // destroy registry
          this.events.off(); // disable all active events
          this.textures.list = []
          this.scene.restart('thirdLevel'); // restart current scene
        }
        if (bodyA.id === 2) {
          // this.input.keyboard.enabled = false
          // this.player.setVelocityX(0)
          // this.player.anims.play('stand');
          this.registry.destroy(); // destroy registry
          this.events.off(); // disable all active events
          this.textures.list = []
          
            this.scene.restart('secondLevel'); // restart current scene
          
          
          // restart.on('pointerover', () => {
          //   restart.setFill(0xA80D10);
          // });
          // restart.on('pointerout', () => {
          //   restart.setTint(0xFFFFFF);
          // });
          // restart.on('pointerdown', () => {
          //   restart.setTint(0xA80D10);
          //   // this.cameras.main.fadeOut(2000, 0, 0, 0);
          // });
          // this.tweens.add({
          //   targets: [failure, restart],
          //   alpha: {
          //     value: 1, duration: 3000, ease: 'Power1'
          //   }
          // })
          // this.scene.pause()
        }
      });
    });
    // this.player.on('animationupdate-run', (anim, frame, gameObject )  => {
    //   var sx = gameObject.x;
    //   var sy = gameObject.y;
    //   var sav = gameObject.body.angularVelocity;
    //   var sv = gameObject.body.velocity;
  
    //   let nextFrameId = frame.nextFrame.textureFrame.slice(0, frame.nextFrame.textureFrame.indexOf('.')); // get next frame id
    //   let nextShape = this.player[nextFrameId]; // get next shape
  
    //   /* These 2 methods must be run because:
    //   1`) Before change body if we scaled before our sprite we must set the scale to the start value
    //   */
    //   gameObject.setScale(1);
  
  
    //   gameObject.setBody(nextShape, { shape: animationShapes[nextFrameId] }); // set new  shape
  
    //   gameObject.setPosition(sx, sy);
    //   gameObject.setVelocity(sv.x, sv.y);
    //   gameObject.setAngularVelocity(sav);
    //   gameObject.setScale(.2); //again scale
    // })
  }

  update() {

    // if (this.player.body.velocity.y > 0 && !this.isTouchingGround) {
    //   this.player.anims.play('fall', true)
    // }
    if (this.player.body.velocity.y > 0 && !this.isTouchingGround) {
      this.player.anims.play('fall', true)
    }
    if (this.cursors.left.isDown || this.wasd.left.isDown)
    {
      this.player.setVelocityX(-5);
      this.player.setScale(-0.15,0.15)
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
    // this.player.angle = 0
    // if (this.player.body.onWorldBounds) {
    //   this.isTouchingGround = false 
    //   console.log('sds');
    // }
    this.player.setFixedRotation()

    this.tileSpritePositionChanges()
  }

  tileSpritePositionChanges(){
    this.cityBackground1.tilePositionX = this.cameras.main.scrollX * 0.3
    this.cityBackground1.tilePositionY = this.cameras.main.scrollY * 0.3
    this.cityBackground2.tilePositionX = this.cameras.main.scrollX * 0.4
    this.cityBackground2.tilePositionY = this.cameras.main.scrollY * 0.4
    if (this.level !== 'secondLevel') {
      // this.cloud.body.setMaxVelocityX(2)
      this.cloud.tilePositionX += 0.5 
      this.cloud.tilePositionY = 1000 + this.cameras.main.scrollY * 0.3
    }
    // this.cameras.main.on(Phaser.Cameras.Scene2D.Events.FOLLOW_UPDATE, () => {
    //   this.cloud.tilePositionX = this.cameras.main.scrollX * 0.8
    // });
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
    let ground = this.matter.add.image(0, 0, 'ground', {shape:shapes.ground});
    ground.setPosition(x, y)
    ground.body.render
    if (scale !== undefined) {
      ground.setScale(scale)
    }
    if (width !== undefined) {
      ground.displayWidth = width
    }
    ground.setStatic(true)
    this.ground.push(ground)
    // ground.setOnCollide(() => {
    //   this.isTouchingGround = true
    // })
  }
}