import {getBrokerConfig} from '../../api/index.js'
import SETTINGS from '../../settings'
import {loadScript, unloadScript} from '../../plugins/i18n'


// Parse message
const parseMessage = ( msg) => {
    try{
      return JSON.parse(msg)
    } catch(e) {
      return msg
    }
}

// Connection broker
const broker = ( connexion, options, commit ) => {
    loadScript( './js/mqtt.js')
    .then( () => {
        state.broker = mqtt.connect('ws://' + connexion.ip + ':' + connexion.port + '/mqtt', options)
        state.broker.on('reconnect' , () => commit('alarms', 'Broker reconnect') )
        state.broker.on('offline'   , () => commit('alarms', 'Broker offline') )
        // state.broker.on('close'     , () => commit('alarms', 'Broker connection close') )
        state.broker.on('error'     , () => commit('alarms', 'Broker error') )

        state.broker.on('message', (topic, message) => { 
            message = parseMessage(message)
            topic        = topic.split('/');
            let subTopic = topic.slice(1).join('/');
            topic        = topic[0];
            window.mitt.emit('mqtt:' + topic, {
                subTopic: subTopic,
                message: message
            })
            window.mitt.emit('mqtt:#', {
              topic: topic,
              subTopic: subTopic,
              message: message
          })
            // use in component VUE
            // mounted(){
            //    window.mitt.on('mqtt:invite', (data) =>  console.log(data) )
            // },
            // beforeUnmount(){
            //   this.$store.dispatch('invite')
            // }
            if( SETTINGS.APP_BROKER_STORE_MESSAGES ) commit('messages', { topic: topic, subTopic: subTopic, message: message})
        })

        state.broker.on('connect', () =>{
            
            let subscribe = SETTINGS.APP_BROKER_TOPIC.map( x => x = x.replace(/%u/g, options.recipient).replace(/%r/g, options.role) )
            
            state.broker.subscribe( subscribe.concat([options.recipient + '/#']) , (err) => { 
                if(!err) commit('status', true)
                else     commit('status', false)
            })

            state.publish.map( val => {
              state.broker.publish( val[0], val[1] ? JSON.stringify(val[1]): JSON.stringify(), val[2] || {} ) 
            })
            commit('publish')
        })
    })
    .catch( e => commit('alarms', 'Mqtt library not loaded') )
}

/*
 * Store for mqtt
 */
const state = {
  broker: null,  
  messages: [],
  alarms: null,
  status: false,
  publish: [] //[ ['invite/78', '7877'] ]
}

// getters
const getters = {
    broker: state => state.broker,
    messages: state  => state.messages,
    alarms: state => state.alarms,
    status: state => state.status,
    publish: state => state.publish
}

// actions
const actions = {

  connect( { commit, dispatch, rootGetters} ){

    const token     = rootGetters['auth/token']
    const username  = rootGetters['auth/username']
    const role      = rootGetters['auth/role']

    if( SETTINGS.APP_BROKER_CONNECT ) {
        getBrokerConfig(token, (res)=> {
            if( !res.error) broker(res, {
                clean: true,
                keppalive: 60,
                connectTimeout: 4000,
                reconnectPeriod: 5000,
                clientId: username.toLowerCase() + '_' + Math.random().toString(16).substr(2, 8),
                recipient: username.toLowerCase(),
                role: role
            }, commit)
        })
    }

  },
  disconnect( context ){
    if( SETTINGS.APP_BROKER_CONNECT && state.broker ) state.broker.end()
    unloadScript( './js/mqtt.js')
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

  /*
   * Publish
   * $store.dispatch('mqtt/publish', [topic, message, options])
   */
  publish( context, val){
    if( state.status )
      state.broker.publish( val[0], val[1] ? JSON.stringify(val[1]): JSON.stringify(), val[2] || {} )
    else
      context.commit('publish', val)
  }
}

// mutations
const mutations = {
    alarms:     (state, val) => { 
      if(val != null) {
        state.alarms = val
        state.status = false
      } else { 
        state.alarms = null
      }
    },
    messages:   (state, val) => val !== null ? state.messages.unshift(val) : state.messages = [],
    status:     (state, val) => state.status = val,
    publish:    (state, val) => val !== null ? state.publish.push(val) : state.publish = []
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}