
# EPYO MODEL VUEJS/VITEJS

ref: https://vitejs.dev/

---

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run prod (path to configure)
npm run build
```

### Update package.json
Do backup package.json before!

```
npm run update
```

### Customize configuration
vite.config.js

---

# ICON GENERATOR ( if necessary )

./src/assets/logo.png (512x512)

```
npm run icons
```

----

# MITT

```
import mitt from 'mitt'
 
const emitter = mitt()
 
// listen to an event
emitter.on('foo', e => console.log('foo', e) )
 
// listen to all events
emitter.on('*', (type, e) => console.log(type, e) )
 
// fire an event
emitter.emit('foo', { a: 'b' })
 
// clearing all events
emitter.all.clear()
 
// working with handler references:
function onFoo() {}
emitter.on('foo', onFoo)   // listen
emitter.off('foo', onFoo)  // unlisten
```

---

# NVM 
// check version
node -v || node --version

// list installed versions of node (via nvm)
nvm ls

// install specific version of node
nvm install 14.15.4

// set default version of node
nvm alias default 14.15.4

// switch version of node
nvm use 14.15.4

----

# INITIALIZE
{
  "name": "epyo",
  "version": "1.0.0",
  "scripts": {
    "build": "vite build --mode production",
    "prod": "vite build --base=/apps/epyo/ --mode production",
    "dev": "vite --mode dev",
    "update": "npx npm-check-updates -u",
    "icons": "npx vue-pwa-asset-generator -a ./src/assets/logo.png -o ./public/icons"
  },
  "dependencies": {
    "axios": "^0.20.0",
    "mitt": "^2.1.0",
    "primeflex": "^2.0.0",
    "primeicons": "^4.1.0",
    "primevue": "^3.2.0-rc.1",
    "vue": "^3.0.5",
    "vue-router": "^4.0.2",
    "vuex": "^4.0.0-rc.2"
  },
  "devDependencies": {
    "@vue/compiler-sfc": "^3.0.5",
    "sass": "^1.26.11",
    "vite": "^1.0.0-rc.4"
  }
}