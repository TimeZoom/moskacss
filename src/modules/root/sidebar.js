window.seActive = (event) => {
  let menu = event.target.closest('ul.menu')
  let actual = event.target.closest('li')
  // Remove active from other
  var lis = menu.querySelectorAll('li')
  lis.forEach(item => {
    item.classList.remove('active')
  })
  // Add active
  let parentLi = actual.closest('li').closest('ul').closest('li')
  if (parentLi) {
    parentLi.classList.add('active')
  }
  actual.classList.add('active')
}

window.openClose = (status) => {
  let sidebar = document.querySelector('#sidebar')
  sidebar.style.marginLeft = status ? '0%' : '-90%'
  console.log(sidebar)
}

export function render () {
  let menu = [
    { name: 'Instalação', icon: 'download', anchor: 'installation' },
    { name: 'Grids', icon: 'th-large', anchor: 'grid', sub:
      [
        { name: 'Sistema de Colunas', icon: 'th-large', anchor: 'grid' },
        { name: 'Movimentação', icon: 'arrows-alt-h', anchor: 'grid-move' },
        { name: 'Coluna Fixa', icon: 'asterisk', anchor: 'grid-fixed' },
        { name: 'Tamanho por tela', icon: 'th-list', anchor: 'grid-size' },
      ]
    },
    { name: 'Exibir/Ocultar', icon: 'eye-slash', anchor: 'show-hide' },
    { name: 'Posicionamento', icon: 'arrows-alt', anchor: 'align', sub:
    [
      { name: 'Horizontal', icon: 'arrows-alt-h', anchor: 'align' },
    ]
  },
  ]

  return /*html*/`
    <div class="row">
      <a onclick="openClose(false)" class="row horizontal-right show-mob padding-20 absolute" style="z-index: 10">
        <i class="fa fa-times"></i>
      </a>
      <div class="row padding-24 horizontal-center">
        <img src="./img/logo.svg" class="col-8 mob-8" />
      </div>
      <ul class="menu black-4 detail-blue-2 vertical margin-top-16">
        ${menu.map((item, i) => {
          return /*html*/`
              <li onclick="seActive(event)" ${i === 0 ? 'class="active"' : null}>
                <a class="uppercase bold text-white padding-rl-36" href="#${item.anchor}">
                  <i class="fa fa-${item.icon}"></i> ${item.name}
                </a>
                ${ //Submenu
                  item.sub ?
                    /*html*/`
                      <ul>
                        ${item.sub.map(sub => {
                          return /*html*/`
                            <li>
                              <a href="#${sub.anchor}" class="text-gray-6 padding-rl-36">
                                <i class="fa fa-${sub.icon}"></i>${sub.name}
                              </a>
                            </li>
                          `
                        }).join('')}
                      </ul>
                    `
                  : ''
                }
              </li>
            `
        }).join('')}
      </ul>
    </div>
  `
}

export default { render }
