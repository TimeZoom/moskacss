export function render (node = null) {
  var highlights = document.querySelectorAll('.highlight')
  highlights.forEach(highlight => {
    let safeHighlight = highlight.cloneNode(highlight)
    let lang = highlight.getAttribute('lang') || 'html'
    let children = safeHighlight.children.length ? safeHighlight.children : safeHighlight.innerHTML.toString().split('\n')

    let lines = processLines(children, lang)

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
  let childrensList = typeof childrens === 'array' ? childrens : Array.from(childrens)

  childrensList.forEach(originalLine => {
    let line = typeof originalLine === 'string' ? originalLine : originalLine.cloneNode(originalLine)
    let pad = document.createTextNode('\u00A0')
    let coloredLine = document.createElement('p')

    if (lang === 'html') {
      lines = languageHTML(lang, originalLine, line, lines, coloredLine)
    }
    if (lang === 'javascript') {
      lines = languageJS(lang, line, lines, coloredLine)
    }

  })

  return lines
}

function getRegexes ()
{
  return [
    {
      name: 'variable',
      className: 'var',
      regex: /(?=(?:[^'"]*['"][^'"]*['"])*[^'"]*$)((?!let|const|var|import|from|require)\b([a-zA-z]{1,}[a-zA-|0-9]+))(?!\()\b/g
    },
    { name: 'varType', regex: /(import|from|let|const|var)/g, className: 'varType'},
    { name: 'colon', regex: /([:])/g, className: 'colon'},
    { name: 'number', regex: /(\d{1,})/g, className: 'number'},
    { name: 'equal', regex: /(=|\+)/g, className: 'selector'},
    { name: 'string', regex: /(['"`].*['"`])/g, className: 'string'},
    { name: 'dot', regex: /(?=(?:[^'"]*['"][^'"]*['"])*[^'"]*$)(\.)/g, className: 'selectorDot'},
    { name: 'function', regex: /[\.]([a-zA-Z]{1,}[a-zA-Z0-9\-\_]{1,})[\(]/g, className: 'function'},
    { name: 'parentheses', regex: /([\(]|[\)])/g, className: 'parentheses'},
    { name: 'openCloses', regex: /([\{\}\[\]])/g, className: 'open-closes'},
    { name: 'comma', regex: /(\,)/g, className: 'comma'},
  ]
}
function languageJS (lang, line, lines, coloredLine) {
  let pad = document.createTextNode('\u00A0')
  let regexes = getRegexes()
  let linePad = /^[\s]{8}/g.exec(line)
  if (linePad) {
    [...Array(4)].map(obj => { coloredLine.appendChild(pad.cloneNode(pad)) })
  }

  line = line.trim()
  let lineParts = []
  if (line) {
    let matchIndexes = []
    regexes.map(obj => {

      let match;
      while ((match = obj.regex.exec(line)) !== null) { // loop where exists regex match groups
        if (match.index === obj.regex.lastIndex) { // prevent infinity loop
          obj.regex.lastIndex++;
        }

        matchItem = match[1] // get group Result
        let index = line.indexOf(matchItem) // store index of mach in line
        let span = document.createElement('span')
        let text = document.createTextNode(matchItem)
        span.appendChild(text)
        span.classList.add(obj.className)

        let hasMatchIndex = matchIndexes.filter(obj => obj.matchItem == matchItem) // Check if has objects equals in this line
        if (hasMatchIndex.length && hasMatchIndex[0].index == index) { // If yes check if the index positions are same
          let newIndex = index + matchItem.split('').length // Increase index with new match lenght
          let cutedLine = line.substr(newIndex) // Cut index ahead las index
          index = cutedLine.indexOf(matchItem) + newIndex // Set new index
        }
        matchIndexes.push({index, matchItem}) // Store last index and char

        lineParts.push({index: index, span}) // Store this match at array
      }
    })

    let linePartsSorted = lineParts.sort((a, b) => a.index > b.index ? 1 : (b.index > a.index ? -1 : 0)) // Sorte indexes
    linePartsSorted.map(obj => {
      coloredLine.appendChild(obj.span) // Append in order
    })
  }
   // Add to lines array
  coloredLine.children.length ? lines.push(coloredLine) : null

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

// HTML
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

// Copy Content
function copyContent (event) {
  console.log('clicked')
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
