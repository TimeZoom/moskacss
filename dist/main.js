/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/highlight.js":
/*!**************************!*\
  !*** ./src/highlight.js ***!
  \**************************/
/*! exports provided: render, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\nfunction render (node = null) {\r\n  var highlights = document.querySelectorAll('.highlight')\r\n  highlights.forEach(highlight => {\r\n    let safeHighlight = highlight.cloneNode(highlight)\r\n    let lang = highlight.getAttribute('lang') || 'html'\r\n    let children = safeHighlight.children.length ? safeHighlight.children : safeHighlight.innerHTML.toString().split('\\n')\r\n\r\n    let lines = processLines(children, lang)\r\n\r\n    createContent (highlight, lines)\r\n  })\r\n}\r\n\r\nfunction createContent (highlight, lines) {\r\n    // Remove all code child\r\n    while (highlight.lastChild) {\r\n      highlight.removeChild(highlight.lastChild)\r\n    }\r\n    // Create line and code element\r\n    let divLine = document.createElement('div')\r\n    let divCode = document.createElement('div')\r\n    let btnIcon = document.createElement('i')\r\n    let btnCopy = document.createElement('a')\r\n    let credits = document.createElement('a')\r\n\r\n\r\n    divLine.classList.add('line')\r\n    divCode.classList.add('code')\r\n    btnCopy.classList.add('btn-copy')\r\n    btnIcon.classList.add('fa')\r\n    btnIcon.classList.add('fa-copy')\r\n    credits.appendChild(document.createTextNode('Powered by - Aonix, MoskaCss'))\r\n    credits.classList.add('credits')\r\n    credits.setAttribute('href', 'https://aonix-group.github.io/moskacss')\r\n    credits.setAttribute('target', '_blank')\r\n\r\n    btnCopy.appendChild(btnIcon)\r\n    btnCopy.appendChild(document.createTextNode('Copy'))\r\n    btnCopy.addEventListener('click', copyContent)\r\n\r\n    lines.map((line, i) => {\r\n      // Set Number\r\n      let spanNumber = document.createElement('span')\r\n      let spanNumberText = document.createTextNode(i + 1)\r\n      spanNumber.classList.add('number')\r\n      spanNumber.append(spanNumberText)\r\n      divLine.append(spanNumber)\r\n      // Set Line\r\n      divCode.appendChild(line)\r\n    })\r\n\r\n    highlight.appendChild(divLine)\r\n    highlight.appendChild(divCode)\r\n    highlight.appendChild(btnCopy)\r\n    highlight.appendChild(credits)\r\n}\r\n\r\nfunction processLines (childrens, lang) {\r\n  let lines = []\r\n  let childrensList = typeof childrens === 'array' ? childrens : Array.from(childrens)\r\n\r\n  childrensList.forEach(originalLine => {\r\n    let line = typeof originalLine === 'string' ? originalLine : originalLine.cloneNode(originalLine)\r\n    let pad = document.createTextNode('\\u00A0')\r\n    let coloredLine = document.createElement('p')\r\n\r\n    if (lang === 'html') {\r\n      lines = languageHTML(lang, originalLine, line, lines, coloredLine)\r\n    }\r\n    if (lang === 'javascript') {\r\n      lines = languageJS(lang, line, lines, coloredLine)\r\n    }\r\n\r\n  })\r\n\r\n  return lines\r\n}\r\n\r\nfunction getRegexes ()\r\n{\r\n  return [\r\n    {\r\n      name: 'variable',\r\n      className: 'var',\r\n      regex: /(?=(?:[^'\"]*['\"][^'\"]*['\"])*[^'\"]*$)((?!let|const|var|import|from|require)\\b([a-zA-z]{1,}[a-zA-|0-9]+))(?!\\()\\b/g\r\n    },\r\n    { name: 'varType', regex: /(import|from|let|const|var)/g, className: 'varType'},\r\n    { name: 'colon', regex: /([:])/g, className: 'colon'},\r\n    { name: 'number', regex: /(\\d{1,})/g, className: 'number'},\r\n    { name: 'equal', regex: /(=|\\+)/g, className: 'selector'},\r\n    { name: 'string', regex: /(['\"`].*['\"`])/g, className: 'string'},\r\n    { name: 'dot', regex: /(?=(?:[^'\"]*['\"][^'\"]*['\"])*[^'\"]*$)(\\.)/g, className: 'selectorDot'},\r\n    { name: 'function', regex: /[\\.]([a-zA-Z]{1,}[a-zA-Z0-9\\-\\_]{1,})[\\(]/g, className: 'function'},\r\n    { name: 'parentheses', regex: /([\\(]|[\\)])/g, className: 'parentheses'},\r\n    { name: 'openCloses', regex: /([\\{\\}\\[\\]])/g, className: 'open-closes'},\r\n    { name: 'comma', regex: /(\\,)/g, className: 'comma'},\r\n  ]\r\n}\r\nfunction languageJS (lang, line, lines, coloredLine) {\r\n  let pad = document.createTextNode('\\u00A0')\r\n  let regexes = getRegexes()\r\n  let linePad = /^[\\s]{8}/g.exec(line)\r\n  if (linePad) {\r\n    [...Array(4)].map(obj => { coloredLine.appendChild(pad.cloneNode(pad)) })\r\n  }\r\n\r\n  line = line.trim()\r\n  let lineParts = []\r\n  if (line) {\r\n    let matchIndexes = []\r\n    regexes.map(obj => {\r\n\r\n      let match;\r\n      while ((match = obj.regex.exec(line)) !== null) { // loop where exists regex match groups\r\n        if (match.index === obj.regex.lastIndex) { // prevent infinity loop\r\n          obj.regex.lastIndex++;\r\n        }\r\n\r\n        matchItem = match[1] // get group Result\r\n        let index = line.indexOf(matchItem) // store index of mach in line\r\n        let span = document.createElement('span')\r\n        let text = document.createTextNode(matchItem)\r\n        span.appendChild(text)\r\n        span.classList.add(obj.className)\r\n\r\n        let hasMatchIndex = matchIndexes.filter(obj => obj.matchItem == matchItem) // Check if has objects equals in this line\r\n        if (hasMatchIndex.length && hasMatchIndex[0].index == index) { // If yes check if the index positions are same\r\n          let newIndex = index + matchItem.split('').length // Increase index with new match lenght\r\n          let cutedLine = line.substr(newIndex) // Cut index ahead las index\r\n          index = cutedLine.indexOf(matchItem) + newIndex // Set new index\r\n        }\r\n        matchIndexes.push({index, matchItem}) // Store last index and char\r\n\r\n        lineParts.push({index: index, span}) // Store this match at array\r\n      }\r\n    })\r\n\r\n    let linePartsSorted = lineParts.sort((a, b) => a.index > b.index ? 1 : (b.index > a.index ? -1 : 0)) // Sorte indexes\r\n    linePartsSorted.map(obj => {\r\n      coloredLine.appendChild(obj.span) // Append in order\r\n    })\r\n  }\r\n   // Add to lines array\r\n  coloredLine.children.length ? lines.push(coloredLine) : null\r\n\r\n  return lines\r\n}\r\nfunction languageHTML (lang, originalLine, line, lines, coloredLine) {\r\n  let hasChildren = originalLine.children\r\n  let hasText = !hasChildren.length && document.createTextNode(line.innerText)\r\n  let pad = document.createTextNode('\\u00A0')\r\n  let childrenColoredLine = document.createElement('p')\r\n  coloredLine.append(pad.cloneNode(pad))\r\n  childrenColoredLine.append(pad.cloneNode(pad))\r\n\r\n  // Remove all children\r\n  while (line.lastChild) {\r\n    line.removeChild(line.lastChild)\r\n  }\r\n  line = line.outerHTML\r\n  let attributs = line.match(/(\"[^\"]{0,}\")/g) // Save attributes\r\n  line = line.replace(/(\"[^\"]{0,}\")/g, '\"\"') // Clear attributes\r\n\r\n  coloredLine.append(createSpan(line, /^(<)/g, 'tag')) // Open tag\r\n  coloredLine.append(createSpan(line, /^<([a-z]{0,})/g, 'tagName'))\r\n  coloredLine.append(createSpan(line, /(\\s[a-z]{0,}[=])/g, 'attr', attributs))\r\n  coloredLine.append(createSpan(line, /(>)./g, 'tag')) // Open middle tag\r\n\r\n  if (hasText) {\r\n    let spanText = document.createElement('span')\r\n    spanText.classList.add('text')\r\n    spanText.append(hasText)\r\n    coloredLine.append(spanText) // Inner Text\r\n  }\r\n\r\n\r\n  if (!hasChildren.length) { // Close elements that's doenst have children\r\n    coloredLine.append(createSpan(line, /(<[\\/])/g, 'tag')) // Open end tag close\r\n    coloredLine.append(createSpan(line, /<[\\/](.*)>/g, 'tagName')) // Open end tag name\r\n    coloredLine.append(createSpan(line, /(>)$/g, 'tag')) // Open last tag\r\n  }\r\n\r\n  lines.push(coloredLine)\r\n\r\n  if (hasChildren.length) {\r\n\r\n    let childrenLines = processLines(hasChildren, lang)\r\n    childrenLines.map(childrenLine => {\r\n      childrenLine.prepend(pad.cloneNode(pad))\r\n      childrenLine.prepend(pad.cloneNode(pad))\r\n      childrenLine.prepend(pad.cloneNode(pad))\r\n      lines.push(childrenLine)\r\n    })\r\n\r\n    childrenColoredLine.append(createSpan(line, /(<[\\/])/g, 'tag')) // Open end tag close\r\n    childrenColoredLine.append(createSpan(line, /<[\\/](.*)>/g, 'tagName')) // Open end tag name\r\n    childrenColoredLine.append(createSpan(line, /(>)$/g, 'tag')) // Open last tag\r\n    lines.push(childrenColoredLine)\r\n  }\r\n\r\n  return lines\r\n}\r\n\r\n// HTML\r\nfunction createSpan (line, regex, className, attributs = null) {\r\n  let mainSpan = document.createElement('span')\r\n  let pad = document.createTextNode( '\\u00A0' )\r\n  let hasMatch = false\r\n  let count = 0\r\n\r\n  while (hasMatch = regex.exec(line)) {\r\n    if (hasMatch) {\r\n      let span = document.createElement('span')\r\n      let text = document.createTextNode(hasMatch[1])\r\n\r\n      span.classList.add(className)\r\n      span.appendChild(text)\r\n      mainSpan.appendChild(span)\r\n\r\n      if (attributs) {\r\n        let spanAttribute = document.createElement('span')\r\n        let textAtrribute = document.createTextNode(attributs[count])\r\n        spanAttribute.classList.add('attrValue')\r\n        spanAttribute.appendChild(textAtrribute)\r\n        mainSpan.appendChild(spanAttribute)\r\n      }\r\n    }\r\n    count++\r\n  }\r\n\r\n  return mainSpan\r\n}\r\n\r\n// Copy Content\r\nfunction copyContent (event) {\r\n  console.log('clicked')\r\n  event.preventDefault()\r\n  let elm = event.target.closest('.highlight').querySelector('.code')\r\n  let range = document.createRange()\r\n  range.selectNode(elm)\r\n  window.getSelection().removeAllRanges()\r\n  window.getSelection().addRange(range)\r\n  document.execCommand(\"Copy\")\r\n  window.getSelection().removeAllRanges()\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({ render });\r\n\n\n//# sourceURL=webpack:///./src/highlight.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _highlight_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./highlight.js */ \"./src/highlight.js\");\n/* harmony import */ var _modules_root_sidebar_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/root/sidebar.js */ \"./src/modules/root/sidebar.js\");\n/* harmony import */ var _modules_components_installation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/components/installation.js */ \"./src/modules/components/installation.js\");\n/* harmony import */ var _modules_components_grid_gridSystem_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/components/grid/gridSystem.js */ \"./src/modules/components/grid/gridSystem.js\");\n/* harmony import */ var _modules_components_grid_columnMove_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/components/grid/columnMove.js */ \"./src/modules/components/grid/columnMove.js\");\n/* harmony import */ var _modules_components_grid_fixedSizeDevice_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/components/grid/fixedSizeDevice.js */ \"./src/modules/components/grid/fixedSizeDevice.js\");\n/* harmony import */ var _modules_components_grid_sizeByDevice_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/components/grid/sizeByDevice.js */ \"./src/modules/components/grid/sizeByDevice.js\");\n/* harmony import */ var _modules_components_common_hideShow_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/components/common/hideShow.js */ \"./src/modules/components/common/hideShow.js\");\n/* harmony import */ var _modules_components_sizing_align_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/components/sizing/align.js */ \"./src/modules/components/sizing/align.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nlet sidebar = document.querySelector('#sidebar')\r\nsidebar.innerHTML = _modules_root_sidebar_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].render()\r\n\r\nlet content = document.querySelector('.row.content')\r\ncontent.innerHTML += _modules_components_installation_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].render()\r\ncontent.innerHTML += _modules_components_grid_gridSystem_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].render()\r\ncontent.innerHTML += _modules_components_grid_columnMove_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"].render()\r\ncontent.innerHTML += _modules_components_grid_fixedSizeDevice_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"].render()\r\ncontent.innerHTML += _modules_components_grid_sizeByDevice_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"].render()\r\ncontent.innerHTML += _modules_components_common_hideShow_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"].render()\r\ncontent.innerHTML += _modules_components_sizing_align_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"].render()\r\n\r\n_highlight_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].render()\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/modules/components/common/hideShow.js":
/*!***************************************************!*\
  !*** ./src/modules/components/common/hideShow.js ***!
  \***************************************************/
