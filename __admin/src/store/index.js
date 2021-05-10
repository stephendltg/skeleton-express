import { createStore } from 'vuex'
import auth from './modules/auth'
import mqtt from './modules/mqtt'
import scanless from './modules/scanless'
import SETTINGS from './../settings'


/* PLUGINS LOCALSTORAGE */
const localstoragePlugin = store => {
    
  // called when the store is initialized
  store.subscribe((mutation, state) => {
    if( !SETTINGS.LOCALSTORAGE ) localStorage.setItem(SETTINGS.DBNAME, JSON.stringify( { auth: state.auth } ))
    else localStorage.setItem(SETTINGS.DBNAME, JSON.stringify(state))
  })
}

const debug = SETTINGS.DEV

export const store = createStore({
  plugins: [localstoragePlugin],
  modules: {
    auth, mqtt, scanless
  },
  strict: debug,
  state: {
  },
  mutations: {

    initialiseStore(state){

      // Check if the ID exists
      if(localStorage.getItem(SETTINGS.DBNAME)) {
        // Remplace l'état de l'objet du store
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem(SETTINGS.DBNAME)))
        )
      }
    }
  },
  actions: {
  }
})
