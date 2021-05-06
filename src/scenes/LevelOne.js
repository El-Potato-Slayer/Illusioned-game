import * as Phaser from 'phaser';
import CST from '../CST';
import Crate from '../models/crate';
import Crawler from '../models/crawler';
import HelperFunctions from '../functions';

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
    this.scoreCounter = null;
    this.score = 0;
    this.timedScore = null;
    this.backgroundMusic = null;
  }

  init(level) {
    this.level = level;
    this.isTouchingGround = false;
  }

  preload() {
    const loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xffffff,
      },
    });
    this.load.on('progress', (percentage) => {
      this.add.text(this.game.renderer.width / 2 - 30, this.game.renderer.height / 2 - 75, 'Loading', {
        fontFamily: 'New Tegomin',
        fontSize: '30px',
        fill: '#ffffff',
      });
      loadingBar.fillRect(this.game.renderer.width * 0.1, this.game.renderer.height / 2,
        (this.game.renderer.width * percentage) * 0.8, 30);
    });
    this.load.image('sky', CST[this.level].sky);
    if (this.level !== 'secondLevel') {
      this.load.image('cloud', CST[this.level].cloud);
    }
    this.load.image('ground', CST[this.level].ground);
    this.load.image('background1', CST[this.level].background1);
    this.load.image('background2', CST[this.level].background2);
    this.load.image('crate', './assets/crate.png');

    this.load.image('failed', './assets/texts/failed.png');
    this.load.image('restart', './assets/texts/restart.png');

    this.load.spritesheet('penguin', './assets/enemies/penguin.png', { frameWidth: 99, frameHeight: 155.6 });

    this.load.atlas('environment', './assets/environment.png', './assets/environment.json');
    this.load.atlas('player', './assets/player3.png', './assets/player3.json');
    this.load.atlas('crawler', './assets/enemies/crawler.png', './assets/enemies/crawler.json');
    this.load.atlas('water', './assets/props/water/water.png', './assets/props/water/water.json');

    this.load.json('environmentshapes', './assets/environmentshapes.json');
    this.load.json('animationshapes', './assets/animations.json');

    this.load.audio('failMusic', './assets/sounds/failed.mp3');
    this.load.audio('bgMusic1', './assets/sounds/level1.mp3');
    this.load.audio('bgMusic2', './assets/sounds/level2.mp3');
    this.load.audio('bgMusic3', './assets/sounds/level3.mp3');
  }

  create() {
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    this.matter.add.rectangle(0, 520, 15, 760, {
      label: 'leftBoundary',
      isStatic: true,
    });

    this.createLevelText();

    this.background = this.add.tileSprite(0, 0, 2500, 1000, 'sky').setOrigin(0, 0);
    this.background.setScrollFactor(0);
    this.background.scaleX = 3;
    this.createTimer();

    this.createBackgrounds();

    if (this.level !== 'secondLevel') {
      this.cloud = this.add.tileSprite(0, -200, 1920, 2000, 'cloud').setOrigin(0, 0);
      this.cloud.setScrollFactor(0);
      this.cloud.setScale(0.8);
    }

    this.matter.world.setBounds(0, 0, this.background.displayWidth,
      this.background.displayHeight + 20);
    const environmentShapes = this.cache.json.get('environmentshapes');

    const building = this.matter.add.image(0, 0, 'environment', `${this.level}Building.png`, { shape: environmentShapes[`${this.level}Building`] });
    building.setPosition(CST[`${this.level}`].buildingCoordinates.x, CST[`${this.level}`].buildingCoordinates.y);
    building.setScale(0.65);
    building.setStatic(true);

    this.createPlayer();

    this.createAnimation('crawler-walk', 'crawler', 'walk', 1, 13);

    if (this.level === 'firstLevel') {
      this.backgroundMusic = this.sound.add('bgMusic1', {
        loop: true,
        volume: 0.5,
      });

      this.player.setPosition(100, 850);

      this.createBridge(environmentShapes.bridge);

      this.matter.add.rectangle(6640, 1060, 600, 200, {
        label: 'level2Transition',
        isSensor: true,
        isStatic: true,
      });

      const crawler = new Crawler(this, 1000, 855, 'crawler');
      crawler.moveHorizontally(1130, 1530, 5000);
      crawler.anims.play('crawler-walk', true);
    } else if (this.level === 'secondLevel') {
      this.backgroundMusic = this.sound.add('bgMusic2', {
        loop: true,
        volume: 0.5,
      });

      this.createSecondLevelCrates();

      this.player.setPosition(100, 50);

      this.matter.add.image(0, 0, 'crate').setPosition(200, 700).setScale(0.15).setMass(15);

      this.createSecondLevelEnemies();

      this.matter.add.rectangle(7000, 100, 600, 200, {
        label: 'level3Transition',
        isSensor: true,
        isStatic: true,
      });
    } else if (this.level === 'thirdLevel') {
      this.backgroundMusic = this.sound.add('bgMusic3', {
        loop: true,
        volume: 0.5,
      });
      this.matter.add.rectangle(2400, 450, 100, 800, {
        label: 'endingTransition',
        isStatic: true,
        isSensor: true,
      });
      this.background.setSize(1900, 1000).scaleX = 1;
      this.player.setPosition(150, 110);

      this.createPenguin();

      const crate = new Crate(this, 150, 200, 'crate', {
        isStatic: true,
      });
      crate.moveVertically(0, 690, '5000', true);
    }
    this.backgroundMusic.play();

    this.createWater();

    this.cameras.main.setBounds(0, 0, this.background.displayWidth * 2,
      this.background.displayHeight);
    this.cameras.main.startFollow(this.player);

    this.createPlatforms('ground', this.background);

    this.createKeyboardInputs();

    this.matter.world.on('collisionstart', (event) => {
      event.pairs.forEach((pair) => {
        const { bodyA, bodyB } = pair;

        if (bodyA.region && (bodyA.region.id === '0,156,21,22' || bodyB.label === 'crawler') && !this.player.body.isSensor) {
          this.cameras.main.stopFollow();
          this.matter.world.remove(this.player);
          this.player.visible = false;
          this.backgroundMusic.stop();
          this.input.keyboard.enabled = false;
          this.player.setAngle(-90);
          const failMusic = this.sound.add('failMusic', {
            volume: 0.5,
          });

          failMusic.play();
          this.input.keyboard.enabled = false;
          this.restartText(failMusic);
        }

        if (bodyA.label !== 'leftBoundary') {
          if (bodyA.label === 'player' || bodyB.label === 'player') {
            this.isTouchingGround = true;
          }
        }

        if (bodyB.label === 'level2Transition' || bodyB.label === 'level3Transition') {
          this.player.setSensor(true);
          setTimeout(() => {
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
              this.registry.destroy();
              this.events.off();
              this.textures.list = [];
              if (bodyB.label === 'level2Transition') {
                this.scene.restart('secondLevel');
              } else if (bodyB.label === 'level3Transition') {
                this.scene.restart('thirdLevel');
              }
              this.tweens.add({
                targets: this.backgroundMusic,
                volume: 0,
                duration: 2000,
              });
              this.backgroundMusic.stop();
            });
          }, 1000);
        }
        if (bodyB.label === 'endingTransition') {
          this.cameras.main.stopFollow();
          this.cameras.main.pan(3000, 835, 2000, 'Sine.easeInOut');
          setTimeout(() => {
            this.cameras.main.fadeOut(10, 0, 0, 0);
            this.backgroundMusic.stop();
            this.registry.destroy();
            this.events.off();
            this.textures.list = [];
            this.scene.start(CST.scenes.incomplete, this.score);
          }, 3000);
        }
      });
    });
  }

  update() {
    this.timedScore.setText(`${HelperFunctions.convertScoreToTime(this.score)}`);

    if (this.player.body.velocity.y > 0 && !this.isTouchingGround) {
      this.player.anims.play('fall', true);
    }
    if (this.cursors.left.isDown || this.wasd.left.isDown) {
      this.player.setVelocityX(-5);
      this.player.scaleX = -0.15;
      if (this.isTouchingGround) {
        this.player.anims.play('run', true);
      }
    } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
      this.player.setVelocityX(5);
      this.player.scaleX = 0.15;
      if (this.isTouchingGround) {
        this.player.anims.play('run', true);
      }
    } else if (this.isTouchingGround) {
      this.player.anims.play('stand');
    }
    this.player.setFixedRotation();

    this.tileSpritePositionChanges();
  }

  createPlayer() {
    this.player = this.matter.add.sprite(0, 0, 'player');
    this.player.setScale(0.15);
    this.player.setRectangle(35, 100);
    this.player.body.friction = 0.4;
    this.player.setBounce(0);
    this.player.body.label = 'player';

    this.createAnimation('run', 'player', 'run', 1, 15);
    this.createAnimation('stand', 'player', 'stand', 1, 1);
    this.createAnimation('jump', 'player', 'jump', 1, 1);
    this.createAnimation('fall', 'player', 'land', 1, 1);
  }

  createLevelText() {
    const levelText = this.add.text(0, 0, '', {
      fontFamily: 'New Tegomin',
      fontSize: '70px',
      fill: '#ffffff',
    });
    if (this.level === 'firstLevel') {
      levelText.setText('Level One');
      levelText.text = 'Level One';
    } else if (this.level === 'secondLevel') {
      levelText.setText('Level Two');
    } else if (this.level === 'thirdLevel') {
      levelText.setText('Finale');
    }
    levelText.setPosition((this.cameras.main.width / 2) - (levelText.width / 2),
      this.cameras.main.height / 2 - 100).setDepth(1).setScrollFactor(0).setAlpha(0);
    this.tweens.add({
      targets: levelText,
      alpha: 1,
      duration: 2000,
      completeDelay: 3000,
      onComplete: () => {
        this.tweens.add({
          targets: levelText,
          alpha: 0,
          duration: 2000,
          onComplete: () => {
            levelText.active = false;
          },
        });
      },
    });
  }

  createBridge(shape) {
    const bridge = this.matter.add.image(0, 0, 'environment', 'bridge.png', { shape });
    bridge.setPosition(5659, 952);
    bridge.setScale(0.65);
    bridge.setStatic(true);
    this.add.text(6300, 450, 'The answer lies within your fear', {
      fontFamily: 'New Tegomin',
      fontSize: '40px',
    });
  }

  createSecondLevelCrates() {
    const crate1 = new Crate(this, 1340, 0, 'crate', {
      isStatic: true,
    });
    crate1.moveVertically(400, 715, 2000);

    const crate2 = new Crate(this, 2400, 0, 'crate', {
      isStatic: true,
    });
    crate2.moveVertically(780, 400, 2000);

    const crate3 = new Crate(this, 6000, 800, 'crate', {
      isStatic: true,
    });
    crate3.moveVertically(0, -800, 6000);
    crate3.moveHorizontally(0, 1000, 6000);
  }

  createSecondLevelEnemies() {
    const crawler1 = new Crawler(this, 1000, 700, 'crawler');
    crawler1.moveHorizontally(1250, 2540, 7000);
    crawler1.anims.play('crawler-walk', true);
    const crawler2 = new Crawler(this, 2000, 900, 'crawler');
    crawler2.moveHorizontally(2195, 3810, 6000);
    crawler2.anims.play('crawler-walk', true);
  }

  createKeyboardInputs() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys(
      {
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D,
      },
    );

    this.input.keyboard.on('keydown-W', () => this.jump());
    this.input.keyboard.addCapture('W');
    this.input.keyboard.on('keydown-UP', () => this.jump());
    this.input.keyboard.addCapture('UP');
  }

  createPenguin() {
    const penguin = this.matter.add.sprite(3500, 700, 'penguin');
    penguin.setRectangle(50, 130).setScale(-0.6, 0.6);
    this.anims.create({
      key: 'penguin-stand',
      frames: this.anims.generateFrameNumbers('penguin', { start: 0, end: 29 }),
      frameRate: 20,
      repeat: -1,
    });
    penguin.anims.play('penguin-stand', true);
  }

  createTimer() {
    this.timedScore = this.add.text(20, 20, '0:00', {
      fontFamily: 'New Tegomin',
      fontSize: '30px',
      fill: '#ffffff',
    });
    this.timedScore.setScrollFactor(0).setDepth(1);
    if (this.score === 0) {
      setInterval(() => {
        this.score += 1;
      }, 1000);
    }
  }

  createBackgrounds() {
    this.cityBackground1 = this.add.tileSprite(0, 0, 1920, 1080, 'background1').setOrigin(0, 0);
    this.cityBackground1.setScrollFactor(0);

    this.cityBackground2 = this.add.tileSprite(0, 0, 1920, 1080, 'background2').setOrigin(0, 0);
    this.cityBackground2.setScrollFactor(0);
  }

  tileSpritePositionChanges() {
    this.cityBackground1.tilePositionX = this.cameras.main.scrollX * 0.3;
    this.cityBackground1.tilePositionY = this.cameras.main.scrollY * 0.3;
    this.cityBackground2.tilePositionX = this.cameras.main.scrollX * 0.4;
    this.cityBackground2.tilePositionY = this.cameras.main.scrollY * 0.4;
    if (this.level !== 'secondLevel') {
      this.cloud.tilePositionX += 0.5;
      this.cloud.tilePositionY = 1000 + this.cameras.main.scrollY * 0.3;
    }
  }

  jump() {
    if (this.isTouchingGround) {
      this.player.setVelocityY(-12);
      this.isTouchingGround = false;
      this.player.anims.play('jump', true);
    }
  }

  createAnimation(key, atlasName, prefix, start, end) {
    this.anims.create({
      key,
      frames: this.anims.generateFrameNames(atlasName, {
        prefix,
        start,
        end,
      }),
      frameRate: 40,
      repeat: -1,
    });
  }

  createPlatforms(shape) {
    for (let i = 0; i < CST[`${this.level}`].platforms.length; i += 1) {
      const platform = CST[`${this.level}`].platforms[i];
      this.createGround(shape, platform.x, platform.y, platform.width,
        platform.scale, platform.rotation, platform.friction);
    }
  }

  createWater() {
    for (let i = 0; i < CST[this.level].water.length; i += 1) {
      const water = this.matter.add.sprite(CST[this.level].water[i].x, CST[this.level].water[i].y, 'water');
      water.setScale(0.5);
      water.setStatic(true);
      water.body.collisionFilter = {
        group: 1,
        category: 2,
        mask: 0,
      };
      this.createAnimation('waterMove', 'water', 'waterAnimation', 1, 63);
      water.anims.play('waterMove', true);
    }
  }

  createGround(shapes, x, y, width, scale, rotation, friction) {
    const ground = this.matter.add.image(0, 0, 'ground', { shape: shapes.ground });
    ground.setPosition(x, y);
    ground.setStatic(true);

    if (scale) {
      ground.setScale(scale);
    }
    if (width) {
      ground.displayWidth = width;
    }
    if (rotation) {
      ground.rotation = rotation;
    }
    if (friction !== undefined) {
      ground.setFriction(0, 0, Infinity);
    }

    return ground;
  }

  restartText(music) {
    const failed = this.add.image(this.cameras.main.scrollX + 680, this.cameras.main.scrollY + 250, 'failed');
    failed.setScale(0.8);
    failed.setAlpha(0);
    const restart = this.add.image(this.cameras.main.scrollX + 680, this.cameras.main.scrollY + 380, 'restart');
    restart.setInteractive();
    restart.setScale(0.8);
    restart.setAlpha(0);
    this.restartPointerEvents(restart, failed, music);
  }

  restartPointerEvents(restart, failed, failMusic) {
    restart.on('pointerover', () => {
      restart.setTintFill(0xA80D10);
    });
    restart.on('pointerout', () => {
      restart.setTint(0xFFFFFF);
    });
    restart.on('pointerdown', () => {
      restart.setTint(0xA80D10);
      failMusic.stop();
      this.registry.destroy();
      this.events.off();
      this.input.keyboard.enabled = true;
      this.scene.restart(this.level);
    });
    this.tweens.add({
      targets: [failed, restart],
      alpha: {
        value: 1, duration: 3000, ease: 'Sine.easeInOut',
      },
    });
  }
}