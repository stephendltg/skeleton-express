import SETTINGS from '../settings'

/*
 * Global api to wordpress
 */

/*
 * GET
 */
function get( token = '', url, callback, options = {} ){

  options = Object.assign( { 
    method: 'GET', 
    headers: { 
      'Authorization': 'Basic ' + token, 
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    } 
  }, options )
  // Get Api Uri
  url = localStorage.getItem('api_uri') !== null ? localStorage.getItem('api_uri') + url : url;

  // console.log(url, options)

  // fetch( url, options).then( res => res).then( data => console.log(data))
  fetch( url, options)
    .then( response => response.status === 200 || response.status === 201 ? ( response.headers.get("content-type").indexOf("application/json") !== -1 ? response.json() : { error: 'content-type' } ) : { error: response.status } )
    .then( data => typeof callback === 'function' ? callback(data) : console.log(data) )
    .catch( (e) => typeof callback === 'function' ? callback({ error: e }) : console.error('Error', e) )

}


/*
 * Get token
 */
export function getToken ( username, password, callback ) {

  let token = btoa(username + ':' + password)

  get( token, SETTINGS.API_BASE_PATH + 'token', callback )
}

/*
 * Get Broker Config
 */
export function getBrokerConfig ( token, callback ) {

  get( token, SETTINGS.API_BASE_PATH + 'emqx', (data) => {
    // return
    return typeof callback === 'function' ? callback(data) : console.log(data)
  })
}

/*
 * Get Broker customer
 */
export function getBrokerCustomer ( token, callback ) {

  get( token, SETTINGS.API_BASE_PATH + 'emqx/clients', (data) => {
    // return
    return typeof callback === 'function' ? callback(data) : console.log(data)
  })
}



/*
 * Export Default
 */
export default {

  getToken( username, password, callback ){
    return getToken(username, password, callback)
  },
  getBrokerConfig( token, callback){
    return getBrokerConfig( token, callback)
  },
  getBrokerCustomer( token, callback){
    return getBrokerCustomer( token, callback)
  }

};
