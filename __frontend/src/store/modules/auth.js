import router from '../../router'

/*
 * Store for account
 */
const state = {
  account: false
}

// getters
const getters = {
  account: state  => state.account,
  token:   state  => state.account.logged && state.account.logged > Date.now() ? state.account.token : router.push('/login'),
  username: state => state.account.user_login,
  role: state => state.account.role,
  terminal: state => state.account.terminal
}

// actions
const actions = {
  account ( context, val ) {
    //console.log(val.lang)
    if(val) // token expire
      val.logged = Date.now() + 60*60*12*1000
    
    // change language
    if( val.lang.length > 0 ) document.documentElement.lang = val.lang.toLowerCase().replace('_','-').trim()


    // Overload account
    // val = Object.assign( { app_config: {
    //   material: false
    // } }, val)

    // if( SETTINGS.APP_CONNECT_BROKER ) {
    //   getBrokerConfig(val.token, (res)=> {
    //     if( !res.error) context.commit('broker', res)
    //   })
    // }
    context.commit('account', val)

  },
  disconnect (context, val){
    context.commit('account', false)
  },
  terminal ( context, val){
    context.commit('terminal', val)
  }


}

// mutations
const mutations = {
  account:  (state, val) => state.account = val,
  terminal: (state, val) => state.account.terminal = val
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}