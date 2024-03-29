loadCodeContainerCssLink()
loadCodeContainerHtml()

function loadCodeContainerCssLink() {
  const linkCssFile = document.createElement('link')
  linkCssFile.setAttribute('href', `//${window.location.host}/assets/codes/codes.css`)
  linkCssFile.setAttribute('rel', 'stylesheet')
  
  document.querySelector('head').appendChild(linkCssFile)
}

function loadCodeContainerHtml() {
  fetch('../assets/codes/codes.html')
    .then(res => res.text())
    .then(html => {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = html
      document.querySelector('body').appendChild(wrapper)
      
      loadCodesContent()
    })
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

const maintainDefaultTabWidth = (line, tabWidth) => {
  return line.replace(new RegExp(`^\\s{${tabWidth}}`, 'g'), "")
}

function loadCodeContent(source, targetElContainer) {
  const codeContent = source.innerHTML
  if (!codeContent) {
    targetElContainer.style.display = 'none'
    return;
  }
  const codeContentLines = codeContent.split('\n')
  const tabWidth = getTabWidth(codeContentLines)
  const codeFormated = codeContentLines.map(line => maintainDefaultTabWidth(line, tabWidth)).join('\n')

  const targetElTextarea = targetElContainer.querySelector('textarea')

  targetElTextarea.value = codeFormated;
  targetElTextarea.style.height = targetElTextarea.scrollHeight + 'px'
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