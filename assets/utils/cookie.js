let domainHost = ''
var cookie = {
  // 写cookies
  setCookie: function setCookie (name, value, expiredays, domain) {
    if (!document) return
    var exdate = new Date(expiredays)
    var expires = isNaN(exdate) ? '' : ';expires=' + exdate.toGMTString()
    document.cookie = name + '=' + escape(value) + expires + ';path=/;domain=.' + domain
  },

  // 读取cookies
  getCookie: function getCookie (name, req) {
    if (req) {
      if (!req || !req.headers || !req.headers.cookie) return
      const tokenCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith(name))
      if (!tokenCookie) return
      const token = tokenCookie.split('=')[1]
      return token
    } else {
      var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
      var arr = document.cookie.match(reg)
      if (arr) {
        return unescape(arr[2])
      } else {
        return ''
      }
    }
  },

  // 删除cookies
  delCookie: function delCookie (name, context, domain) {
    var exp = new Date()
    var cval = ' '
    exp.setTime(exp.getTime() - 100)
    if (context && context.res) {
      const expireToken = name + '=' + cval + ';expires=' + exp.toGMTString() + ';path=/;domain=.' + domain
      context.res.setHeader('Set-Cookie', [expireToken])
    } else {
      document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString() + ';path=/;domain=.' + domain
    }
  },

  clearCookie: function clearCookie () {
    console.log(process.server)
    if (process.server) return
    var keys = document.cookie.split(';')
    if (keys) {
      for (let i = keys.length; i--;) {
        var exp = new Date()
        exp.setTime(exp.getTime() - 100)
        document.cookie = keys[i].split('=')[0] + '=" ";expires=' + exp.toGMTString() + ';path=/;domain=.' + domainHost
      }
    }
  }
}

export default cookie
