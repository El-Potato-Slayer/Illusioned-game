import * as Phaser from 'phaser';
import CST from '../CST';
import Crate from '../models/crate';
import Crawler from '../models/crawler';
// import Crawler from '../models/crawler';

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
    this.crate = null;
    this.cratePath = null;
    this.scoreCounter = null
    this.score = 0;
  }

  init(level) {
    this.level = 'thirdLevel'
    // this.level = level
    this.isTouchingGround = false
  }

  preload() {
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
    
    this.load.spritesheet('penguin', './assets/enemies/penguin.png', { frameWidth: 99, frameHeight: 155.6 })
    
    this.load.atlas('environment', './assets/environment.png', './assets/environment.json')
    this.load.atlas('player', './assets/player3.png', './assets/player3.json')
    this.load.atlas('crawler', './assets/enemies/crawler.png', './assets/enemies/crawler.json')
    this.load.atlas('water', './assets/props/water/water.png', './assets/props/water/water.json')  

    this.load.json('environmentshapes', './assets/environmentshapes.json')
    this.load.json('animationshapes', './assets/animations.json')

    this.load.audio('failMusic', './assets/sounds/failed.mp3')
  }

  create() {
    this.cameras.main.fadeIn(1000, 0, 0, 0)
    // this.scoreCounter = this.time.addEvent()
    // this.timerText = this.add.text(10, 10, "").setColor("#FFFFFF");

    this.background = this.add.tileSprite(0,0,2500,1000, 'sky').setOrigin(0,0);
    this.background.setScrollFactor(0)
    this.background.scaleX = 3
    // this.background.setDepth(0)
    this.createTimer()

    this.createBackgrounds()
    
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

    this.player = this.matter.add.sprite(0, 0, 'player')//, 'run1', {shape: animationShapes.run1})
    this.player.setScale(0.15)
    this.player.setRectangle(35,100)
    // this.player.setPolygon(35,6)
    this.player.body.friction = 0.4
    // this.player.body.frictionAir = 0.05
    this.player.setBounce(0)
    this.player.body.label = 'player'
    
    this.createAnimation('crawler-walk', 'crawler', 'walk', 1, 13)

    if (this.level === 'firstLevel') {
      this.player.setPosition(100, 850)
      let bridge = this.matter.add.image(0, 0, 'environment', 'bridge.png', {shape: environmentShapes.bridge})
      bridge.setPosition(5659, 872)
      bridge.setScale(0.65)
      bridge.setStatic(true)
      this.add.text(6300, 450, 'The answer lies within your fear', {
        fontFamily: 'New Tegomin',
        fontSize: '40px'
      })
      let path = this.add.path(2250,855)
      path.lineTo(2650, 855)
      path.lineTo(2250, 855)
      // this.crawler = new Crawler(this.scene.scene, 2210,700, 'crawler')
      // this.crawler.anims.play('crawler-walk')
      this.crawlerPath = this.add.follower(path, 0,0)
      // this.crawlerPath.startFollow({
      //   positionOnPath: true,
      //   duration: 5000,
      //   repeat: -1,
      //   rotateToPath: false,
      // })
      this.matter.add.rectangle(6640,1020, 600,200, {
        label: 'level2Transition',
        isSensor: true,
        isStatic:true
      })

      const crawler = new Crawler(this, 1000, 855, 'crawler')
      crawler.moveHorizontally(1130, 1530, 5000)
      crawler.anims.play('crawler-walk', true)

    } else if (this.level === 'secondLevel') {
      let path = this.add.path(1300,675)
      path.lineTo(300, 675)
      path.lineTo(1300, 675)

      this.player.setPosition(100, 50)
      let crate1 = new Crate(this, 1300, 0, 'crate', {
        isStatic: true
      }) 
      crate1.moveVertically(400, 675, 2000)

      let crate2 = new Crate(this, 2400, 0, 'crate', {
        isStatic: true
      }) 
      crate2.moveVertically(780, 400, 2000)

      let crate3 = new Crate(this, 6000, 800, 'crate', {
        isStatic: true
      }) 
      crate3.moveVertically(0, -800, 6000)
      crate3.moveHorizontally(0, 1000, 6000)
      
      this.matter.add.image(0,0, 'crate').setPosition(200,700).setScale(0.15).setMass(15)

      let crawler1 = new Crawler(this, 1000, 700, 'crawler')
      crawler1.moveHorizontally(1250, 2540, 7000)
      crawler1.anims.play('crawler-walk', true)
      let crawler2 = new Crawler(this, 2000, 900, 'crawler')
      crawler2.moveHorizontally(2195, 3810, 6000)
      crawler2.anims.play('crawler-walk', true)

      this.matter.add.rectangle(7000,100, 600,200, {
        label: 'level3Transition',
        isSensor: true,
        isStatic:true
      })
    } else if (this.level === 'thirdLevel') {
      let endingTransition = this.matter.add.rectangle(2400, 450, 100, 800, {
        label: 'endingTransition',
        isStatic: true,
        isSensor: true
      })
      this.background.setSize(1900, 1000).scaleX = 1
      this.player.setPosition(100, 110)
      let penguin = this.matter.add.sprite(3500,700,'penguin')
      penguin.setRectangle(50,130).setScale(-0.6, 0.6)
      this.anims.create({
        key: 'penguin-stand',
        frames: this.anims.generateFrameNumbers('penguin', { start: 0, end: 29 }),
        frameRate: 20,
        repeat: -1
    });
    penguin.anims.play('penguin-stand', true)
      const crate = new Crate(this, 100, 200, 'crate', {
        isStatic: true
      })
      crate.moveVertically(0, 650, '5000', true)
      
    }
    this.createWater()

    this.createAnimation('run', 'player', 'run', 1, 15)
    this.createAnimation('stand', 'player', 'stand', 1, 1)
    this.createAnimation('jump', 'player', 'jump', 1, 1)
    this.createAnimation('fall', 'player', 'land', 1, 1)
    
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

        
        if (bodyA.region && (bodyA.region.id === "0,156,21,22" || bodyB.label === "crawler") && !this.player.body.isSensor) {
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
          if (bodyA.label === 'player' || bodyB.label === 'player') {
            this.isTouchingGround = true;
          }
        } 
        if (bodyB.label === 'level2Transition' || bodyB.label === 'level3Transition') {
          this.player.setSensor(true)
          setTimeout(() => {
          this.cameras.main.fadeOut(1000,0,0,0)
          this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            this.registry.destroy(); // destroy registry
            this.events.off(); // disable all active events
            this.textures.list = []
            if (bodyB.label === 'level2Transition') {
              this.scene.restart('secondLevel'); // restart current scene
            }
            else if (bodyB.label === 'level3Transition') {
              this.scene.restart('thirdLevel'); // restart current scene
            }
          });
          }, 1000)
        }
        if (bodyB.label === 'endingTransition') {
          console.log(this.player.y);
          this.player.setActive(false)
          this.input.keyboard.enabled = false
          this.player.setVelocityX(0)
          this.player.body.velocity.x = 0
          // setTimeout(() => {
          // }, 3000)
          this.cameras.main.stopFollow()
          this.cameras.main.pan(3000, 835, 3000, 'Sine.easeInOut')
          
        }
      });
    });
  }



  update() {
    this.scoreCounter.setText(`${this.score}`);
    
    // this.timer.setPosition(this.cameras.main.scrollX, this.cameras.main.scrollY)
    
    // let elapsedTime = this.timer.getElapsedSeconds()
    // let minutes = Math.floor(elapsedTime / minutes * 60)
    // let seconds = Math.floor(elapsedTime / minutes * 60)
    // console.log(this.seconds);
    // this.crate.setPosition(this.cratePath.x, this.cratePath.y)
    // this.crawler.setPosition(this.crawlerPath.x, this.crawlerPath.y)
    // if (this.crawler.x < 2255) {
    //   this.crawler.scaleX = -1
    // } 
    // if (this.crawlerPath.x >= 2645) {
    //   this.crawler.scaleX = 1
    // }
    
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
      // this.player.setVelocityX(0);
      this.player.anims.play('stand');
    }
    this.player.setFixedRotation()

    this.tileSpritePositionChanges()
  }

  createTimer() {
    this.scoreCounter = this.add.text( 20,  20, '0:00', {
      fontFamily: 'New Tegomin',
      fontSize: '30px',
      fill: '#ffffff' 
    })
    this.scoreCounter.setScrollFactor(0).setDepth(1)
    if (this.score === 0) {
      setInterval(() => {
        this.score += 1
      } ,1000)
      
    }
  }

  createBackgrounds() {
    this.cityBackground1 = this.add.tileSprite(0,0, 1920, 1080, 'background1').setOrigin(0,0)
    this.cityBackground1.setScrollFactor(0)

    this.cityBackground2 = this.add.tileSprite(0,0, 1920, 1080, 'background2').setOrigin(0,0)
    this.cityBackground2.setScrollFactor(0)
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
      this.createGround(shape, platform.x, platform.y, platform.width, platform.scale, platform.rotation, platform.friction)
      // if (this.level === 'secondLevel' && i === 3) {
      //   ground.setStatic(false)
      //   ground.body.setImmovable = true
      //   ground.body.ignoreGravity = true
      //   this.tweens.add({
      //     targets: ground,
      //     from: 0,
      //     to: 360,
      //     duration: 500,
      //     repeat: -1,
      //     onUpdate: (tween, target) => {
      //       // ground.setPosition(3250,400)
      //       ground.rotation += 0.01
      //     }
      //   })
      // }
    }
  }

  createWater() {
    for (let i = 0; i < CST[this.level].water.length; i+=1) {
      let water = this.matter.add.sprite(CST[this.level].water[i].x, CST[this.level].water[i].y, 'water') 
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

  createGround(shapes, x, y, width, scale, rotation, friction) {
    let ground = this.matter.add.image(0, 0, 'ground', {shape:shapes.ground});
    ground.setPosition(x, y)
    ground.setStatic(true)

    ground.body.render
    if (scale) {
      ground.setScale(scale)
    }
    if (width) {
      ground.displayWidth = width

    }
    if (rotation) {
      ground.rotation = rotation
      
    }
    if (friction !== undefined) {
      ground.setFriction(0, 0, Infinity)
    }

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
      this.scene.restart(this.level);
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