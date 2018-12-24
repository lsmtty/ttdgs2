import './src/libs/weapp-adapter'
import * as PIXI from './src/libs/pixi.js'
import * as Tween from './src/libs/Tween.js'
import MiniPLoader from './src/other/loader'
import card from './src/sprites/card'
import gameUtil from './src/utils/gameUtil'
import mathUtil from './src/utils/mathUtil'
import Monster from './src/sprites/monster'
import Bow from './src/sprites/bow'
import monsterConfig from './src/config/monster_config'
import Position from './src/other/position'
import Weapon from './src/sprites/weapon'


const { pixelRatio, windowWidth, windowHeight } = wx.getSystemInfoSync()
const w = windowWidth * pixelRatio 
const h = windowHeight * pixelRatio
const app = new PIXI.Application({
  width: 750,
  height: 1334,
  forceCanvas: true,
  view: canvas
})
app.stage.removeScene = function (index) {
  app.stage.removeChild(sceces[index])
}

app.stage.addScene = function (index) {
  app.stage.addChild(sceces[index])
}
wx.cloud.init()
wx.cloud.callFunction({
  name: 'login',
  success: (res) => {
    console.log(res)
  }
})
const ticker = new PIXI.ticker.Ticker();
ticker.add((deltaTime) => {
  Tween.update();
});
ticker.start();
let monster = ''
let weapon = ''
app.renderer.plugins.interaction.mapPositionToPoint = (point, x, y) => {
  point.x = x * 750 / windowWidth
  point.y = y * 1334 / windowHeight
}

let sceces = []
let scece1 = new PIXI.Container()
sceces.push(scece1)

// 添加第一个场景
app.stage.addScene(0)


const bkg = PIXI.Sprite.fromImage('assets/images/bg.png')
bkg.width = 750
bkg.height = 1334
scece1.addChild(bkg)


// PIXI.loader
//     .add('https://7474-ttdgs-test-c6724c-1257970977.tcb.qcloud.la/images/common/world_map.png?sign=4a8e2f6a53ff55e5900dbbf529611162&t=1545484516')
//     .add('https://7474-ttdgs-test-c6724c-1257970977.tcb.qcloud.la/images/common/微信图片_20181223213905.jpg?sign=67a3c525e4770a284742691a0556d8fe&t=1545572428')
//     .on('progress', () => {})
//     .load(loadingFinish)
let newLoader  = new MiniPLoader()
newLoader.load(loadingFinish)
newLoader.add(['cloud://ttdgs-test-c6724c.7474-ttdgs-test-c6724c/images/common/world_map.png',
'cloud://ttdgs-test-c6724c.7474-ttdgs-test-c6724c/images/map/微信图片_20181223213905.jpg'])

function loadingFinish () {
  var world_map = PIXI.Sprite.fromImage(
    newLoader.resources('cloud://ttdgs-test-c6724c.7474-ttdgs-test-c6724c/images/common/world_map.png')
  )
  world_map.width = 60
  world_map.height = 60
  world_map.x = 601, world_map.y = 58
  world_map.interactive = true
  world_map.on('tap', () => {
    app.stage.removeScene(0)
    let scece2 = new PIXI.Container()
    sceces.push(scece2)
    var bkg_map = PIXI.Sprite.fromImage(
      newLoader.resources('cloud://ttdgs-test-c6724c.7474-ttdgs-test-c6724c/images/map/微信图片_20181223213905.jpg')
    )
    bkg_map.width = 750
    bkg_map.height = 1334
    scece2.addChild(bkg_map)
    app.stage.addScene(1)
  })
  scece1.addChild(world_map)
}    

gameUtil.playAudioAuto('/assets/audio/bg_audio.mp3', true)

let createMonster = function(scene, oldMonster) {
  if (oldMonster) {
    scece1.removeChild(oldMonster.PIXIObject)
    oldMonster.destory()
    oldMonster = null
  }
  let randomNum = mathUtil.getRandomNum(1, 8)
  let monster = new Monster(100, '皮卡王', 1, randomNum, null, scece1 , weapon)
  scece1.addChild(monster.PIXIObject)
  weapon.setAssociateMonster(monster)
  return monster
}

let weapon_wrap = new PIXI.Container()
weapon_wrap.width = 200
weapon_wrap.height = 200
weapon_wrap.x = 275, weapon_wrap.y = 1334 - 480
scece1.addChild(weapon_wrap)
let weapon_bg = PIXI.Sprite.fromImage('assets/images/weapon_bg.png')
weapon_wrap.addChild(weapon_bg)
weapon = new Bow(new Position(16 + 88, 16 + 80), scece1)
weapon_wrap.addChild(weapon.PIXIObject)

monster = createMonster(1)
scece1.monsterCard =  new card(new Position(80, 285), scece1, null)

let radish_wrap = new PIXI.Container()
let radish_timer = null
radish_wrap.width = 111
radish_wrap.height = 111
radish_wrap.x = 76, radish_wrap.y = 1334 - 434
scece1.addChild(radish_wrap)
let radish_bg = PIXI.Sprite.fromImage('assets/images/radish_bg.png')
radish_wrap.addChild(radish_bg)
let radish = PIXI.Sprite.fromImage('assets/images/radish.png')
radish.x = 75, radish.y = 54
radish.transform.pivot.y = 50
radish.transform.pivot.x = 50
radish_wrap.addChild(radish)

radish.interactive = true;
radish.on("tap", () => {randomMonster()})

let randomMonster = () => {
  if(radish_timer){
    Tween.remove(radish_timer)
    radish.transform.scale.y = 1
  }
  radish_timer = new Tween.Tween(radish.transform.scale).to({y: 0.8},250)
    .easing(Tween.Easing.Linear.None).start().yoyo(true).repeat(1)
  monster = createMonster(1, monster)
}

// 创建狩猎图
let monster_dic = new PIXI.Sprite.fromImage('assets/images/monster_dic.png')
monster_dic.x = 320
monster_dic.y = 1145
scece1.addChild(monster_dic)
let dictText = new PIXI.Text('狩猎图鉴', {
  fontFamily: 'FZCUYSJW--GB1-0',
  fontSize: '28px',
  fill: 'white'
})
dictText.x = 320;
dictText.y = 1272;
scece1.addChild(dictText)

if (!wx.getStorageSync('monster')) {
  wx.setStorageSync('monster', monsterConfig)
}



