import landing from './components/Landing';
import loginRegister from './components/Login&Register.vue';
import Home from './components/Page.vue'

export default [
    { path: '/', component: landing},
    { path: '/R&L', component: loginRegister},
    { path: '/Home', component: Home},
]