/*! exports provided: render, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\nfunction render () {\r\n  return /*html*/ `\r\n    <div class=\"row padding-36 white border-radius-5 margin-top-16\">\r\n      <a name=\"show-hide\" class=\"anchor\">.</a>\r\n      <h5><i class=\"fa fa-eye-slash\"></i> Exibir ou ocultar elementos em diferentes resoluções</h5>\r\n      <p>Adicionando a classe .hide-desk o elemento é ocultado apenas no desktop, .hidden-tab o elemento é ocultado apenas no tablet e .hidden-mob o elemento é ocultado apenas em smartphones.</p>\r\n      <div class=\"row margin-top-16\">\r\n        <div class=\"row hidden-desk border\"><div class=\"col-12\">.hidden-desk Oculto para Desktop</div></div>\r\n        <div class=\"row hidden-tab border\"><div class=\"col-12\">.hidden-tab Oculto para Tablet</div></div>\r\n        <div class=\"row hidden-mob border\"><div class=\"col-12\">.hidden-mob Oculto para Smartphone</div></div>\r\n      </div>\r\n      <p>Adicionando a classe .show-desk o elemento será exibido apenas no desktop, .show-tab o elemento será exibido apenas no tablet e .show-mob o elemento será exibido apenas em smartphones.</p>\r\n      <div class=\"row margin-top-16\">\r\n        <div class=\"row show-desk border\"><div class=\"col-12\">.show-desk Exibido para Desktop</div></div>\r\n        <div class=\"row show-tab border\"><div class=\"col-12\">.show-tab Exibido para Tablet</div></div>\r\n        <div class=\"row show-mob border\"><div class=\"col-12\">.show-mob Exibido para Smartphone</div></div>\r\n      </div>\r\n    </div>\r\n  `\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({ render });\r\n\n\n//# sourceURL=webpack:///./src/modules/components/common/hideShow.js?");

