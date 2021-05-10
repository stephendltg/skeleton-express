import SETTINGS from '../../settings'
import {pushScanless} from '../../api/scanless.js'


// Parse message
const parseMessage = ( msg) => {
  try{
    return JSON.parse(msg)
  } catch(e) {
    return msg
  }
}

const scanless = (connexion, commit ) => {

  let subscribe = SETTINGS.APP_SCANLESS_TOPIC.map( x => x = x + '/' )

  if (typeof (EventSource) !== 'undefined') {

    if( state.scanless ) state.scanless.close()

    state.scanless = new EventSource( SETTINGS.APP_SCANLESS_PROTOCOL + '://'+ connexion + ':' + SETTINGS.APP_SCANLESS_PORT + '/sse');

    state.scanless.onerror = (e) => {
      commit('alarms', 'Scanless error')
      commit('status', false)
      // state.scanless.close()
      // setTimeout( () => scanless(connexion, commit), 3000 )
    }
	    
    state.scanless.onopen = (e) => {
      commit('status', true)
    };

    state.scanless.onmessage = (event) => {

      if( event.data ) {
        let data = parseMessage(event.data);
        if( data.hasOwnProperty('Payload') && subscribe.includes(data.Topic) ){
          window.mitt.emit( 'scanless:' + data.Topic.split('/')[0], data.Payload)
          window.mitt.emit( 'scanless:#', { topic: data.Topic.split('/')[0], message: data.Payload} )
          if( SETTINGS.APP_SCANLESS_STORE_MESSAGES ) commit('messages', { topic: data.Topic.split('/')[0], message: data.Payload})
        }

      }
    }

  }
}

/*
 * Store for scanless
 */
const state = {
  scanless: null,  
  messages: [],
  alarms: null,
  status: false
}

// getters
const getters = {
    scanless: state => state.scanless,
    messages: state  => state.messages,
    alarms: state => state.alarms,
    status: state => state.status
}

// actions
const actions = {

  connect( { commit, dispatch, rootGetters} ){

    const terminal = rootGetters['auth/terminal'] || '127.0.0.1'

    if( SETTINGS.APP_SCANLESS ) {
      scanless(terminal, commit)
    }

  },
  disconnect( context ){
    if( SETTINGS.APP_SCANLESS && state.scanless ) state.scanless.close()
    context.commit('messages')
    context.commit('alarms')
  },
  messages ( context, val ) {
    context.commit('messages', val)
  },
  alarms( context, val ){
    context.commit('alarms', val)
  },
  status( context, val ){
    context.commit('status', val)
  },
  publish( { commit, dispatch, rootGetters}, val ){
    const terminal = rootGetters['auth/terminal'] || '127.0.0.1'
    pushScanless(SETTINGS.APP_SCANLESS_PROTOCOL + '://'+ terminal + ':' + SETTINGS.APP_SCANLESS_PORT, val, (res)=> {
      if( res.data.error ) commit('alarms', JSON.stringify(res.data.error))
      else  window.mitt.emit('scanless:#', {topic: val.method, message: res.data.result})
      console.log(res.data)
    })
      
  }
}

// mutations
const mutations = {
    alarms:     (state, val) => { 
      if(val !== null) {
        state.alarms = val
      } else { 
        state.alarms = null
      }
    },
    messages:   (state, val) => val !== null ? state.messages.unshift(val) : state.messages = [],
    status:     (state,val)  => state.status = val
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}