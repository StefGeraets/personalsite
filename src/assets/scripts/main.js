// import * as theme from './lib/theme.js'

import 'alpinejs'

document.documentElement.classList.remove('no-js')

const toolTipElement = document.querySelector('.tooltip')

toolTipElement.addEventListener('touchstart touchend', function(e) {
  e.preventDefault();
  this.classList.toggle('hover');
})