import Vue from 'vue'
import App from './Propaganda.vue'
import '../../lib/tools/rem.js'
import '../../lib/css/reset.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
