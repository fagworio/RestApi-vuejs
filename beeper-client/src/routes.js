import Vue from 'vue';
import Router from 'vue-router';
import Auth from './components/auth/Auth';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Newsfeed from './components/dash/Newsfeed';
import Dash from './components/dash/Dash';
import Profile from './components/dash/Profile';
import Settings from './components/dash/Settings';

Vue.use(Router);

var router = new Router({
    routes: [
        {
            path: "/",
            component: Dash,
            redirect: '/newsfeed',
            children: [
                {
                    path: 'newsfeed',
                    component: Newsfeed,
                    meta: { requiresAuth: true }
                },
                {
                    path: 'profile/:username',
                    component: Profile
                },
                {
                    path: 'settings',
                    component: Settings,
                    meta: { requiresAuth: true }
                }
            ]
        },
        {
            path: "/auth",
            component: Auth,
            redirect: "/auth/register",
            children: [
                {
                    path: "login",
                    component: Login,
                    meta: { requiresGuest: true }
                },
                {
                    path: "register",
                    component: Register,
                    meta: { requiresGuest: true }
                }
            ]
        }
]
});

export default router;