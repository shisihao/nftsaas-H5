/**
 * vite 引入本地图片
 * @param {*} url 
 * @returns 
 */
export const getImageUrl = (url) => {
  return new URL(`../assets/images/${url}`, import.meta.url).href
}

/**
 * 中间字符串省略
 * @param {*} value 
 * @param {*} num 
 * @returns 
 */
export const centrEllipsis = (value, num = 6, icon = '...') => {
  const strValue = String(value)
  if (strValue.length < num) return String(value)
  return `${strValue.substring(0, num)}${icon}${strValue.substring(strValue.length - num)}`
}

/**
 * 解决safari 时间问题
 * @param {*} input
 * @returns
 */
 export function parseDate(input) {
  var parts = input.match(/(\d+)/g)
  parts[1] = parts[1] - 1
  return new Date(parts[0], parts[1], parts[2], parts[3] || 0, parts[4] || 0, parts[5] || 0)
}

/**
 * 睡眠
 * @param {*} time
 * @returns
 */
export function sleep(time) {
  return new Promise(resolve => setTimeout(resolve,time)
)}

/**
 * hex 转 rgb
 * @param {*} hex 
 * @returns 
 */
export function hexToRgb(hex) {
  return hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,(m, r, g, b) => '#' + r + r + g + g + b + b).substring(1).match(/.{2}/g).map(x => parseInt(x, 16))
}

/**
 * rgb 转 hex
 * @param {*} r 
 * @param {*} g 
 * @param {*} b 
 * @returns 
 */
export function rgbToHex(r, g, b){
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')
} 