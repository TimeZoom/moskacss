export function init () {
  console.clear()
  var codeContentParent = document.querySelector('.highlight')
  var lines = codeContentParent.innerHTML.split('\n')

  codeContentParent.innerHTML = `<div class="line"></div><div class="code"></div>`
  var codeContent = document.querySelector('.highlight .code')
  var lineContent = document.querySelector('.highlight .line')

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
}

export default { init }
