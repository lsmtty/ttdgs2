import * as PIXI from '../../src/libs/pixi.js'
import * as Tween from '../..//src/libs/Tween.js'
import MiniPLoader from '../../src/other/loader'
import Monster from '../../src/sprites/monster'
import Bow from '../../src/sprites/bow'
import Position from '../../src/other/position'
import card from '../../src/sprites/card'
import mathUtil from '../../src/utils/mathUtil'
import gameUtil from '../../src/utils/gameUtil'
export default class monsterScene1 {
  constructor(parent) {
    this.parent = parent
    this.PIXIObject = new PIXI.Container()
    this.monster = null
    this.weapon = null
    this.monsterCard = null
    this.radish = null
    this.radish_timer = null
    this.initObject()
    gameUtil.playAudioAuto('assets/audio/bg_audio.mp3', true)
    return this
  }

  initObject() {
    // 添加背景
    const bkg = PIXI.Sprite.fromImage('assets/images/bg.png')
    bkg.width = 750
    bkg.height = 1334
    this.PIXIObject.addChild(bkg)

    let weapon_wrap = new PIXI.Container()
    weapon_wrap.width = 200
    weapon_wrap.height = 200
    weapon_wrap.x = 275, weapon_wrap.y = 1334 - 480
    this.PIXIObject.addChild(weapon_wrap)
    let weapon_bg = PIXI.Sprite.fromImage('assets/images/weapon_bg.png')
    weapon_wrap.addChild(weapon_bg)
    this.weapon = new Bow(new Position(16 + 88, 16 + 80), this)
    weapon_wrap.addChild(this.weapon.PIXIObject)

    this.createMonster(1)
    this.monsterCard =  new card(new Position(80, 285), this, null)

    let radish_wrap = new PIXI.Container()
    let radish_timer = null
    radish_wrap.width = 111
    radish_wrap.height = 111
    radish_wrap.x = 76, radish_wrap.y = 1334 - 434
    this.PIXIObject.addChild(radish_wrap)
    let radish_bg = PIXI.Sprite.fromImage('assets/images/radish_bg.png')
    radish_wrap.addChild(radish_bg)
    this.radish = PIXI.Sprite.fromImage('assets/images/radish.png')
    this.radish.x = 75, this.radish.y = 54
    this.radish.transform.pivot.y = 50
    this.radish.transform.pivot.x = 50
    radish_wrap.addChild(this.radish)

    this.radish.interactive = true;
    this.radish.on("tap", () => {
      this.randomMonster()
    })
    
    // 创建狩猎图
    let monster_dic = new PIXI.Sprite.fromImage('assets/images/monster_dic.png')
    monster_dic.x = 320
    monster_dic.y = 1145
    this.PIXIObject.addChild(monster_dic)
    let dictText = new PIXI.Text('狩猎图鉴', {
      fontFamily: 'FZCUYSJW--GB1-0',
      fontSize: '28px',
      fill: 'white'
    })
    dictText.x = 320;
    dictText.y = 1272;
    this.PIXIObject.addChild(dictText)
  }

  randomMonster (){
    if(this.radish_timer){
      Tween.remove(this.radish_timer)
      this.radish.transform.scale.y = 1
    }
    this.radish_timer = new Tween.Tween(this.radish.transform.scale).to({y: 0.8},250)
      .easing(Tween.Easing.Linear.None).start().yoyo(true).repeat(1)
    this.createMonster(1, true)
  }

  createMonster (scene, refresh = false) {
    if (refresh && this.monster) {
      this.PIXIObject.removeChild(this.monster.PIXIObject)
      this.weapon.destroyMonster()
      this.monster = null
    }
    let randomNum = mathUtil.getRandomNum(1, 8)
    this.monster = new Monster(100, '皮卡王', 1, randomNum, null, this , this.weapon)
    this.PIXIObject.addChild(this.monster.PIXIObject)
    this.weapon.setAssociateMonster(this.monster)
  }

  showInMonsterCard() {
    this.monsterCard.setMonster(this.monster)
    this.monsterCard.show()
  }
}