/***/ }),

/***/ "./src/modules/components/grid/columnMove.js":
/*!***************************************************!*\
  !*** ./src/modules/components/grid/columnMove.js ***!
  \***************************************************/
/*! exports provided: render, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\nfunction render() {\r\n  return /*html*/`\r\n  <div class=\"row padding-36 white border-radius-5 margin-top-16\">\r\n    <a name=\"grid-move\" class=\"anchor\">.</a>\r\n    <h5><i class=\"fa fa-th-large\"></i>Movimentação de colunas</h5>\r\n    <p>Você pode mover a coluna apenas informando a classe .mov-? onde ? é o número desejado, veja o exemplo a baixo: </p>\r\n    <div class=\"row margin-top-16 margin-top-16\">\r\n      <div class=\"col-2 border\">.col-2</div>\r\n    </div>\r\n    <div class=\"row\">\r\n      <div class=\"col-2 move-1 border\">.col-2 .move-1</div>\r\n    </div>\r\n    <div class=\"row\">\r\n      <div class=\"col-2 move-2 border\">.col-2 .move-2</div>\r\n    </div>\r\n    <div class=\"row\">\r\n      <div class=\"col-2 move-3 border\">.col-2 .move-3</div>\r\n    </div>\r\n    <div class=\"row\">\r\n      <div class=\"col-6 move-4 border\">.col-6 .move-4</div>\r\n    </div>\r\n    <div class=\"row\">\r\n      <div class=\"col-2 move-10 border\">.col-2 .move-10</div>\r\n    </div>\r\n  </div>\r\n  `\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({ render });\r\n\n\n//# sourceURL=webpack:///./src/modules/components/grid/columnMove.js?");

