// App

angular.module('app', ['firebase'])
  .config(config)
  .service('firebase', firebase)
  .controller('ViewController', ViewController);


// Config

function config($compileProvider) {
  $compileProvider.debugInfoEnabled(false);
}

config.$inject = ['$compileProvider'];


// Firebase

function firebase($q, $firebaseObject) {
  function get() {
    return new $q(function(resolve) {
      var ref = new Firebase('https://rpi-name-badge.firebaseio.com/');
      var obj = $firebaseObject(ref);
      resolve(obj);
    });
  }

  return { get: get };
}

firebase.$inject = ['$q', '$firebaseObject'];


// View controller

function ViewController(firebase) {
  var vm = this;

  firebase.get().then(function(data) {
    vm.data = data;
  });
}

ViewController.$inject = ['firebase'];
