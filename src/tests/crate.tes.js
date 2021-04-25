import Phaser from "phaser"
import game from "../index"
// import { Scene } from "phaser"
import Crate from "../models/crate"
// import MenuScene from "../scenes/Menu"

// import postScore, { getScores } from '../score';



describe('Valid Crate', () => {
  const crate = new Crate(Scene, 100, 50, 'texture')
  test('Checks x coordinate', () => {
    expect(crate.startX).toBe(100)
  })
  // const crate = new Crate(game.scene.scenes[0], 100, 50, 'texture')
  // expect(crate).toBe(Crate)
})