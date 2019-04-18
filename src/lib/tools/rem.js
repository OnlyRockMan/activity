(function (doc, win) {
  let ratio = window.devicePixelRatio || 1

  let scale = Math.round(1 / ratio * 100) / 100
  let metaEl = document.createElement('meta')

  metaEl.setAttribute('name', 'viewport')
  metaEl.setAttribute('content', 'width=device-width, initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no')
  // document.getElementsByTagName('head')[0].appendChild(metaEl)

  let docEl = doc.documentElement
  let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  let recalc = function () {
    let clientWidth = docEl.clientWidth
    if (!clientWidth) return

    docEl.style.fontSize = 100 * (clientWidth / 750) + 'px'
    doc.body.addEventListener('touchstart', function () {
      // simulate event
    })
  }

  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(window.document, window)
