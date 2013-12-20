'use strict';
var App = Ember.Application.create();

console.log('started');
App.Router.map(function() {
    this.resource('about');
});
