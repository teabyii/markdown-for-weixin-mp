// highlight
var md = markdownit({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value.replace(/\n/g, '<br>')
      } catch (__) {}
    }

    try {
      return hljs.highlightAuto(str).value
    } catch (__) {}

    return ''
  }
})

// Set inline styles
function makeStyles(wrapperElem) {
  var stylesheet, rule, selectorMatches, i, j, styleAttr, elem

  stylesheet = wrapperElem.ownerDocument.styleSheets[0]

  for (i = 0; i < stylesheet.cssRules.length; i++) {
    rule = stylesheet.cssRules[i]

    selectorMatches = wrapperElem.querySelectorAll(rule.selectorText)

    for (j = 0; j < selectorMatches.length; j++) {
      elem = selectorMatches[j]

      styleAttr = selectorMatches[j].getAttribute('style') || '';

      if (styleAttr && styleAttr.search(/;[\s]*$/) < 0) {
        styleAttr += '; ';
      }

      styleAttr += rule.style.cssText;

      // Set the styles back.
      selectorMatches[j].setAttribute('style', styleAttr);
    }
  }
}

var render = function render(text) {
  var elem = document.getElementById('container')
  elem.innerHTML = '<div class="markdown-body">' + md.render(text) + '</div>'
  makeStyles(elem)
  return elem.innerHTML
}
