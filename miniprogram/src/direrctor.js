// 游戏总导演类
import * as PIXI from './libs/pixi.js'
import * as Tween from './libs/Tween.js'
import gameUtil from './utils/gameUtil'
import MiniPLoader from './other/loader'
import monsterScene from './scene/monsterScene'
import mapScene from './scene/mapScene'

export default class Director {
  constructor() {
    this.scenesLoaders = [] // 初始化场景loader列表，全局控制
    this.scenes = []
  }

  /**
   * 游戏初始化
   */
  gameRun() {
    const { pixelRatio, windowWidth, windowHeight } = wx.getSystemInfoSync()
    const w = windowWidth * pixelRatio 
    const h = windowHeight * pixelRatio
    this.app = new PIXI.Application({
      width: 750,
      height: 1334,
      forceCanvas: true,
      view: canvas
    })
  
    this.app.renderer.plugins.interaction.mapPositionToPoint = (point, x, y) => {
      point.x = x * 750 / windowWidth
      point.y = y * 1334 / windowHeight
    }
    const ticker = new PIXI.ticker.Ticker()
    ticker.add((deltaTime) => {
      Tween.update();
    })
    
    ticker.start()

    // 云平台函数注册
    wx.cloud.init()
    wx.cloud.callFunction({
      name: 'login',
      success: (res) => {
        console.log(res)
      }
    })
    this.dataInit()
  }
  
  /**
   * 数据初始化
   */
  dataInit() {
    wx.cloud.callFunction({
      name: 'getGameData',
      complete: res => {
        gameUtil.solveData(res, () => {
          wx.setStorageSync('gameData', res.result.data)
          this.enterFirstScene(res.result.data)
        })
      }
    }) 
  }

  getPIXIRoot() {
    return this.app.stage
  }

  static getInstance() {
    if (this.instance) {
      return this.instance
    } else {
      this.instance = new Director()
      return this.instance
    }
  }

  /**
   * 游戏第一个场景展示
   */
  enterFirstScene(gameData) {
    // 添加第一个场景
    // 根据分享进入
    let gameScenesData = gameData.scenes
    let scene1 = new monsterScene(this.app.stage, gameScenesData[0].id)
    this.showSceneById(gameScenesData[0].id, scene1)
  }

  /**
   * 根据Id添加场景,进入场景队列
   */
  addSceneById(id, scene) {
    this.scenes.push({id, scene})
  }

  /**
   * 根据Id销毁场景，销毁实例
   */
  destorySceneById(id) {
    if (this.scenes.length) {
      for(let i = 0;i < this.scenes.length;i++) {
        if (this.scenes[i].id == id) {
          this.hideSceneByScene(id)
          this.scenes.splice(i, 1)
        }
      }
    }
  }

  /**
  * 根据Id展示场景
  */
  showSceneById(id, scene = null) {
    let initFlag = true
    if (this.scenes.length) {
      for(let i = 0;i < this.scenes.length;i++) {
        if (this.scenes[i].id == id) {
          this.app.stage.addChild(this.scenes[i].PIXIObject)
          initFlag = false
        }
      }
    }
    if (initFlag && scene) {
      this.addSceneById(id, scene)
      this.app.stage.addChild(scene.PIXIObject)
    }
  }

  /**
   * 根据Id隐藏场景，并不销毁场景实例
   */
  hideSceneById(id) {

  }

  /**
   * 根据scene隐藏场景，并不销毁场景实例
   */
  hideSceneByScene(scene) {
    this.app.stage.removeChild(scene.PIXIObject)
  }


  /**
   * 根据场景Id获取场景资源loader
   * @param {string} sceneId 场景id
   */
  getLoadersByScenesId(sceneId) {

  }

  /**
   * 初始化场景loader
   * @param {string} sceneId 场景id
   * @param {array} resources 资源field数组
   */
  initLoader(sceneId, resources = null) {
    
  }
}