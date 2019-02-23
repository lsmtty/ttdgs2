import sprite from "./sprite";
import * as PIXI from '../../src/libs/pixi.js'
import * as Tween from '../../src/libs/Tween.js'
export default class monsterCard extends sprite{
  constructor(position, parent, monster, saveFlag = true) {
    super(position ,parent)
    this.monster = monster || null
    this.saveFlag = saveFlag
    this.PIXIObject = this.initPIXI()
  }

  initPIXI() {
    let card_wrap = new PIXI.Container()
    card_wrap.x = 0
    card_wrap.y = 0
    card_wrap.width = 750
    card_wrap.height = 1334
    let card = new PIXI.Container()
    card.x = this.position.x
    card.y = this.position.y
    card.width = 590
    card.height = 786
    card_wrap.addChild(card)
    let cardBackground = new PIXI.Graphics().beginFill(0xFFFFFF).drawRoundedRect(0, 0, 590, 786, 20).endFill()
    card.addChild(cardBackground)
    if (this.monster) {
      let catchText = new PIXI.Text(`捕获${this.monster.name}`, {
        fontFamily: 'FZCUYSJW--GB1-0',
        fontSize: '50px',
        fill: '#F85B58'
      })
      catchText.x = 295
      catchText.y = 75
      catchText.transform.pivot.x = 125
      catchText.transform.pivot.y = 0
      card.addChild(catchText)

      let catchNumberText = new PIXI.Text(`我拥有1只`, {
        fontFamily: 'FZCUYSJW--GB1-0',
        fontSize: '26px',
        fill: '#9BA0A4'
      })
      catchNumberText.x = 295
      catchNumberText.y = 150
      catchNumberText.transform.pivot.x = 57.5
      catchText.transform.pivot.y = 0
      card.addChild(catchNumberText)

      let buddle = PIXI.Sprite.fromImage('assets/images/common/buddle.png')
      buddle.x = 174,buddle.y = 217
      buddle.width = 242, buddle.height = 81
      card.addChild(buddle)
      let monsterSay = new PIXI.Text('喵呜呜~', {
        fontFamily: 'FZCUYSJW--GB1-0',
        fontSize: '30px',
        fill: '#98A5AE'
      })
      monsterSay.x = 239
      monsterSay.y = 232
      card.addChild(monsterSay)

      let monsterSrc = monsterSrc = 'assets/images/monsters/scene' + this.monster.scene + '/monster' + this.monster.id + '.png'
      let monster = PIXI.Sprite.fromImage(monsterSrc)
      monster.x = 208
      monster.y = 345
      monster.width = 180
      monster.height = 180
      card.addChild(monster)
    }
    if (this.saveFlag) {
      let new_icon = PIXI.Sprite.fromImage('assets/images/icon_new.png')
      new_icon.x = 0
      new_icon.y = 0
      new_icon.width = 100
      new_icon.height = 100
      card.addChild(new_icon)
    }
    let orangeButton = PIXI.Sprite.fromImage('assets/images/orange_button.png')
    orangeButton.x = 46
    orangeButton.y = 612
    orangeButton.width = 237
    orangeButton.height = 110
    orangeButton.interactive = true
    orangeButton.on("tap", this.handleSend.bind(this))
    card.addChild(orangeButton)
    let saleText = new PIXI.Text('卖钱', {
      fontFamily: 'FZCUYSJW--GB1-0',
      fontSize: '36px',
      fill: 'white'
    })
    saleText.x = 125
    saleText.y = 637
    card.addChild(saleText)
    let greenButton = PIXI.Sprite.fromImage('assets/images/green_button.png')
    greenButton.x = 315
    greenButton.y = 612
    greenButton.width = 237
    greenButton.height = 110
    greenButton.interactive = true
    greenButton.on("tap", this.handleFeed.bind(this))
    card.addChild(greenButton)
    let feedText = new PIXI.Text('收养', {
      fontFamily: 'FZCUYSJW--GB1-0',
      fontSize: '36px',
      fill: 'white'
    })
    feedText.x = 395
    feedText.y = 637
    card.addChild(feedText)
    return card_wrap
  }

  setMonster(monster) {
    this.monster = monster
  }

  hide() {
    this.parent.PIXIObject.removeChild(this.PIXIObject)
  }

  show() {
    this.PIXIObject = this.initPIXI()
    this.parent.PIXIObject.addChild(this.PIXIObject)
  }

  refresh() {
    this.hide()
    this.show()
  }

  handleSend() {
    console.log('送人成功')
    this.parent.randomMonster()
    this.hide()
  }

  handleFeed() {
    console.log('收养成功')
    this.parent.randomMonster()
    this.hide()
  }
}