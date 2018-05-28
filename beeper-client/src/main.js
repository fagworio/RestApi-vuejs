// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Router from './routes';
import VueResource from 'vue-resource';
import Auth from './plugins/Auth';
import Store from './store.js';

Vue.use(VueResource);
Vue.use(Auth);

//Configure alertify defaults
alertify.defaults.notifier.position = "top-right";

Vue.http.interceptors.push(function(request,next){
	if (request.url[0] === '/') {
		request.url = process.env.API + request.url;
		
		var token = Vue.auth.getToken();
		if (token)
			request.headers.set('Authorization', 'Bearer ' + token)		
	}
	next(function(response) {
		if (response.status == 422) {
			response.body.errors.forEach(function (alert) {
				alertify.error(alert);
			});
		}
	});	
});

//Configure route guards
Router.beforeEach(function(to, from, next){
	//Prevent access to 'requiresGuest' routes.
	if (to.matched.some(function (record) { return record.meta.requiresGuest })
		&& Vue.auth.loggedIn()) 
	{
		next({
			path: '/newsfeed'
		});
	} 
	else if (to.matched.some(function (record) { return record.meta.requiresAuth })
		&& !Vue.auth.loggedIn()) 
	{
		next({
			path: '/auth/login',
			query: { redirect: to.fullPath }
		});
	}
	else {
		next(); //Make sure to aways call next() 
	}
});

/* eslint-disable no-new */
new Vue({
  	el: '#app',
  	router: Router,
	store: Store,
  	template: '<App/>',
  	components: { App }
})
