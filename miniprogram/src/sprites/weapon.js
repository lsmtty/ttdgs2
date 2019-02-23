import sprite from './sprite'
import mathUtil from '../utils/mathUtil'
import * as Tween from '../..//src/libs/Tween.js'
import * as PIXI from '../../src/libs/pixi.js'

export default class weapon extends sprite {
  constructor(name, position, parent, monster) {
    super(position, parent)
    this.init()
    this.name = name
    this.monster = monster || null
    this.PIXIObject =  this.initPIXI()
    this.rotation()
    return this
  }

  init() {
    this.rotation = this.rotation.bind(this)
  }

  initPIXI() {
    let weapon = PIXI.Sprite.fromImage(`assets/images/weapon/${this.name}.png`)
    weapon.x = 12 + 88, weapon.y = 16 + 80
    weapon.x = this.position.x, weapon.y = this.position.y
    weapon.transform.pivot.y = 80
    weapon.transform.pivot.x = 88
    return weapon
  }

  setAssociateMonster(monster) {
    this.monster = monster
    this.rotation()
  }

  getAssociateMonster(monster) {
    return this.monster
  }

  destroyMonster() {
    this.monster = null
  }

  rotation() {
    let _this = this
    if (this.monster) { 
      let r = mathUtil.getRotation({x : 750 - 275 - (16 + 88), y: 1334 - 480 - (16 + 80) }, {x: this.monster.position.x, y: this.monster.position.y - 120})
      new Tween.Tween(this.PIXIObject.transform)
        .to({ rotation: (r - 90) / 180 * Math.PI}, 500)
        .easing(Tween.Easing.Linear.None)
        .start()
        .onComplete(_this.rotation)
    }
  }
}