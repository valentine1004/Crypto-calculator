import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Calculator from './components/Calculator.vue'
import Markets from './components/Markets.vue'

Vue.use(VueResource)
Vue.use(VueRouter)

const router = new VueRouter({
	routes: [
     {path: '/markets', component: Markets},
     {path: '/', component: Calculator}
	],
	mode: 'history'
})
var eventBus = new Vue();
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
