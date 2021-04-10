import * as Phaser from 'phaser';
import CST from '../CST';
import Crawler from '../models/crawler';

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
    this.water = null;
    this.crawler = null;
    this.crawlerPath = null;
  }

  init(level) {
    this.level = 'firstLevel'
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
    this.load.image('crate', './assets/crate.png')

    this.load.image('failed', './assets/texts/failed.png')    
    this.load.image('restart', './assets/texts/restart.png')  
    
    // this.load.atlas('sheet', './assets/bg-1/spritesheet.png', './assets/bg-1/spritesheet.json')
    this.load.atlas('environment', './assets/environment.png', './assets/environment.json')
    this.load.atlas('player', './assets/player3.png', './assets/player3.json')
    this.load.atlas('crawler', './assets/enemies/crawler.png', './assets/enemies/crawler.json')
    this.load.atlas('water', './assets/props/water/water.png', './assets/props/water/water.json')  
    // this.load.json('shapes', './assets/shapes.json')
    this.load.json('environmentshapes', './assets/environmentshapes.json')
    this.load.json('animationshapes', './assets/animations.json')

    this.load.audio('failMusic', './assets/sounds/failed.mp3')
  }

  create() {
    this.cameras.main.fadeIn(1000, 0, 0, 0)

    this.background = this.add.tileSprite(0,0,2500,1000, 'sky').setOrigin(0,0);
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

    let building = this.matter.add.image(0, 0, 'environment', `${this.level}Building.png`, {shape: environmentShapes[`${this.level}Building`]})
    building.setPosition(CST[`${this.level}`].buildingCoordinates.x, CST[`${this.level}`].buildingCoordinates.y)
    building.setScale(0.65)
    building.setStatic(true)

    if (this.level === 'firstLevel') {
      let bridge = this.matter.add.image(0, 0, 'environment', 'bridge.png', {shape: environmentShapes.bridge})
      bridge.setPosition(4400, 880)
      bridge.setScale(0.65)
      bridge.setStatic(true)
    }
    
    this.player = this.matter.add.sprite(2080, 700, 'player')//, 'run1', {shape: animationShapes.run1})
    this.player.setScale(0.15)
    this.player.setRectangle(35,100)
    // this.player.setFriction(0.1, 0.1)

    // this.player.setFixedRotation()

    this.createAnimation('run', 'player', 'run', 1, 15)
    this.createAnimation('stand', 'player', 'stand', 1, 1)
    this.createAnimation('jump', 'player', 'jump', 1, 1)
    this.createAnimation('fall', 'player', 'land', 1, 1)

    
    let path = this.add.path(2250,855)
    path.lineTo(2650, 855)
    path.lineTo(2250, 855)
    this.createAnimation('crawler-walk', 'crawler', 'walk', 1, 13)
    // this.crawler = this.matter.add.sprite(2210, 700, 'crawler')
    let crw = this.add.sprite(2210,700)
    this.crawler = this.matter.add.sprite(crw)
    this.crawler.body.label = "crawler"
    this.crawler.anims.play('crawler-walk')
    this.crawlerPath = this.add.follower(path, 0,0)
    this.crawlerPath.startFollow({
      positionOnPath: true,
      duration: 5000,
      repeat: -1,
      rotateToPath: false,
    })

    // let crate = this.matter.add.image(0,0, 'crate')
    // crate.setPosition(2200, 700)
    // crate.setScale(0.15)

    // this.water.body.collisionFilter = {
    //   'group': 1,
    //   'category': 2,
    //   'mask': 0,
    // };
    this.createWater()
    
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

        
        if (bodyA.region && (bodyA.region.id === "0,156,21,22" || bodyB.label === "crawler")) {
          this.cameras.main.stopFollow()
          // this.player.y = 1200
          this.matter.world.remove(this.player)

          const failMusic = this.sound.add('failMusic', {
            volume: 0.5,
          })

          failMusic.play()
          this.input.keyboard.enabled = false
          this.restartText(failMusic)
        }
    
        
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
          
        }
      });
    });
  }

  update() {
    this.crawler.setPosition(this.crawlerPath.x, this.crawlerPath.y)
    if (this.crawler.x < 2255) {
      this.crawler.scaleX = -1
      console.log('small');
    } 
    if (this.crawlerPath.x >= 2645) {
      this.crawler.scaleX = 1
      console.log('sdds');
    }
    
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

  createPlatforms(shape) {
    for (let i = 0; i < CST[`${this.level}`].platforms.length; i+=1) {
      let platform = CST[`${this.level}`].platforms[i]
      this.createGround(shape, platform.x, platform.y, platform.width, platform.scale)
    }
  }

  createWater() {
    for (let i = 0; i < CST.firstLevel.water.length; i+=1) {
      let water = this.matter.add.sprite(CST.firstLevel.water[i].x, CST.firstLevel.water[i].y, 'water') 
      water.setScale(0.5)
      water.setStatic(true)
      water.body.collisionFilter = {
        'group': 1,
        'category': 2,
        'mask': 0,
      };
      this.createAnimation('waterMove', 'water', 'waterAnimation', 1, 63)
      water.anims.play('waterMove', true)

    }
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
    return ground
  }



  restartText(music) {
    const failed = this.add.image(this.cameras.main.scrollX + 680, this.cameras.main.scrollY +250, 'failed')           
    failed.setScale(0.8)
    failed.setAlpha(0)
    const restart = this.add.image(this.cameras.main.scrollX + 680, this.cameras.main.scrollY + 380, 'restart')           
    restart.setInteractive()
    restart.setScale(0.8)
    restart.setAlpha(0)
    this.restartPointerEvents(restart, failed, music)
  }

  restartPointerEvents(restart, failed, failMusic){
    restart.on('pointerover', () => {
      restart.setTintFill(0xA80D10);
    });
    restart.on('pointerout', () => {
      restart.setTint(0xFFFFFF);
    });
    restart.on('pointerdown', () => {
      restart.setTint(0xA80D10);
      failMusic.stop()
      this.registry.destroy(); // destroy registry
      this.events.off(); // disable all active events
      this.input.keyboard.enabled = true
      this.scene.restart(this.scene);
      // this.cameras.main.fadeOut(2000, 0, 0, 0);
    });
    this.tweens.add({
      targets: [failed, restart],
      alpha: {
        value: 1, duration: 3000, ease: 'Sine.easeInOut'
      }
    })
  }
}