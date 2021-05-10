/*
 * Plugins - utils
 */

/** --------------------------------------------------------------------------------------------- */
/** i18n - translate    ========================================================================= */
/** --------------------------------------------------------------------------------------------- */

import dictonnary from './dictonnary'

// Force lang
document.documentElement.lang = navigator.language || navigator.userLanguage

/*
 * Translate
 *
 * usage: __( 'text' )
 *        __( 'Hello %s', 'Brian')
 *
 */
export function __ (text, ...args) {
  const lang = document.documentElement.lang.toLowerCase().trim()
  if (typeof text !== 'string') return text
  text = text.trim()
  if (text.length === 0) return ''
  if (
    typeof dictonnary !== 'undefined' &&
    dictonnary[lang] &&
    dictonnary[lang][text]
  ) {
    text = dictonnary[lang][text]
  }
  let i = 0
  return stripTags(text.replace(/%s/g, () => args[i++]))
}

/*
 * Function translate singular / plural
 *
 * Usage: _n( car, cars, 10 )
 *
 */
export function __n (singular, plural, number, ...args) {
  if (typeof number === 'number' && isFinite(number) && number > 1) {
    return __(plural, ...args)
  }
  return __(singular, ...args)
}

/** --------------------------------------------------------------------------------------------- */
/** i18n - Date         ========================================================================= */
/** --------------------------------------------------------------------------------------------- */

/*
 * 
 * const formattedDateStr = humanTime('2017-11-18T10:11:47.232Z');

 * or a Date object
 * const formattedDateObj = humanTime(new Date());
 * const formattedDateObjFrenchCanadian = humanTime(new Date(), 'fr-CA');
 */
export const date = (date = new Date(), short = true, locales = document.documentElement.lang) => {
  let dateObj;
  if (typeof date === 'string') dateObj = new Date(date);
  else dateObj = date;

  const options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };

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

/**
* Fonction date
*
* @param format     format de sortie
* @param timestamp  timestamp
* @param translate  bool traduction true/false
*/
export function _date (format = 'Y-m-d H:i:s', timestamp = false) {
  // On définit le timestamp
  if (timestamp === false) {
    timestamp = Date.now()
  } else if (typeof timestamp === 'string' && isDate(timestamp)) {
    timestamp = Date.parse(timestamp)
  } else {
    timestamp = Date.parse(new Date(parseInt(timestamp)))
  }

  // error timestamp
  if (timestamp === false) return

  // Si le format timestamp demandé on retourne timestamp
  if (format === 'U') return timestamp

  // Si format demande on change le format
  if (format === 'r') format = 'D, d M Y H:i:s O'

  // On créer l'objet Date
  timestamp = new Date(timestamp)

  // format c demandé
  if (format === 'c') return timestamp

  // The Weekdays
  let weekday = []
  weekday[0] = __('Sunday')
  weekday[1] = __('Monday')
  weekday[2] = __('Tuesday')
  weekday[3] = __('Wednesday')
  weekday[4] = __('Thursday')
  weekday[5] = __('Friday')
  weekday[6] = __('Saturday')

  // Abbreviations for each day.
  let weekdayabbrev = []
  weekdayabbrev[0] = __('Sun')
  weekdayabbrev[1] = __('Mon')
  weekdayabbrev[2] = __('Tue')
  weekdayabbrev[3] = __('Wed')
  weekdayabbrev[4] = __('Thu')
  weekdayabbrev[5] = __('Fri')
  weekdayabbrev[6] = __('Sat')

  // The Months
  let month = []
  month['0'] = __('January')
  month['1'] = __('February')
  month['2'] = __('March')
  month['3'] = __('April')
  month['4'] = __('May')
  month['5'] = __('June')
  month['6'] = __('July')
  month['7'] = __('August')
  month['8'] = __('September')
  month['9'] = __('October')
  month['10'] = __('November')
  month['11'] = __('December')

  // Abbreviations for each month.
  let monthabbrev = []
  monthabbrev[0] = __('Jan')
  monthabbrev[1] = __('Feb')
  monthabbrev[2] = __('Mar')
  monthabbrev[3] = __('Apr')
  monthabbrev[4] = __('May')
  monthabbrev[5] = __('Jun')
  monthabbrev[6] = __('Jul')
  monthabbrev[7] = __('Aug')
  monthabbrev[8] = __('Sep')
  monthabbrev[9] = __('Oct')
  monthabbrev[10] = __('Nov')
  monthabbrev[11] = __('Dec')

  // The Meridiems
  let meridiem = []
  meridiem[0] = __('am')
  meridiem[1] = __('pm')
  meridiem[2] = __('AM')
  meridiem[3] = __('PM')

  // on ajout backslash
  format = format.replace(new RegExp('[jdDlLNwFmMnYyaAgGhHisvOe]', 'g'), '\\\\$&')

  return format
    // Day
    .replace(/\\\\j/g, timestamp.getDate())
    .replace(/\\\\d/g, ('0' + timestamp.getDate()).slice(-2))
    .replace(/\\\\D/g, weekdayabbrev[ timestamp.getDay() ])
    .replace(/\\\\l/g, weekday[ timestamp.getDay() ])
    .replace(/\\\\L/g, weekdayabbrev[ timestamp.getDay() ].toLowerCase())
    .replace(/\\\\N/g, timestamp.getDay() + 1)
    .replace(/\\\\w/g, timestamp.getDay())
    // Month
    .replace(/\\\\F/g, month[ timestamp.getMonth() ])
    .replace(/\\\\m/g, ('0' + (timestamp.getMonth() + 1 ) ).slice(-2))
    .replace(/\\\\M/g, monthabbrev[ timestamp.getMonth() ])
    .replace(/\\\\n/g, timestamp.getMonth())
    // Year
    .replace(/\\\\Y/g, timestamp.getFullYear())
    .replace(/\\\\y/g, ('' + timestamp.getFullYear()).slice(-2))
    // Time
    .replace(/\\\\a/g, meridiem[Math.floor(timestamp.getHours() / 12)])
    .replace(/\\\\A/g, meridiem[Math.floor(timestamp.getHours() / 12) + 2])
    .replace(/\\\\g/g, timestamp.getHours() - (12 * (Math.ceil(timestamp.getHours() / 12) - 1)))
    .replace(/\\\\G/g, timestamp.getHours())

    .replace(/\\\\h/g, ('0' + (timestamp.getHours() - (12 * (Math.ceil(timestamp.getHours() / 12) - 1)))).slice(-2))

    .replace(/\\\\H/g, ('0' + timestamp.getHours()).slice(-2))
    .replace(/\\\\i/g, ('0' + timestamp.getMinutes()).slice(-2))
    .replace(/\\\\s/g, ('0' + timestamp.getSeconds()).slice(-2))
    .replace(/\\\\v/g, ('00' + timestamp.getMilliseconds()).slice(-3))
    .replace(/\\\\O/g, timestamp.getTimezoneOffset())
}


