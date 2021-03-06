angular.module('todoApp')
  .controller('TodoController', ['$scope', '$http', 'Todos', 'moment', function($scope, $http, Todos, moment) {

    var vm = this;

    //Function calc avg	
    vm.calculateAverage = function(inputValue) {
      var sum = 0;

      if(inputValue.length == 0 || inputValue === undefined){
        //do nothing
      }else{
        for (var i = 0; i < inputValue.length; i++) {
          sum += parseInt(inputValue[i].difficulty, 10); //don't forget to add the base 
        }
        var avg = sum / inputValue.length;
        return avg;
      }
    };

    //Init: Page load info
    vm.date = moment().format('DD-MM-YYYY');
    vm.loading = true;

    //formData: Todo init
    vm.formData = {};
    vm.formData.tags;
    vm.formData.difficulty = 3;

    //Invert edit state
    vm.invertEdit = function(todo){
      //console.log('hello');
      console.log(todo);
      if(todo === false){
        todo = true;
      }
      else{
        todo = false;
      }

    }

    //Init: Datepicker
    vm.datePicker = {};

    //Init datePicker format
    var startDateMoment = moment().subtract(1, "days").format('DD-MM-YYYY');
    var endDateMoment = moment().format('DD-MM-YYYY');
    
    //Issue with this property for some reason
    vm.datePicker.date = {
      startDate: moment().subtract(1, 'days'),
      endDate: moment()
    };

    vm.options = {
      locale: {
        applyLabel: "Apply",
        fromLabel: "From",
        format: "DD/MM/YYYY", //will give you 2017-01-06
        toLabel: "To",
        cancelLabel: 'Cancel',
        customRangeLabel: 'Custom range'
      },
      ranges: {
        'Yesterday': [moment().subtract(1, 'days'), moment()],
        'Last 2 Days': [moment().subtract(2, 'days'), moment()],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 14 Days': [moment().subtract(14, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()]
      },
      eventHandlers:{
        'apply.daterangepicker': function(ev, picker){
          // console.log(ev.model.startDate.toISOString());
          // console.log(ev.model.endDate.toISOString()); 
          Todos.getDateBased(ev.model.startDate.toISOString(), ev.model.endDate.toISOString())
            .then(function(data) {
              vm.todos = data.data;
              vm.loading = false;
              console.log(data);
            });

        }
      }
    }

    //Search init (dummy data)
    vm.availableSearchParams = [{
      key: "emailAddress",
      name: "E-Mail",
      placeholder: "E-Mail...",
      allowMultiple: true
    }];

    // GET =====================================================================
    // when landing on the page, get all todos and show them
    // use the service to get all the todos
    Todos.get()
      .then(function(data) {
        vm.todos = data.data;
        vm.loading = false;
        console.log(data);
      });

    // CREATE ==================================================================
    // when submitting the add form, send the text to the node API
    vm.createTodo = function(formData) {

      console.log('Controller :' + formData);
      console.log('Controller :' + formData.text);
      console.log('Controller :' + formData.tags);
      console.log('Controller :' + formData.difficulty);

      // validate the formData to make sure that something is there if form is empty, nothing will happen
      if (formData.text != undefined) {
        vm.loading = true;
        // call the create function from our service (returns a promise object)
        Todos.create(formData)
          // if successful creation, call our get function to get all the new todos
          .then(function(data) {
            vm.loading = false;
            vm.formData = {}; // clear the form so our user is ready to enter another
            vm.todos = data.data; // assign our new list of todos
          });
      }
    };

    //complete todo
    // vm.completeTodo = function(id, bool) {
    //   vm.loading = true;
    //   console.log(id);
    //   console.log(bool);
    //   // call the update function from our service (returns a promise object)
    //   Todos.completeTodo(id, bool)
    //     // if successful creation, call our get function to get all the new todos
    //     .then(function(data) {
    //       vm.loading = false;
    //       vm.formData = {}; // clear the form so our user is ready to enter another
    //       vm.todos = data.data; // assign our new list of todos
    //     });
    // };

    vm.completeTodo = function(id, bool) {
      console.log('Controller :' + id, bool);
    }

    // UPDATE ==================================================================
    //when submitting the add form, send the text to the node API
    vm.updateTodo = function(todo, id) {
      console.log('Controller :' + todo);
      console.log('Controller :' + id);
      // call the create function from our service (returns a promise object)
      Todos.updateTodo(todo, id)
        // if successful creation, call our get function to get all the new todos
        .then(function(data) {
          vm.loading = false;
          vm.formData = {}; // clear the form so our user is ready to enter another
          vm.todos = data.data; // assign our new list of todos
        });
    };

    // vm.updateTodo = function(todo){
    //   console.log('blah');
    //   console.log(todo);
    // };


    // DELETE ==================================================================
    // delete a todo after checking it
    vm.deleteTodo = function(id) {
      vm.loading = true;
      Todos.delete(id)
        // if successful creation, call our get function to get all the new todos
        .then(function(data) {
          vm.loading = false;
          vm.todos = data.data; // assign our new list of todos
        });
    };
  }]);