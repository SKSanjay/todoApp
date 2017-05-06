(function() {
'use strict';

  angular
    .module('mainApp')
    .controller('MainController', MainController);

  MainController.inject = ['$http'];
  function MainController($http) {
    var vm = this;

    vm.test = 'DANGER';
    
    activate();

    function activate() { 
      console.log('HELLO'); 
    }
  }
})();