/***/ }),

/***/ "./src/modules/components/grid/fixedSizeDevice.js":
/*!********************************************************!*\
  !*** ./src/modules/components/grid/fixedSizeDevice.js ***!
  \********************************************************/
/*! exports provided: render, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\nfunction render() {\r\n  return /*html*/`\r\n  <div class=\"row padding-36 white border-radius-5 margin-top-16\">\r\n    <a name=\"grid-fixed\" class=\"anchor\">.</a>\r\n    <h5><i class=\"fa fa-th-large\"></i>Fixar colunas em dispositivos móveis</h5>\r\n    <p>Para que a coluna tenha seu tamanho fixo mesmo em dispositivos móvies, adicione a classe .columns n div pai das colunas</p>\r\n    <div class=\"row column border margin-top-16 padding-8\">\r\n      <p>.row .column</p>\r\n      <div class=\"col-4 border\">.col-4</div>\r\n      <div class=\"col-4 border\">.col-4</div>\r\n      <div class=\"col-4 border\">.col-4</div>\r\n    </div>\r\n    <p>O mesmo é necessário para que movimentação de colunas aconteça no mobile</p>\r\n    <div class=\"row column border margin-top-16 padding-8\">\r\n      <p>.row .column</p>\r\n      <div class=\"col-4 move-4 border\">.col-4 .move-4</div>\r\n    </div>\r\n  </div>\r\n  `\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({ render });\r\n\n\n//# sourceURL=webpack:///./src/modules/components/grid/fixedSizeDevice.js?");