/** --------------------------------------------------------------------------------------------- */
/** Sanitize            ========================================================================= */
/** --------------------------------------------------------------------------------------------- */

/* strip all tags
 *
 *
 * return remove tags
 */
export const stripTags = (text) => {
  text = text || ''
  return text
    .replace(/<!--[\s\S]*?(-->|$)/g, '')
    .replace(/<(script|style)[^>]*>[\s\S]*?(<\/\1>|$)/gi, '')
    .replace(/<\/?[a-z][\s\S]*?(>|$)/gi, '')
}

/* sanitize name
 *
 *
 * return clean string
 */
export const sanitize_name = value => value.replace(/[^\w-]/gi, '')

/* sanitize number
 *
 */
export const sanitize_number = value => value.replace(/[^0-9]/gi, '')


/** --------------------------------------------------------------------------------------------- */
/** Validator           ========================================================================= */
/** --------------------------------------------------------------------------------------------- */

/* Is url :: Validator
 *
 * Usage : isUrl( 'url' );
 * return boolean
 */
export const isUrl = function (value) {
  try {
    return Boolean(new URL(value))
  } catch (e) {
    return false
  }
}

export const isDatetime = value => value.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}/)

/**
* Fonction date
* @param timestamp  timestamp
*/
export const isDate = (value) => {
  if (typeof value === 'number') {
    value = new Date(value)
  }
  value = Date.parse(value)
  if (!value) return false
  return true
}


/** --------------------------------------------------------------------------------------------- */
/** Helper              ========================================================================= */
/** --------------------------------------------------------------------------------------------- */

/*
 * Basename
 */
export const basename = path => path.replace(/\/+$/, '').replace(/.*\//, '')


/**
 * Récupere les args passer à l'url courante
 * @return objet retourne les arguments
 */
export const get_query_param = (param) => {
  let vars = {}
  window.location.href.replace(location.hash, '').replace(
    /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
    function (m, key, value) {
      // callback
      vars[key] = value !== undefined ? value : ''
    }
  )
  if (param) {
    return vars[param] ? vars[param] : null
  }
  return vars
}


/* Parse les arguments passé en paramètres et construit la requête
 *
 * Usage : parse_args( args, defauts );
 * params:
 *    args: objet
 *    defauts : objet
 * return  query
 */
export const parse_args = (args, defauts = {} )  => {
  let output = ''
  args = { ...defauts, ...args}
  Object.keys(args).forEach( (v) => {
    if(args[v]) output += '&' + v + '=' + args[v] 
  })
  return output.substring(1, output.length)
}

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

export const _fetch = ( uri, options = {}, timeout = 5000 ) => {
  const req = fetch( uri, options );
  const TIMEOUT = new Promise((resolve, reject) => {
   return setTimeout(() => reject(new Error('request timeout')), timeout );
  })
  return Promise.race([req, TIMEOUT]).then(response => response);
}

export const putFocus = ( id ) => {
  let element = document.getElementById(id)
  if( !element ) return
  element.setAttribute('readonly', 'readonly')
  setTimeout(function() {
    element.blur()
    element.focus()
    element.removeAttribute('readonly');
    }, 10)
}

export const uniqueBy = (arr, prop) => {
  let uniq = []
  let res = []
  arr.map( x => {
    if( !uniq.includes( x[prop] )) res.push(x) && uniq.push(x[prop])
  })
  return res
}

/*
 * merge objets recursif
 */
export const deepAsign = ( object, ...toassign ) => {
  if( typeof object === 'object' ){
    toassign.forEach( data => { if( isPlainObject(data) ) mergeInObject( object, data ) })
  }
  return object;
}

const assign= ( ref, key, value ) => {
  if( isPlainObject(value) ){
      if( !isPlainObject(ref[key]) ) ref[key] = {}
      mergeInObject( ref[key], value )
  } else {
    ref[key] = value
  }
}

const mergeInObject = ( dest, data ) => {
  Object.keys( data ).forEach( key => assign( dest, key, data[key] ) )
}

const isPlainObject = ( o ) => o !== undefined && o.constructor !== undefined && o.constructor.prototype === Object.prototype




/*
 * Export default
 *
 *
 */
export default {__, __n, date, _date, sanitize_name, sanitize_number, stripTags, isUrl, isDatetime, isDate, basename, get_query_param, parse_args, loadScript, unloadScript, _fetch, putFocus, uniqueBy, deepAsign}

