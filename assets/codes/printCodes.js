function loadCodeContainerHtml() {
  fetch('../assets/codes/codes.html')
    .then(res => res.text())
    .then(html => {
      document.querySelector('body').innerHTML += html;
      
      loadCodesContent()
    })
}

function loadCodeContainerCssLink() {
  const linkCssFile = document.createElement('link')
  linkCssFile.setAttribute('href', `//${window.location.host}/assets/codes/codes.css`)
  linkCssFile.setAttribute('rel', 'stylesheet')
  
  document.querySelector('head').appendChild(linkCssFile)
}

function loadCodesContent() {
  const htmlCodeContainer = document.querySelector('.html-code')
  const cssCodeContainer = document.querySelector('.css-code')
  const jsCodeContainer = document.querySelector('.js-code')

  const htmlCodeEl = document.querySelector('body').children[0]
  const cssCodeEl = document.querySelector('style')
  const jsCodeEl = document.querySelector('script')

  loadCodeContent(htmlCodeEl, htmlCodeContainer)
  loadCodeContent(cssCodeEl, cssCodeContainer)
  loadCodeContent(jsCodeEl, jsCodeContainer)
}

// nbsp - Non breaking space
const addNbspInLine = (line, tabWidth) => {
  const nbsp = '&nbsp;'
  return line.replace(new RegExp(`^\\s{${tabWidth}}`, 'g'), "").replace(/ /g, nbsp)
}

function getTabWidth(lines) {
  return lines.reduce((acc, current) => {
    let currentTabWidth;
    const lineInChars = current.split('');

    for (let i = 0; i < lineInChars.length; i++) {
      if (lineInChars[i] !== ' ') {
        currentTabWidth = i;
        break
      }
    }

    return currentTabWidth <= (acc || currentTabWidth) ? currentTabWidth : acc
  }, undefined)
}

function loadCodeContent(source, target) {
  const codeContent = source.innerHTML
  if (!codeContent) {
    target.style.display = 'none'
    return;
  }
  const codeContentLines = codeContent.split('\n')
  const tabWidth = getTabWidth(codeContentLines)
  const codeFormated = codeContentLines.map(line => addNbspInLine(line, tabWidth))
  codeFormated.forEach(line => {
    target.innerHTML += line + '<br/>'
  })
}

loadCodeContainerCssLink()
loadCodeContainerHtml()