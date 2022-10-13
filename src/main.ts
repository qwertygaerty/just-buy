import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import './assets/css/main.css';

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Menubar from "primevue/menubar";

import 'primevue/resources/themes/mdc-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';


const app = createApp(App);

app.component('InputText', InputText);
app.component('Button', Button);
app.component('Menubar', Menubar);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, {ripple: true});

app.mount('#app')
