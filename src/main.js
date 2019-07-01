import Vue from 'vue';
import {
  Table, TableColumn, Form, FormItem, Input, Button, Option, Select, Message,
  DatePicker, TimePicker,
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

Vue.prototype.$message = Message;

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
