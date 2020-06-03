import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Import Bootstrap
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'

// Import Fontawesome
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faShoppingBasket, faPlusCircle, faMinusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import VModal from 'vue-js-modal'
Vue.use(VModal)

dom.watch()
Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faShoppingBasket, faPlusCircle, faMinusCircle, faTrashAlt)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