/***/ }),

/***/ "./src/modules/components/grid/gridSystem.js":
/*!***************************************************!*\
  !*** ./src/modules/components/grid/gridSystem.js ***!
  \***************************************************/
/*! exports provided: render, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\nfunction render() {\r\n  return /*html*/`\r\n  <div class=\"row padding-36 white border-radius-5 margin-top-16\">\r\n    <a name=\"grid\" class=\"anchor\">.</a>\r\n    <h4><i class=\"fa fa-th-large\"></i>Sistemas de Coluna</h4>\r\n    <p>\r\n      O sistema de colunas do MoskaCss é baseado em Flexbox. Uma coluna pode ser definida com o espaço de 1 a 12 colunas e necessariamente precisa estar dentro de uma .row que divide o seu conteúdo em 12 colunas.\r\n    </p>\r\n\r\n    <div class=\"row margin-top-16\">\r\n      <div class=\"col-1 border\">.col-1</div>\r\n      <div class=\"col-5 border\">.col-5</div>\r\n      <div class=\"col-5 border\">.col-5</div>\r\n      <div class=\"col-1 border\">.col-1</div>\r\n    </div>\r\n    <div class=\"row\">\r\n      <div class=\"col-1 border\">.col-1</div>\r\n      <div class=\"col-1 border\">.col-1</div>\r\n      <div class=\"col-1 border\">.col-1</div>\r\n      <div class=\"col-1 border\">.col-1</div>\r\n      <div class=\"col-1 border\">.col-1</div>\r\n      <div class=\"col-1 border\">.col-1</div>\r\n      <div class=\"col-1 border\">.col-1</div>\r\n      <div class=\"col-1 border\">.col-1</div>\r\n      <div class=\"col-1 border\">.col-1</div>\r\n      <div class=\"col-1 border\">.col-1</div>\r\n      <div class=\"col-1 border\">.col-1</div>\r\n      <div class=\"col-1 border\">.col-1</div>\r\n    </div>\r\n    <div class=\"row\">\r\n      <div class=\"col-1 border\">.col-1</div>\r\n      <div class=\"col-10 border\">.col-10</div>\r\n      <div class=\"col-1 border\">.col-1</div>\r\n    </div>\r\n\r\n    <code class=\"highlight col-12 border-radius-5\">\r\n      <div class=\"row\">\r\n        <div class=\"col-1\">.col-1</div>\r\n        <div class=\"col-5\">.col-5</div>\r\n        <div class=\"col-5\">.col-5</div>\r\n        <div class=\"col-1\">.col-1</div>\r\n      </div>\r\n    </code>\r\n  </div>\r\n  `\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({ render });\r\n\n\n//# sourceURL=webpack:///./src/modules/components/grid/gridSystem.js?");

