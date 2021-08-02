/**
 * Name: utils
 * Description: utils for environment alpinejs
 * Sub Module: utils.js
 * Author: stephen D.
 * Version: 1.0.0
 */


/**
 * Struct console
 */
const { log, clear, group, groupEnd, groupCollapsed } = console

// Clear console
// clear()

// Var size
const size = (value) => {
  if (value === null) {
    return null
  } else if (typeof value === 'number') {
    return value
  } else if (typeof value === 'string') {
    return value.trim().length
  } else if (Array.isArray(value)) {
    return value.length
  } else if (typeof value === 'object') {
    return value.size || Object.keys(value).length
  } else {
    return null
  }
}

/**
 * Fetch with timeout
 * @param {*} uri 
 * @param {*} options 
 * @param {*} timeout 
 * @returns 
 */
export const _fetch = ( uri, options = {}, timeout = 3000 ) => {
  const req = fetch( uri, options );
  const TIMEOUT = new Promise((resolve, reject) => {
   return setTimeout(() => reject(new Error('request timeout')), timeout );
  })
  return Promise.race([req, TIMEOUT]).then(response => response);
}

/**
 * Load script with return
 * @param {path} src 
 * @returns 
 */
export const loadScript = src => {
  return new Promise( function (resolve, reject) {
    if( document.querySelector('script[src="'+src+'"]') ){
      resolve();
      return;
    }
    let el = document.createElement('script')
    el.type = 'text/javascript'
    // el.async = true
    el.src = src
    el.addEventListener('load',  resolve)
    el.addEventListener('error', reject)
    el.addEventListener('abort', reject)
    document.head.appendChild(el)
  })
}

/**
 * Unload script
 * @param {*} src 
 * @returns 
 */
export const unloadScript = src => {
  return new Promise( function (resolve, reject) {
    const el = document.querySelector('script[src="'+src+'"]')
    if(!el){
      reject()
      return
    }
    document.head.removeChild(el);
    resolve();
  })
}

/**
 * Debug
 * @param {string} name 
 * @param {string} val 
 */
export const debug = (name, val) => {

  name = name.toString()

  if (mitt.get('DEBUG') === '*' || mitt.get('DEBUG') === name) {

    if (!mitt.get('color:' + name)) {
      mitt.set( 'color:' + name, '#55' + name.length)
    }

    groupCollapsed('%cDebug: ' + name + ' - [' + new Date(Date.now()).toISOString() + ']', 'color:white;background-color:' + mitt.get('color:' + name) + ';')
    log('%c data: ', 'color:white;background-color:black;', val)
    log('%c type: ', 'color:white;background-color:blue;', typeof val)
    log('%c length: ', 'color:white;background-color:orange;', size(val))
    group('Output')
    if (val && typeof val !== 'function' && typeof val !== 'symbol') {
      log(JSON.parse(JSON.stringify(val)))
    }
    groupEnd()
    log('%c', 'color:white;background-color:orange;')
    groupEnd()
  }
}


/**
 * Human date
 * 
 * const formattedDateStr = humanTime('2017-11-18T10:11:47.232Z');
 * or a Date object
 * const formattedDateObj = humanTime(new Date());
 * const formattedDateObjFrenchCanadian = humanTime(new Date(), 'fr-CA');
 * @param {datetime} date 
 * @param {lang} locales 
 * @returns 
 */
export const humanDate = (date, locales = 'default-u-nu-latn', short = true) => {
  let dateObj;
  if (typeof date === 'string') dateObj = new Date(date);
  else dateObj = date;

  const options = { month: 'long', day: 'numeric',hour: 'numeric', minute: 'numeric', second: 'numeric' };

  if( short )
    return dateObj.toLocaleString(locales, options);

  const dateYear = dateObj.toLocaleString(locales, { year: 'numeric' });
  const dateMonth = dateObj.toLocaleString(locales, { month: 'numeric' });
  const dateDay = dateObj.toLocaleString(locales, { day: 'numeric' });
  const dateHour = dateObj.getHours();
  const dateMinute = dateObj.getMinutes();

  const now = new Date();
  const nowYear = now.toLocaleString(locales, { year: 'numeric' });
  const nowMonth = now.toLocaleString(locales, { month: 'numeric' });
  const nowDay = now.toLocaleString(locales, { day: 'numeric' });
  const nowHour = now.getHours();
  const nowMinute = now.getMinutes();

  // set year only if not the same year as now
  if (dateYear !== nowYear) options.year = 'numeric';

  // if today, display relative time
  if (dateYear === nowYear && dateMonth === nowMonth && dateDay === nowDay) {
      const diffHour = nowHour - dateHour;
      const diffMinute = Math.abs(nowMinute - dateMinute);

      if (diffHour === 0 && diffMinute > 30) return '1 h';
      else if (diffHour === 0) return `${diffMinute} min`;
      else if (diffMinute >= 30) return `${diffHour + 1} h`;
      return `${diffHour} h`;
  }

  return dateObj.toLocaleString(locales, options);
}