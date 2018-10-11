import Vue from 'vue';
import App from './App';
import router from './router';
import Api from './api';
import env from './../env';

import './icons';
import './scss/main.scss';

Vue.config.productionTip = false;

Vue.prototype.$api = new Api(env.SERVER_PATH, env.GIPHY_TOKEN);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
});

