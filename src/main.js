import Vue from 'vue';
import { Table, TableColumn } from 'element-ui';
import App from './App.vue';
import router from './router';


// elementUI

Vue.use(Table);
Vue.use(TableColumn);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
