// PIXI 游戏loader封装类
export default class MiniPLoader{
  constructor() {
    this.sourcesMaps = new Map()
  }

  /**
   * 添加资源
   * @param {array} sources 资源
   */
  add(sources) {
    let _this = this
    let downLoadPromise = []
    sources.forEach(source => {
      downLoadPromise.push(_this._transLatePic(source))
    })
    Promise.all(downLoadPromise).then(function(target) {
      console.log(target)
      _this.finishCallback()
    }).catch(function (err) {
      console.log(err)
    })
  }

  on(loadingFun) {

  }

  load(finishCallback) {
    this.finishCallback = finishCallback
  }

  resources(sourceId) {
    return this.sourcesMaps.get(sourceId)
  }

  _transLatePic(sourceId) {
    let _this = this
    return new Promise((resolve, reject) => {
      wx.cloud.downloadFile({
        fileID: sourceId, // 文件 ID
        success: res => {
          this.sourcesMaps.set(sourceId, res.tempFilePath)
          resolve(res.tempFilePath)
        },
        fail: res => {
          console.log(res)
          this.sourcesMaps.set(sourceId, 'download error pic')
          resolve(`error: error pic is ${sourceId}`)
        }
      })
    })
  }
}