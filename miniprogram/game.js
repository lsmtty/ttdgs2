import './src/libs/weapp-adapter'
import * as PIXI from './src/libs/pixi.js'
import * as Tween from './src/libs/Tween.js'
import Director from './src/direrctor'
import MiniPLoader from './src/other/loader'
import monsterScene from './src/scene/monsterScene'
import mapScene from './src/scene/mapScene'

const DirectorLi = Director.getInstance() // 新建一个李导演

DirectorLi.gameRun()

// todo 场景的存储方法
// let scenes = []
// app.stage.removeScene = function (index) {
//   app.stage.removeChild(scenes[index].PIXIObject)
// }

// app.stage.addScene = function (index) {
//   app.stage.addChild(scenes[index].PIXIObject)
// }

// app.stage.getMainScene = function () {
//   if (mainScene) {
//     app.stage.addChild(mainScene.PIXIObject)
//   } else {
//     let mainScene = new mapScene(app.stage)
//     scenes.push(mainScene)
//     app.stage.addChild(mainScene.PIXIObject)
//   }
// }