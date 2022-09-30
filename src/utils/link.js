import router from '/@/router'

const globleFun = {
  onGoto(path, type = 'push') {
    type === 'push' && router.push(path)
    type === 'replace' && router.replace(path)
    type === 'go' && router.go(path)  // -1 后退+刷新;0 刷新; 1 前进;
    type === 'back' && router.back(path)  // -1 后退+刷新; 0 刷新; 1 前进;
  }
}

export default globleFun