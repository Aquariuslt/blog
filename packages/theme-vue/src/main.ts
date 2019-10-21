import Vue from 'vue';
import VueMeta from 'vue-meta';
import VueDisqus from 'vue-disqus';
import App from './App.vue';

import router from './router';

import './plugins/material';
import './offline';

Vue.config.productionTip = false;

Vue.use(VueMeta);
Vue.use(VueDisqus);

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app');
