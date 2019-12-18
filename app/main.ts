import Vue from 'nativescript-vue';
import firebase from 'nativescript-plugin-firebase';
import { TNSFontIcon, fonticon } from 'nativescript-fonticon';
import App from './components/App';
import store from './store';

import './app.scss';

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production');

firebase
  .init({
    // Optionally pass in properties for database, authentication and cloud messaging,
    // see their respective docs.
  })
  .then(
    instance => console.log('firebase.init done'),
    error => console.log(`firebase.init error: ${error}`)
  );

//TNSFontIcon.debug = true;
TNSFontIcon.paths = {
  fa: './assets/font-awesome.css',
};
TNSFontIcon.loadCss();

Vue.filter('fonticon', fonticon);

Vue.registerElement('SwipeLayout', () => require('nativescript-swipe-layout').SwipeLayout);
Vue.registerElement('CardView', () => require('nativescript-cardview').CardView);
Vue.registerElement('RadSideDrawer', () => require('nativescript-ui-sidedrawer').RadSideDrawer);

Vue.prototype.$firebase = firebase;

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = TNS_ENV === 'production';

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()
