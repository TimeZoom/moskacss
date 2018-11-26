export function init (node = null) {
  console.log('here')
  var highlights = document.querySelectorAll('.highlight')
  highlights.forEach(highlight => {
    let safeHighlight = highlight.cloneNode(highlight)
    let lines = processLines(safeHighlight.children)

    // Remove all code child
    while (highlight.lastChild) {
      highlight.removeChild(highlight.lastChild)
    }
    // Create line and code element
    let divLine = document.createElement('div')
    let divCode = document.createElement('div')

    divLine.classList.add('line')
    divCode.classList.add('code')
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
  })

  function processLines (childrens) {
    let lines = []

    Array.from(childrens).forEach(originalLine => {
      let line = originalLine.cloneNode(originalLine)
      let hasChildren = originalLine.children
      let hasText = !hasChildren.length && document.createTextNode(line.innerText)

      let pad = document.createTextNode('\u00A0')

      // Remove all children
      while (line.lastChild) {
        line.removeChild(line.lastChild)
      }
      line = line.outerHTML
      let attributs = line.match(/("[^"]{0,}")/g) // Save attributes
      line = line.replace(/("[^"]{0,}")/g, '""') // Clear attributes

      let coloredLine = document.createElement('p')
      let childrenColoredLine = document.createElement('p')
      coloredLine.append(pad.cloneNode(pad))
      childrenColoredLine.append(pad.cloneNode(pad))

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
        let childrenLines = processLines(hasChildren)
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
    })
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
}

export default { init }
