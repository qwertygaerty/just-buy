import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import {localeRu} from "@/assets/helpers/locale";

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Menubar from "primevue/menubar";
import BlockUI from 'primevue/blockui';
import Password from "primevue/password";
import Tooltip from 'primevue/tooltip';
import Message from "primevue/message";

import './assets/css/main.css';
import 'primevue/resources/themes/mdc-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';


const app = createApp(App);

app.component('InputText', InputText);
app.component('Button', Button);
app.component('Menubar', Menubar);
app.component('Password', Password);
app.component('BlockUI', BlockUI);
app.component('Message', Message);

app.directive('tooltip', Tooltip);


app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
    ripple: true, locale: localeRu
},);

app.mount('#app')
