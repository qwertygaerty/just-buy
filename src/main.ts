import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Menubar from "primevue/menubar";

import './assets/css/main.css';
import 'primevue/resources/themes/mdc-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import Password from "primevue/password";
import {localeRu} from "@/assets/helpers/locale";

const app = createApp(App);

app.component('InputText', InputText);
app.component('Button', Button);
app.component('Menubar', Menubar);
app.component('Password', Password);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
    ripple: true, locale: localeRu
},);

app.mount('#app')
