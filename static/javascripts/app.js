/**
 * Name: app
 * Description: app
 * Author: stephen D.
 * Version: 1.0.0
 */

// Utils
import { loadScript, debug, humanDate } from './utils.js'

/**
 * Bootstrap
 */
;(async () => {

  // Load mitt
  await import('./vendors/ebus.js')

  // Debug filter
  mitt.set('DEBUG', '*')

  // Load dictionnary
  await import('./dictionnary.js')

  // Load materialize js theme
  loadScript('./static/javascripts/vendors/materialize.min.js')
  .then( e => {
    debug('material', 'loaded')
    // init
    M.AutoInit();
    // Element
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
  })
  .catch( e => debug('material','error: materialize  unloaded') )

  // Load alpinejs
  await import('./vendors/alpine.js')
  
})()

/**
 * Alpine extend methods
 */
document.addEventListener('alpine:init', () => {
  // Translate text
  Alpine.directive('i18n', el => {
    let text = el.textContent.trim()
    if (text.length == 0 ) return
    el.textContent = mitt.get('lang:' + document.documentElement.lang + ':' + text) || text
  })
  // Human date format
  Alpine.directive('date', (el, {value}) => {
    let date = el.textContent.trim() || new Date()
    el.textContent = humanDate(date, 'fr' || document.documentElement.lang, value === 'short' ? true : false )
  })
})
