import Vue from 'vue';
import Router from 'vue-router';
import SelectUser from './../components/SelectUser';
import Dashboard from './../components/Dashboard';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'select',
            component: SelectUser,
        },
        {
            path: '/dashboard/:username',
            name: 'dashboard',
            component: Dashboard,
        },
    ],
});
