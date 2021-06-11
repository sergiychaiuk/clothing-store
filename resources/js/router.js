import VueRouter from 'vue-router';

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";

const routes = [
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
            auth: undefined,
        },
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            auth: false,
        },
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            auth: false,
        },
    },
    {
        path: '/account',
        name: 'account',
        component: Account,
        meta: {
            auth: {roles: 1, redirect: { name: 'home' }},
        },
    },
    {
        path: '/404',
        name: '404',
        component: NotFound,
        meta: {
            auth: undefined,
        },
    },
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '*',
        redirect: '/404',
    },
];

const router = new VueRouter({
    history: true,
    mode: 'history',
    routes,
});

export default router;
