import './src/libs/weapp-adapter'
import * as PIXI from './src/libs/pixi.js'
import * as Tween from './src/libs/Tween.js'
import MiniPLoader from './src/other/loader'
import card from './src/sprites/card'
import gameUtil from './src/utils/gameUtil'
import mathUtil from './src/utils/mathUtil'
import Monster from './src/sprites/monster'
import Bow from './src/sprites/bow'
import Position from './src/other/position'
import monsterConfig from './src/config/monster_config'
import Weapon from './src/sprites/weapon'
import monsterScene1 from './src/scene/monsterScene1'
import mapScene from './src/scene/mapScene'


const { pixelRatio, windowWidth, windowHeight } = wx.getSystemInfoSync()
const w = windowWidth * pixelRatio 
const h = windowHeight * pixelRatio
const app = new PIXI.Application({
  width: 750,
  height: 1334,
  forceCanvas: true,
  view: canvas
})
const mainScene = null

// 云平台函数注册
wx.cloud.init()
wx.cloud.callFunction({
  name: 'login',
  success: (res) => {
    console.log(res)
  }
})

// todo 场景的存储方法
let scenes = []
app.stage.removeScene = function (index) {
  app.stage.removeChild(scenes[index].PIXIObject)
}

app.stage.addScene = function (index) {
  app.stage.addChild(scenes[index].PIXIObject)
}

app.stage.getMainScene = function () {
  if (mainScene) {
    app.stage.addChild(mainScene.PIXIObject)
  } else {
    let mainScene = new mapScene(app.stage)
    scenes.push(mainScene)
    app.stage.addChild(mainScene.PIXIObject)
  }
}

app.renderer.plugins.interaction.mapPositionToPoint = (point, x, y) => {
  point.x = x * 750 / windowWidth
  point.y = y * 1334 / windowHeight
}
const ticker = new PIXI.ticker.Ticker();
ticker.add((deltaTime) => {
  Tween.update();
})

ticker.start();

// 添加第一个场景
let scene1 = new monsterScene1(app.stage)
scenes.push(scene1)
app.stage.addScene(0)

if (!wx.getStorageSync('monster')) {
  wx.setStorageSync('monster', monsterConfig)
}



