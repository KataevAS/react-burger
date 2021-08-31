export function setCookie(name: string, value: string, props?: any) {
  props = props || {}
  let exp = props.expires
  if (typeof exp == 'number' && exp) {
    const d = new Date()
    d.setTime(d.getTime() + exp * 1000)
    exp = props.expires = d
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString()
  }
  value = encodeURIComponent(value)
  let updatedCookie = name + '=' + value
  for (const propName in props) {
    updatedCookie += '; ' + propName
    const propValue = props[propName]
    if (propValue !== true) {
      updatedCookie += '=' + propValue
    }
  }
  document.cookie = updatedCookie
}

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  )
  return matches ? decodeURIComponent(matches[1]) : undefined
}

export function clearCookie() {
  let cookies = document.cookie.split(';')
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i]
    let eqPos = cookie.indexOf('=')
    let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
  }
}