/***/ }),

/***/ "./src/modules/components/grid/sizeByDevice.js":
/*!*****************************************************!*\
  !*** ./src/modules/components/grid/sizeByDevice.js ***!
  \*****************************************************/
/*! exports provided: render, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\nfunction render() {\r\n  return /*html*/`\r\n  <div class=\"row padding-36 white border-radius-5 margin-top-16\">\r\n    <a name=\"grid-size\" class=\"anchor\">.</a>\r\n    <h5><i class=\"fa fa-th-large\"></i> Tamanhos de colunas diferentes de acordo com o dispositivo</h5>\r\n    <p>É possível definir tamanhos diferentes para diferentes resoluções, caso defina .col-2 no desktop as colunas irão equivaler a 1/6 das 12 colunas, automaticamente em dispositivos móveis a coluna ocupara 100% do tamanho, porem em alguns casos se faz necessário forçar o tamanho de apenas uma ou mais colunas, neste caso juntamente com o .col-2 podemos passar uma nova classe para o dispositivo em questão, por exemplo: .col-2 .tab-4 .mob-6. Desta forma em desktop teremos 6 colunas ocupando 2 espaços totalizando 12 colunas, no tablet teremos 6 colunas ocupando quatros espaços e em smartphones teremos 6 colunas ocupando 6 espaços.</p>\r\n    <div class=\"row border margin-top-16\">\r\n      <div class=\"col-2 tab-4 mob-6 border\">.col-2 .tab-4 .mob-6</div>\r\n      <div class=\"col-2 tab-4 mob-6 border\">.col-2 .tab-4 .mob-6</div>\r\n      <div class=\"col-2 tab-4 mob-6 border\">.col-2 .tab-4 .mob-6</div>\r\n      <div class=\"col-2 tab-4 mob-6 border\">.col-2 .tab-4 .mob-6</div>\r\n      <div class=\"col-2 tab-4 mob-6 border\">.col-2 .tab-4 .mob-6</div>\r\n      <div class=\"col-2 tab-4 mob-6 border\">.col-2 .tab-4 .mob-6</div>\r\n    </div>\r\n  </div>\r\n  `\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({ render });\r\n\n\n//# sourceURL=webpack:///./src/modules/components/grid/sizeByDevice.js?");

/***/ }),

/***/ "./src/modules/components/installation.js":
/*!************************************************!*\
  !*** ./src/modules/components/installation.js ***!
  \************************************************/
/*! exports provided: render, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\nfunction render() {\r\n  return /*html*/`\r\n    <div class=\"row padding-36 white border-radius-5\">\r\n      <a name=\"installation\" class=\"anchor\">.</a>\r\n      <h4><i class=\"fa fa-download\"></i>Instalação</h4>\r\n      <p>\r\n        Para fazer uso do framework basta adicionar as seguintes linhas no header de seu index:\r\n      </p>\r\n\r\n      <div class=\"row padding-8\">\r\n        <code class=\"highlight col-12 border-radius-5\">\r\n          <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n          <link rel=\"stylesheet\" href=\"//aonix-group.github.io/moskacss/css/moska.min.css\">\r\n        </code>\r\n      </div>\r\n\r\n    </div>\r\n  `\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({ render });\r\n\n\n//# sourceURL=webpack:///./src/modules/components/installation.js?");

/***/ }),

/***/ "./src/modules/components/sizing/align.js":
/*!************************************************!*\
  !*** ./src/modules/components/sizing/align.js ***!
  \************************************************/
/*! exports provided: render, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\nfunction render() {\r\n  return /*html*/`\r\n  <div class=\"row padding-36 white border-radius-5 margin-top-16\">\r\n    <a name=\"align\" class=\"anchor\">.</a>\r\n    <h5><i class=\"fa fa-eye-slash\"></i> Alinhamento Horizontal</h5>\r\n    <p>...</p>\r\n    <div class=\"row margin-top-16\">\r\n      <div class=\"row padding-8 border horizontal-left\">\r\n        <p>.row.horizontal-left</p>\r\n        <div class=\"col-5 border\">.col-5</div>\r\n      </div>\r\n      <div class=\"row padding-8 border horizontal-center\">\r\n        <p>.row.horizontal-center</p>\r\n        <div class=\"col-5 border\">\r\n          <p class=\"content-center\">\r\n            .col-5 .self-center\r\n          </p>\r\n        </div>\r\n      </div>\r\n      <div class=\"row padding-8 border horizontal-right\">\r\n        <p>.row.horizontal-left</p>\r\n        <div class=\"col-6 border\">.col-6</div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  `\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({ render });\r\n\n\n//# sourceURL=webpack:///./src/modules/components/sizing/align.js?");

