// 工具类方法都写这里

const util = {
  // 对象的字符串路径
  target (object, name) {
    const nameArray = String(name).split('.')
    do {
      if (nameArray.length === 1) {
        return {
          target: object,
          name: nameArray[0]
        }
      } else {
        const key = nameArray[0]
        if (typeof object[key] === 'undefined') {
          object[key] = {}
        }
        object = object[key]
        nameArray.shift()
      }
    } while (true)
  },
  // 设置cookie
  setCookie (cname, cvalue, exdays) {
    var d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    var expires = 'expires=' + d.toUTCString()
    document.cookie = cname + '=' + cvalue + '; ' + expires
  },
  // 获取cookie
  getCookie (cookieName) {
    let strCookie = document.cookie
    let arrCookie = strCookie.split('; ')
    for (let i = 0; i < arrCookie.length; i++) {
      let arr = arrCookie[i].split('=')
      if (cookieName === arr[0]) {
        return arr[1]
      }
    }
    return ''
  },
  // 清除cookie
  clearCookie (name) {
    util.setCookie(name, '', -1)
  },
  getQueryString (name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    let r = window.location.search.substr(1).match(reg)
    if (r != null) return unescape(r[2])
    return null
  },
  isLogin () {
    if (util.getCookie('uid')) {
      return true
    } else {
      return false
    }
  },
  toPage (_this, page, data) {
    _this.$router.push({
      name: page,
      query: data
    })
  },
  routeLeave (to, from) {

  },
  isIndex (_this) {
    console.log(_this.$route.path)
    if (_this.$route.path === '/' || _this.$route.path === '/showIndex' || _this.$route.path === '/showMember') {
      return true
    } else {
      return false
    }
  },
  formatDate (nows) {
    var now = new Date(nows)
    var year = now.getFullYear()
    var month = now.getMonth() + 1
    var date = now.getDate()
    var hour = now.getHours()
    var minute = now.getMinutes()
    var second = now.getSeconds()
    if (hour <= 9) {
      hour = '0' + hour
    }
    if (minute <= 9) {
      minute = '0' + minute
    }
    if (second <= 9) {
      second = '0' + second
    }
    return year + '-' + month + '-' + date + '  ' + hour + ':' + minute + ':' + second
  }

}

export default util
