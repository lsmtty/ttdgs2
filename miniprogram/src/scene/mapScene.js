import * as PIXI from '../../src/libs/pixi.js'
import gameUtil from '../../src/utils/gameUtil'
import MiniPLoader from '../../src/other/loader'
export default class mapScene{
  constructor(parent) {
    this.parent = parent
    this.PIXIObject = new PIXI.Container()
    this.initObject()
    this.initMonsterData()
    gameUtil.playAudioAuto('assets/audio/bg_audio.mp3', true)
    return this
  }

  initObject() {
    // 添加背景
    const bkg = PIXI.Sprite.fromImage('assets/images/common/world_map.jpg')
    bkg.width = 750
    bkg.height = 1334
    this.PIXIObject.addChild(bkg)

    // 添加返回按钮

    const icon_back = PIXI.Sprite.fromImage('assets/images/common/icon_back.png')
    icon_back.x = 0
    icon_back.y = 0
    icon_back.width = 141,icon_back.height = 71
    this.PIXIObject.addChild(icon_back)
    icon_back.interactive = true
    icon_back.on("tap", () => {
      this.parent.removeChild(this.PIXIObject)
    })
  }

  initMonsterData() {
    wx.cloud.callFunction({
      name: 'getUserData',
      complete: res => {
        console.log('callFunction test result: ')
        console.log(res)
      },
    })
  }
}