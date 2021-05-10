import axios from 'axios'
import SETTINGS from '../settings'

export default {
    items: [
        {
            slug: 'terminal',
            icon: 'pi-android',
            pattern: '^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$',
            disabled: true,
            to: '/steps/step',
            command: (...args) => args[1]('auth/terminal', args[0] ),
            submit: (...args) => {
                window.mitt.emit('steps:spinner', '#555')
                axios.post( SETTINGS.APP_SCANLESS_PROTOCOL + '://' + args[0] + ':' + SETTINGS.APP_SCANLESS_PORT, {
                    "method": "getVersion",
                    "id": 2,
                    "jsonrpc": "2.0"
                })
                .then( response => {
                    window.mitt.emit('steps:spinner', 'transparent')
                    window.mitt.emit('steps:step', {
                        slug: 'terminal',
                        value: args[0]
                    })
                })
                .catch( e => window.mitt.emit('steps:spinner', false))
            },
            mount: (...args) => {
                if( args[1].auth.account.terminal )
                    window.mitt.emit('steps:value', args[1].auth.account.terminal)
                else {
                    axios.post( SETTINGS.APP_SCANLESS_PROTOCOL + '://127.0.0.1:' + SETTINGS.APP_SCANLESS_PORT, {
                        "method": "getVersion",
                        "id": 2,
                        "jsonrpc": "2.0"
                    })
                    .then( response => window.mitt.emit('steps:step', {
                        slug: 'terminal',
                        value: '127.0.0.1'
                    }))
                }
            }
        },{
            slug: 'step',
            icon: 'pi-directions',
            disabled: true,
            to: '/steps/test'
        },{
            slug: 'test',
            icon: 'pi-shopping-cart',
            disabled: true,
            to: '/'
        }
    ]
};