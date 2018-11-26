export function render (node = null) {
  var highlights = node || document.querySelectorAll('.highlight')
  highlights.forEach(highlight => {
    let safeHighlight = highlight.cloneNode(highlight)
    let lang = highlight.getAttribute('lang') || 'html'
    let lines = processLines(safeHighlight.children, lang)

    createContent (highlight, lines)
  })
}

function createContent (highlight, lines) {
    // Remove all code child
    while (highlight.lastChild) {
      highlight.removeChild(highlight.lastChild)
    }
    // Create line and code element
    let divLine = document.createElement('div')
    let divCode = document.createElement('div')
    let btnIcon = document.createElement('i')
    let btnCopy = document.createElement('a')
    let credits = document.createElement('a')


    divLine.classList.add('line')
    divCode.classList.add('code')
    btnCopy.classList.add('btn-copy')
    btnIcon.classList.add('fa')
    btnIcon.classList.add('fa-copy')
    credits.appendChild(document.createTextNode('Powered by - Aonix, MoskaCss'))
    credits.classList.add('credits')
    credits.setAttribute('href', 'https://aonix-group.github.io/moskacss')
    credits.setAttribute('target', '_blank')

    btnCopy.appendChild(btnIcon)
    btnCopy.appendChild(document.createTextNode('Copy'))
    btnCopy.addEventListener('click', copyContent)

    lines.map((line, i) => {
      // Set Number
      let spanNumber = document.createElement('span')
      let spanNumberText = document.createTextNode(i + 1)
      spanNumber.classList.add('number')
      spanNumber.append(spanNumberText)
      divLine.append(spanNumber)
      // Set Line
      divCode.appendChild(line)
    })

    highlight.appendChild(divLine)
    highlight.appendChild(divCode)
    highlight.appendChild(btnCopy)
    highlight.appendChild(credits)
}

function processLines (childrens, lang) {
  let lines = []
  Array.from(childrens).forEach(originalLine => {
    let line = originalLine.cloneNode(originalLine)
    let pad = document.createTextNode('\u00A0')
    let coloredLine = document.createElement('p')
    // let parent = line[0].closest('.highlight')

    if (lang === 'html') {
      lines = languageHTML(lang, originalLine, line, lines, coloredLine)
    }

  })
  return lines
}

function languageHTML (lang, originalLine, line, lines, coloredLine) {
  let hasChildren = originalLine.children
  let hasText = !hasChildren.length && document.createTextNode(line.innerText)
  let pad = document.createTextNode('\u00A0')
  let childrenColoredLine = document.createElement('p')
  coloredLine.append(pad.cloneNode(pad))
  childrenColoredLine.append(pad.cloneNode(pad))

  // Remove all children
  while (line.lastChild) {
    line.removeChild(line.lastChild)
  }
  line = line.outerHTML
  let attributs = line.match(/("[^"]{0,}")/g) // Save attributes
  line = line.replace(/("[^"]{0,}")/g, '""') // Clear attributes

  coloredLine.append(createSpan(line, /^(<)/g, 'tag')) // Open tag
  coloredLine.append(createSpan(line, /^<([a-z]{0,})/g, 'tagName'))
  coloredLine.append(createSpan(line, /(\s[a-z]{0,}[=])/g, 'attr', attributs))
  coloredLine.append(createSpan(line, /(>)./g, 'tag')) // Open middle tag

  if (hasText) {
    let spanText = document.createElement('span')
    spanText.classList.add('text')
    spanText.append(hasText)
    coloredLine.append(spanText) // Inner Text
  }


  if (!hasChildren.length) { // Close elements that's doenst have children
    coloredLine.append(createSpan(line, /(<[\/])/g, 'tag')) // Open end tag close
    coloredLine.append(createSpan(line, /<[\/](.*)>/g, 'tagName')) // Open end tag name
    coloredLine.append(createSpan(line, /(>)$/g, 'tag')) // Open last tag
  }

  lines.push(coloredLine)

  if (hasChildren.length) {

    let childrenLines = processLines(hasChildren, lang)
    childrenLines.map(childrenLine => {
      childrenLine.prepend(pad.cloneNode(pad))
      childrenLine.prepend(pad.cloneNode(pad))
      childrenLine.prepend(pad.cloneNode(pad))
      lines.push(childrenLine)
    })

    childrenColoredLine.append(createSpan(line, /(<[\/])/g, 'tag')) // Open end tag close
    childrenColoredLine.append(createSpan(line, /<[\/](.*)>/g, 'tagName')) // Open end tag name
    childrenColoredLine.append(createSpan(line, /(>)$/g, 'tag')) // Open last tag
    lines.push(childrenColoredLine)
  }

  return lines
}

function createSpan (line, regex, className, attributs = null) {
  let mainSpan = document.createElement('span')
  let pad = document.createTextNode( '\u00A0' )
  let hasMatch = false
  let count = 0

  while (hasMatch = regex.exec(line)) {
    if (hasMatch) {
      let span = document.createElement('span')
      let text = document.createTextNode(hasMatch[1])

      span.classList.add(className)
      span.appendChild(text)
      mainSpan.appendChild(span)

      if (attributs) {
        let spanAttribute = document.createElement('span')
        let textAtrribute = document.createTextNode(attributs[count])
        spanAttribute.classList.add('attrValue')
        spanAttribute.appendChild(textAtrribute)
        mainSpan.appendChild(spanAttribute)
      }
    }
    count++
  }

  return mainSpan
}

//get range
function copyContent (event) {
  event.preventDefault()
  let elm = event.target.closest('.highlight').querySelector('.code')
  let range = document.createRange()
  range.selectNode(elm)
  window.getSelection().removeAllRanges()
  window.getSelection().addRange(range)
  document.execCommand("Copy")
  window.getSelection().removeAllRanges()
}

export default { render }
