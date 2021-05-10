import { createApp } from 'vue'
import App from './App.vue'
import {store} from './store'
import router from './router'
import mitt from 'mitt'

// console.table({
//     env: process.env.NODE_ENV, 
//     dev: import.meta.env.DEV,
//     baseURL: import.meta.env.BASE_URL,
//     mode: import.meta.env.MODE, 
//     prod: import.meta.env.PROD
// })


// Instance mitt
window.mitt = window.mitt || new mitt()

import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Divider from 'primevue/divider';
import Avatar from 'primevue/avatar';
import Message from 'primevue/message';
import Card from 'primevue/card';
import Badge from 'primevue/badge';
import Dialog from 'primevue/dialog';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import PanelMenu from 'primevue/panelmenu';

import 'primevue/resources/themes/md-dark-indigo/theme.css';
// import 'primevue/resources/themes/md-light-indigo/theme.css';
// import 'primevue/resources/themes/md-dark-deeppurple/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

// Upload persitent store
store.commit('initialiseStore');

const app = createApp(App)

app.use(store)
app.use(router)

app.use(PrimeVue, {
    ripple: true
});
app.use(ToastService);

app.component('InputText', InputText);
app.component('Button', Button);
app.component('Toast', Toast);
app.component('Divider', Divider);
app.component('Avatar', Avatar);
app.component('Message', Message);
app.component('Card', Card);
app.component('Badge', Badge);
app.component('Dialog', Dialog);
app.component('TabView', TabView);
app.component('TabPanel', TabPanel);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('PanelMenu', PanelMenu);

router.isReady().then( () => app.mount('#app') )

