// 接口请求

import qs from 'qs'
import axios from 'axios'
import merge from 'lodash.merge'
const utils = require('./utils')

const api = {}

// 全API默认数据
api.defaultData = {}

// 全API默认设置
api.defaultOptions = {
  type: 'GET',
  formData: true,
  baseUrl: 'http://47.104.19.236:9001/',
  useCode: true,
  needLogin: false, // 接口请求前需要登录
  loginNeeded: false // 接口请求后需要登录
}

// 注册API
api.regist = function (name, path = '', registData = {}, registOptions = {}) {
  // post:name | get:name
  const nameArray = name.split(':')
  if (nameArray.length > 1) {
    registOptions.type = nameArray[0]
    name = nameArray.slice(1).join(':')
  }

  // name.a.b.c...
  const result = utils.default.target(api, name)
  result.target[result.name] = function (apiData, apiOptions, success, fail) {
    // api[name](success)
    if (typeof apiData === 'function') {
      fail = apiOptions
      success = apiData
      apiOptions = {}
      apiData = {}
    }
    // api[name](data, success)
    if (typeof apiOptions === 'function') {
      fail = success
      success = apiOptions
      apiOptions = {}
    }

    const data = merge({}, api.defaultData, registData, apiData)
    const options = merge({}, api.defaultOptions, registOptions, apiOptions)
    const url = options.baseUrl + path
    const method = options.type.toLowerCase()

    return axios({
      url,
      method,
      withCredentials: true,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      params: method === 'get' ? data : {},
      data: method === 'post' ? options.formData ? qs.stringify(data) : data : {}
    })
      .catch(fail)
      .then(result => {
        if (options.useCode ? result.data.code === 1 : true) {
          success && success(options.useCode ? result.data.data : result.data)
          return result.data.data
        } else {
          if (options.loginNeeded && result.data.code === -2) {
            // os.login()
          } else {
            fail && fail(result.data)
          }
          return result.data
        }
      })
  }
}

api.use = function (pkg) {
  pkg.install(api.regist, api)
}

api.use(require('./api.index').default)

export default api
