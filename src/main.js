import Vue from 'vue';
import {
  Dropdown, DropdownMenu, DropdownItem,
  Table, TableColumn, Form, FormItem, Input, Button, Option, Select, Message, Loading,
  DatePicker, TimePicker, Card,
} from 'element-ui';
import App from './App.vue';
import router from './router';


// elementUI

Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Option);
Vue.use(Select);
Vue.use(DatePicker);
Vue.use(TimePicker);
Vue.use(Card);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
