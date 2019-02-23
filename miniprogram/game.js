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


const { pixelRatio, windowWidth, windowHeight } = wx.getSystemInfoSync()
const w = windowWidth * pixelRatio 
const h = windowHeight * pixelRatio
const app = new PIXI.Application({
  width: 750,
  height: 1334,
  forceCanvas: true,
  view: canvas
})

// 云平台函数注册
wx.cloud.init()
wx.cloud.callFunction({
  name: 'login',
  success: (res) => {
    console.log(res)
  }
})

// 定义主舞台场景切换函数，以及初始化定位和计时器
let scenes = []
app.stage.removeScene = function (index) {
  app.stage.removeChild(scenes[index].PIXIObject)
}

app.stage.addScene = function (index) {
  app.stage.addChild(scenes[index].PIXIObject)
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


// let newLoader  = new MiniPLoader()
// newLoader.load(loadingFinish)
// newLoader.add(['cloud://ttdgs-test-c6724c.7474-ttdgs-test-c6724c/images/common/world_map.png',
// 'cloud://ttdgs-test-c6724c.7474-ttdgs-test-c6724c/images/map/微信图片_20181223213905.jpg'])

// function loadingFinish () {
//   var world_map = PIXI.Sprite.fromImage(
//     newLoader.resources('cloud://ttdgs-test-c6724c.7474-ttdgs-test-c6724c/images/common/world_map.png')
//   )
//   world_map.width = 60
//   world_map.height = 60
//   world_map.x = 601, world_map.y = 58
//   world_map.interactive = true
//   world_map.on('tap', () => {
//     app.stage.removeScene(0)
//     let scece2 = new PIXI.Container()
//     sceces.push(scece2)
//     var bkg_map = PIXI.Sprite.fromImage(
//       newLoader.resources('cloud://ttdgs-test-c6724c.7474-ttdgs-test-c6724c/images/map/微信图片_20181223213905.jpg')
//     )
//     bkg_map.width = 750
//     bkg_map.height = 1334
//     scece2.addChild(bkg_map)
//     app.stage.addScene(1)
//   })
//   scece1.addChild(world_map)
// }    

if (!wx.getStorageSync('monster')) {
  wx.setStorageSync('monster', monsterConfig)
}



