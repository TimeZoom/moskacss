export function init (node = null) {
  let codeContentParent

  if (node) {
    node = new DOMParser().parseFromString(node, "text/html").children[0].children[1].children[0]
    if (node) {
      codeContentParent = node.querySelector('.highlight')
    }
  } else {
    codeContentParent = document.querySelector('.highlight')
  }

  if (codeContentParent) {
    var lines = codeContentParent.innerHTML.split('\n')

    codeContentParent.innerHTML = `<div class="line"></div><div class="code"></div>`
    var codeContent = codeContentParent.querySelector('.code')
    var lineContent = codeContentParent.querySelector('.line')

    var lineNumber = 1
    lines.map(line => {
      if (line) {
        /*
        :: -> <
        %  -> =
        |  -> "
        @  -> >
        */
        var tag = line.trim()
        .replace(/</g,"&lt;") // Remove <
        .replace(/>/g,"&gt;") // Remove >
        .replace(/^(\&lt\;)([a-z]{0,})/g, '::span class%|tag first|@$1::/span@::span class%|tagName|@$2::/span@') // < and attribute
        .replace(/\&gt\;(.{0,})\&lt\;\//g, '&gt;::span class%|tag|@$1::/span@&lt;/') // Tag Body Content
        .replace(/&lt;\/([a-z]{0,2})&gt;/g, '&lt;/::span class%|tagName|@$1::/span@&gt;') // inner close tag
        .replace(/(\s[a-z]{0,}[=])/g, '::span class%|attr|@$1::/span@') // Attribute
        .replace(/([\"\'].*[\"\'])/g, '::span class%|attrValue|@$1::/span@') // Atrribute Value
        .replace(/(\&gt\;|(&lt;[\/]))/g, '::span class%|tag|@$1::/span@') // Close tags
        .replace(/[:]{2}/g, '<')
        .replace(/%/g, '=')
        .replace(/\|/g, '"')
        .replace(/@/g, '>')

        if (tag) {
          lineContent.innerHTML += `<span class="number">${lineNumber}</span>`
          codeContent.innerHTML += `<p>${tag}</p>`
          codeContent.innerHTML += '\n'
          lineNumber++
        }
      }
    })
    return node
  }
}

export default { init }
