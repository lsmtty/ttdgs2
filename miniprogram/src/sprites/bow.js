import weapon from './weapon'
import gameUtil from '../utils/gameUtil'
import mathUtil from '../utils/mathUtil'
import Position from '../other/position'
import * as PIXI from '../../src/libs/pixi.js'
import * as Tween from '../../src/libs/Tween.js'
export default class bow extends weapon{
  constructor(position, parent, monster){
    super('bow', position, parent, monster)
    this.initBow()
    this.createArrows()
  }

  initBow() {
    this.PIXIObject.interactive = true
    this.timer = null, this.arrowNum = 0
    this.PIXIObject.on("tap", this.handleTap.bind(this))
  }

  createArrows() {
    this.arrows = []
    this.arrowNum = -1
    for (let i = 0; i < 5; i++) {
      let temp = new PIXI.Sprite.fromImage('assets/images/arrow.png') //110x170
      temp.x = 330, temp.y = 925
      temp.transform.pivot.x = 8 //pivot 旋转中心
      temp.transform.pivot.y = 40
      temp.alpha = 0
      this.parent.PIXIObject.addChild(temp)
      this.arrows.push(temp)
    }
  }

  handleTap () {
    let _this = this
    if (!this.monster) {
      return
    }
    if(this.timer){
      Tween.remove(this.timer)
      this.PIXIObject.transform.scale.y = 1
    }
    this.timer = new Tween.Tween(this.PIXIObject.transform.scale).to({y: 0.8},250)
    .easing(Tween.Easing.Linear.None).start().yoyo(true).repeat(1)
    this.arrowNum = this.arrowNum + 1 > 4 ? 0 : this.arrowNum + 1
    let arrow = this.arrows[this.arrowNum]
    arrow.x = 330,
    arrow.y = 925
    arrow.alpha = 1
    let r = mathUtil.getRotation({x : 750 - 275 - (16 + 88), y: 1334 - 480 - (16 + 80) }, {x: this.monster.position.x, y: this.monster.position.y - 120})
    arrow.transform.rotation = (r - 90) / 180 * Math.PI
    new Tween.Tween(arrow).to({ x: this.monster.position.x - 50, y: this.monster.position.y - 120}, 200).easing(Tween.Easing.Quintic.In).
      start().onComplete(function () {
        _this.monster.hurt(5, () => {}, function () {
          _this.parent.PIXIObject.removeChild(_this.monster.PIXIObject)
        })
        gameUtil.playAudioAuto('assets/audio/hit_audio.mp3')
      })
    new Tween.Tween(arrow).to({ alpha: 0}, 100).delay(200).easing(Tween.Easing.Quintic.In).
      start()
  }

  destroy() {
    this.parent.PIXIObject.removeChild(this.PIXIObject)
  }
}