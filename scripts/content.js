function isIframe(elem) {
  return elem.contentDocument ? true : false
}

function send(message) {
  return new Promise(function (resolve) {
    chrome.runtime.sendMessage(message, function (res) {
      resolve(res)
    })
  })
}

chrome.runtime.onMessage.addListener(function (req, sender, res) {
  var elem = document.activeElement
  // request text to parse
  if (req.requestText === true) {
    // adapt to input and iframe.
    // Replace `&nbsp;` with normal space, '%A0' -> '%20'
    var text = (isIframe(elem) ? elem.contentDocument.body.innerText : elem.value).replace(/\u00A0/g, '\u0020')
    send({ text: text })
  } else if (req.success) {
    if (isIframe(elem)) {
      elem.contentDocument.body.innerHTML = req.markdown
    } else {
      elem.value = req.markdown
    }
  } else if (req.error) {
    console.log(req.error)
  }
})
