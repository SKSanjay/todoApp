describe("Password Controller", function() {
  var controller;

  beforeEach(module('mainApp'));

  beforeEach(inject(function($controller) {
    scope = {};
    controller = $controller("MainController", {});
  }));

  describe('Addition Tests', function(){

    it('should be defined', function(){
      expect(controller).toBeDefined();
      expect(controller.test).toBeDefined();
    });

  });


});