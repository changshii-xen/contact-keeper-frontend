import Vue from 'vue'
import App from './App.vue'
import Routes from './routes'
import VueRouter from 'vue-router'
import SuiVue from 'semantic-ui-vue';
import 'semantic-ui-css/semantic.min.css';
import './registerServiceWorker'

Vue.use(VueRouter);
Vue.use(SuiVue);
Vue.config.productionTip = false

// Register routes
const router = new VueRouter({
  routes: Routes,
  mode: 'history'
});

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
