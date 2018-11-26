import Highlight from "./highlight.js"

import Sidebar from './modules/root/sidebar.js'

import Installation from './modules/components/installation.js'
import GridSystem from './modules/components/grid/gridSystem.js'
import ColumnMove from './modules/components/grid/columnMove.js'
import FixedSizeDevice from './modules/components/grid/fixedSizeDevice.js'
import SizeByDevice from './modules/components/grid/sizeByDevice.js'
import HideShow from './modules/components/common/hideShow.js'
import Align from './modules/components/sizing/align.js'

let sidebar = document.querySelector('#sidebar')
sidebar.innerHTML = Sidebar.render()

let content = document.querySelector('.row.content')
content.innerHTML += Installation.render()
content.innerHTML += GridSystem.render()
content.innerHTML += ColumnMove.render()
content.innerHTML += FixedSizeDevice.render()
content.innerHTML += SizeByDevice.render()
content.innerHTML += HideShow.render()
content.innerHTML += Align.render()

Highlight.render()