/***/ }),

/***/ "./src/modules/root/sidebar.js":
/*!*************************************!*\
  !*** ./src/modules/root/sidebar.js ***!
  \*************************************/
/*! exports provided: render, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\nwindow.seActive = (event) => {\r\n  let menu = event.target.closest('ul.menu')\r\n  let actual = event.target.closest('li')\r\n  // Remove active from other\r\n  var lis = menu.querySelectorAll('li')\r\n  lis.forEach(item => {\r\n    item.classList.remove('active')\r\n  })\r\n  // Add active\r\n  let parentLi = actual.closest('li').closest('ul').closest('li')\r\n  if (parentLi) {\r\n    parentLi.classList.add('active')\r\n  }\r\n  actual.classList.add('active')\r\n}\r\n\r\nwindow.openClose = (status) => {\r\n  let sidebar = document.querySelector('#sidebar')\r\n  sidebar.style.marginLeft = status ? '0%' : '-90%'\r\n  console.log(sidebar)\r\n}\r\n\r\nfunction render () {\r\n  let menu = [\r\n    { name: 'Instalação', icon: 'download', anchor: 'installation' },\r\n    { name: 'Grids', icon: 'th-large', anchor: 'grid', sub:\r\n      [\r\n        { name: 'Sistema de Colunas', icon: 'th-large', anchor: 'grid' },\r\n        { name: 'Movimentação', icon: 'arrows-alt-h', anchor: 'grid-move' },\r\n        { name: 'Coluna Fixa', icon: 'asterisk', anchor: 'grid-fixed' },\r\n        { name: 'Tamanho por tela', icon: 'th-list', anchor: 'grid-size' },\r\n      ]\r\n    },\r\n    { name: 'Exibir/Ocultar', icon: 'eye-slash', anchor: 'show-hide' },\r\n    { name: 'Posicionamento', icon: 'arrows-alt', anchor: 'align', sub:\r\n    [\r\n      { name: 'Horizontal', icon: 'arrows-alt-h', anchor: 'align' },\r\n    ]\r\n  },\r\n  ]\r\n\r\n  return /*html*/`\r\n    <div class=\"row\">\r\n      <a onclick=\"openClose(false)\" class=\"row horizontal-right show-mob padding-20 absolute\" style=\"z-index: 10\">\r\n        <i class=\"fa fa-times\"></i>\r\n      </a>\r\n      <div class=\"row padding-24 horizontal-center\">\r\n        <img src=\"./img/logo.svg\" class=\"col-8 mob-8\" />\r\n      </div>\r\n      <ul class=\"menu black-4 detail-blue-2 vertical margin-top-16\">\r\n        ${menu.map((item, i) => {\r\n          return /*html*/`\r\n              <li onclick=\"seActive(event)\" ${i === 0 ? 'class=\"active\"' : null}>\r\n                <a class=\"uppercase bold text-white padding-rl-36\" href=\"#${item.anchor}\">\r\n                  <i class=\"fa fa-${item.icon}\"></i> ${item.name}\r\n                </a>\r\n                ${ //Submenu\r\n                  item.sub ?\r\n                    /*html*/`\r\n                      <ul>\r\n                        ${item.sub.map(sub => {\r\n                          return /*html*/`\r\n                            <li>\r\n                              <a href=\"#${sub.anchor}\" class=\"text-gray-6 padding-rl-36\">\r\n                                <i class=\"fa fa-${sub.icon}\"></i>${sub.name}\r\n                              </a>\r\n                            </li>\r\n                          `\r\n                        }).join('')}\r\n                      </ul>\r\n                    `\r\n                  : ''\r\n                }\r\n              </li>\r\n            `\r\n        }).join('')}\r\n      </ul>\r\n    </div>\r\n  `\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({ render });\r\n\n\n//# sourceURL=webpack:///./src/modules/root/sidebar.js?");

/***/ })

/******/ });