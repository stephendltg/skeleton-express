import axios from 'axios'
import { deepAsign} from '../plugins/i18n'

/*
 * Global api to epyo scanless
 */

const methods = new Map()

 /*
 * EPYO SCANLESS - template
 */
methods.set('status', {
  method: 'status',
  params: 'test'
})

methods.set('getVersion', {
  method: 'getVersion'
})

methods.set('getConfig', {
  method: 'getConfig'
})

/* 
 * List events if mqtt disconnect
 */
methods.set('isBacklog', {
  method: 'isBacklog'
})

methods.set('getBacklog', {
  method: 'getBacklog'
})

/* 
 * Filter list
 * beacons (whiteList / blackList)
 */
methods.set('getLists', {
  method: 'getLists'
})

methods.set('eraseLists', {
  method: 'setLists',
  params: {
    list: []
  }
})

methods.set('whiteList', {
  method: 'setLists',
  params: {
    list: [{
      "name": "white",
      "beacons": [""],
      "rx": null,
      "type": "white"
    }]
  }
})

methods.set('blackList', {
  method: 'setLists',
  params: {
    list: [{
      "name": "black",
      "beacons": [""],
      "rx": null,
      "type": "black"
    }]
  }
})

/* 
 * Fences
 */
methods.set('getCurrentFences', {
  method: 'getCurrentFences'
})

methods.set('getFences', {
  method: 'getFences'
})

methods.set('setFences', {
  method: 'setFences',
  params: {
    store: false,
    todo: {
        Sender: "WebAdmin",
        Name: "name",
        Fences: [
          {
            Message: "",      // <string>
            Name: "",         // <string>
            Id: "",           // <string>
            BeaconsId: [""],  // <address mac> beacon ex: AC:23:3F:58:AB:DF
            Duration: 1,      // <integer>
            Active: true,     // <bool>
            Status: 0,        // <integer>
            rank: 0,          // <integer> use for todo list fence
            Type: 2,          // <integer> 1 to 5
            XOR: false        // <bool> fence type OR || AND if multi BeaconsId
            // rx: -55,          // <integer>
            // trackedData: {}   // <object>
          }
        ]
    }
  }
})

methods.set('eraseLocalFences', {
  method: 'setFences',
  params: {
    store: true,
    todo: {
        Sender: "WebAdmin",
        Name: "name",
        Fences: []
    }
  }
})

methods.set('setLocalFences', {
  method: 'setFences',
  params: {
    store: true,
    todo: {
        Sender: "WebAdmin",
        Name: "name",
        Fences: [
          {
            Message: "",     // <string> 
            Name: "",        // <string> 
            Id: "",          // <string> 
            BeaconsId: [""], // <address mac> beacon ex: AC:23:3F:58:AB:DF
            Duration: 1      // <integer> 
          }
        ]
    }
  }
})

methods.set('activateLocalFences', {
  method: 'setFences',
  params: {
    store: false,
    todo: {
        Sender: "WebAdmin",
        Name: "name",
        Fences: [
          {
            fenceId: "",  // <string>
            Active: true  // <bool>
          }
        ]
    }
  }
})

/* 
 * Direct passage
 */
methods.set('getDirectPass', {
  method: 'getDirectPass'
})

methods.set('setDirectPass', {
  method: 'setDirectPass',
  params: {
    list: [
        {
          idbeacon: "",  // <address mac> beacon ex: AC:23:3F:58:AB:DF
          message: ""    // <string>  
        }
    ]
  }
})

/* 
 * Picker ( for user actions )
 */
methods.set('getPickers', {
  method: 'getPickers'
})

methods.set('erasePickers', {
  method: 'setPickers',
  params: {
    component: "beacons",
    list: []
  }
})

methods.set('setPickers', {
  method: 'setPickers',
  params: {
    component: "beacons",
    list: [
      {
        desc: "", // <string>
        label: "" // <address mac> beacon ex: AC:23:3F:58:AB:DF
      }
    ]
  }
})


/*
 * EPYO SCANLESS - PUSH
 *
 * ex data:
 * {
 *    method: 'setPickers',
 *    params: {
 *      list: [
 *        { desc: '001', }
 *      ]
 *    }
 * }
 * 
 * params -> component est omis car deepAsign
 */
export function pushScanless( url , data = {}, callback ){
  if( methods.has(data.method) ) {
    let method = data.method
    delete data.method
    data = deepAsign(methods.get(method), data)
  }
  
  axios.post( url, { ...data, ... { id: 2, jsonrpc: '2.0'} } )
    .then( data => typeof callback === 'function' ? callback(data) : console.log(data) )
    .catch( err => typeof callback === 'function' ? callback({ error: err }) : console.error('Error', err) )
}

/*
 * Export Default
 */
export default {

    pushScanless( url, data, callback ){
        return pushScanless( url, data, callback  )
    }

  
};
