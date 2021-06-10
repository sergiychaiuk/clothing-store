require('./bootstrap');

import Vue from 'vue';
import vuetify from './vuetify';
import Nl2br from 'vue-nl2br';
import '@mdi/font/css/materialdesignicons.css';
import 'es6-promise/auto';
import axios from 'axios';
import VueAuth from '@websanova/vue-auth';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';
import auth from './auth';
import router from './router';
import VueProgressBar from 'vue-progressbar';

window.Vue = require('vue').default;

Vue.router = router;
Vue.use(VueRouter);

Vue.use(VueAxios, axios);
axios.defaults.baseURL = `http://127.0.0.1:8000/api`;
Vue.use(VueAuth, auth);

Vue.component('index', require('./Index.vue').default);
Vue.component('nl2br', Nl2br);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

const options = {
    color: '#bffaf3',
    failedColor: '#874b4b',
    thickness: '5px',
    transition: {
        speed: '0.2s',
        opacity: '0.6s',
        termination: 300
    },
    autoRevert: true,
    location: 'left',
    inverse: false,
};

Vue.use(VueProgressBar, options);

const app = new Vue({
    el: '#app',
    vuetify,
    router,
    icons: {
        iconfont: 'mdi',
    },
});
