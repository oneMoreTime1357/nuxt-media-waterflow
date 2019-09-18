import axios from 'axios'
import _interopDefault from './_interopDefault'
// import Cookie from './cookie'
// import hostDomain from './host'

const Request = {
  all (params) {
    const methods = []
    params.requests && params.requests.forEach((request) => {
      const req = request.method === 'post' ? this.asyncPost(request) : this.asyncGet(request)
      methods.push(req)
    })

    const promisArry = this._transferPromise(methods)

    const response = axios.all(promisArry)

    return response.then(axios.spread(params.done)).catch((err = 'can not catch error!') => {
      // this._failCallback(err, params)
      // console.log(err)
    })
  },

  _transferPromise (promises) {
    return promises.map(promise => {
      return promise.catch((err) => {
        return err
      })
    })
  },

  get (params) {
    const response = this._get(params)

    return response.then((res) => {
      const { data } = res

      return params.done && params.done(data)
    }).catch((err = 'can not catch error!') => {
      this._failCallback(err, params)
    })
  },

  post (params) {
    const response = this._post(params)

    return response.then((res) => {
      const { data } = res

      return params.done && params.done(data)
    }).catch((err = 'can not catch error!') => {
      this._failCallback(err, params)
    })
  },

  asyncGet (params) {
    const response = this._get(params)

    response.then((res) => {
      const { data } = res
      params.done && params.done(data)
    }).catch((err = 'can not catch error!') => {
      this._failCallback(err, params)
    })

    return response
  },

  asyncPost (params) {
    const response = this._post(params)

    response.then((res) => {
      const { data } = res
      return params.done && params.done(data)
    }).catch((err = 'can not catch error!') => {
      this._failCallback(err, params)
    })

    return response
  },

  _get (params) {
    return this._checkParams(params)._request({
      url: params.url,
      method: 'get',
      params: params.data,
      header: params.header,
      baseURL: '',
      context: params.context
    })
  },

  _post (params) {
    return this._checkParams(params)._request({
      url: params.url,
      method: 'post',
      data: params.data,
      header: params.header,
      baseURL: ''
    })
  },

  _request ({ url, method, params = {}, data = {}, baseURL, header = {}, context = {} }) {
    const headers = this._getHeaders(header, context)
    // console.log('requssttt:', baseURL)
    return axios.request({
      url,
      method,
      baseURL,
      headers,
      params,
      data,
      validateStatus: (status) => {
        return status >= 200 && status <= 500 && status !== 404 && status !== 401
      }
    })
  },

  _checkParams (params) {
    if (!params || !params.url) {
      throw new Error('request\'url is missed!')
    }

    return this
  },

  _getHeaders (header, context) {
    let headers = {}
    let Cookie = null
    let userToken = ''

    if (context.req) {
      Cookie = context.req.headers && str2json(context.req.headers.cookie)
      userToken = Cookie['token'] || ''
    } else {
      Cookie = require('./cookie').default // _interopDefault(require('./cookie'))
      userToken = Cookie.getCookie('token')
    }

    if (userToken) {
      headers['x-access-token'] = userToken
    }

    if (header) {
      for (let key in header) {
        headers[key] = header[key]
      }
    }
    return headers
  },

  _failCallback (err, {fail, context = null, url}) {
    let res = err.response
    let error = res ? { statusCode: res.status, message: [401, 500].indexOf(res.status) ? res.data.err : res.statusText } : err
    res && console.log(context, '错误', error, url, new Date())
    if (res && res.status === 401) {
      this._loginExpired(context)
      return
    }
  },

  _loginExpired (context) {
    const Cookie = require('./cookie').default
    console.log(Cookie)
    if (context && Cookie.getCookie('utoken', context.req)) {
      Cookie.delCookie('utoken', context)
    } else {
      Cookie.delCookie('utoken')
    }

    if (!process.server) {
      window.location.href = '/'
    }
  },

  _generateUrl (url) {
    return url
  },

  getSsrContextCookie (context) {
    if (context.req) {
      return context.req.headers && str2json(context.req.headers.cookie)
    }

    return {}
  }
}

export default Request


function str2json (str) {
  var arr = str && str.split('; ') || []
  var json = {}
  for (var i = 0; i < arr.length; i++) {
    var arr2 = arr[i].split('=')
    json[arr2[0]] = arr2[1]
  }
  return json
}
