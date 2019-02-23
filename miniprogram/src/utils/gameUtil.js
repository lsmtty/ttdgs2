import position from '../other/position'
import * as PIXI from '../../src/libs/pixi.js'
/**
 * 自动播放音频
 * @param {string} src 音频地址 
 */
let playAudioAuto = function(src,loop = false) {
  const innerAudioContext = wx.createInnerAudioContext()
  innerAudioContext.src = src
  innerAudioContext.autoplay = true
  innerAudioContext.loop = false
  innerAudioContext.volume = 1
  innerAudioContext.onPlay(() => {
    console.log(`开始播放${src}音频`)
  })
  innerAudioContext.onError((res) => {
    console.log(`播放音频${src}出现${res.errMsg}错误`)
  })
}

/**
 * 播放动画效果
 * @param {string} animateSrc 动画资源路径
 * @param {int} num 播放帧数 
 * @param {object} parent PIXI元素父级
 * @param {Position} position 地址元素
 * @param {int} duration 持续时间
 * @param {function} callback 播放完成回调
 */
let playAnimation = function (animateSrc, width, height, num, parent, position,loop = false, callback= () => {}) {
  let movieClip = null
  let texture = PIXI.Texture.fromImage(animateSrc)
	//将图片拆分为8帧
	let itemWidth = parseInt(width / num)
	let itemHeight = parseInt(height)
	let frameArray = [];
	for(let i = 0; i < num; i++) {
		let rectangle = new PIXI.Rectangle(i * itemWidth, 0, itemWidth, itemHeight)
		let frame = new PIXI.Texture(texture, rectangle)
		frameArray.push(frame)
	}
	//播放动画
	movieClip = new PIXI.extras.AnimatedSprite(frameArray)
	movieClip.x = position.x - 100
	movieClip.y = position.y - 220
	movieClip.animationSpeed = parseFloat((40 / 120).toFixed(2))
	movieClip.loop = loop
	movieClip.width = 180
	movieClip.height = 180
	//movieClip.scale = 1
	movieClip.play()
	parent.addChild(movieClip)
	setTimeout(() => {
		movieClip.stop()
		parent.removeChild(movieClip)
		callback()
	},200)
}

/**
 * 接口回调
 * @param {object} data 接口参数 
 * @param {function} data 成功回调
 * @param {function} data 失败回调
 */
let solveData = function (data, successCb, errorCb){
	if (data.errMsg == 'cloud.callFunction:ok') {
		successCb && successCb()
	} else {
		// todo 网络出错
		errorCb && errorCb()
	}
}
export default {playAudioAuto, playAnimation, solveData}