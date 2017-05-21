angular.module('todoApp')

	.controller('TodoController', ['$scope','$http','Todos', function($scope, $http, Todos) {

		//Function calc avg	
		$scope.calculateAverage = function(MyData){ 
			var sum = 0; 
			for(var i = 0; i < MyData.length; i++){
					sum += parseInt(MyData[i].difficulty, 10); //don't forget to add the base 
			}

			var avg = sum/MyData.length;

			return avg; 
		};

		//Init: Page load info
    $scope.date = moment().format('DD-MM-YYYY');
    $scope.loading = true;
		$scope.todoDoc = {};


    //Init: Todo (They should be date objects)
    $scope.todoDoc.dateCreated ="1/1/2017";
    $scope.todoDoc.dateModified ="2/2/2018";
    $scope.todoDoc.dateCompleted ="3/3/2019";

    //Init: Datepicker
		$scope.datePicker = {};
		//Issue with this property for some reason
		$scope.datePicker.date = {
			startDate: null,
			endDate: null
    };

		//Search init (dummy data)
		$scope.availableSearchParams = [
      { key: "emailAddress", name: "E-Mail", placeholder: "E-Mail...", allowMultiple: true }
    ];

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Todos.get()
			.then(function(data) {
				$scope.todos = data.data;
				$scope.loading = false;
				console.log(data);
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Todos.create($scope.formData)

				// if successful creation, call our get function to get all the new todos
				.then(function(data) {
					$scope.loading = false;
					$scope.formData = {}; // clear the form so our user is ready to enter another
					$scope.todos = data.data; // assign our new list of todos
				});
			}
		};

		// UPDATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.updateTodo = function(id, text, difficulty) {

			console.log(id,text, difficulty);

			// call the create function from our service (returns a promise object)
			Todos.put(id, text, difficulty)

			// if successful creation, call our get function to get all the new todos
			.then(function(data) {
				$scope.loading = false;
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.todos = data.data; // assign our new list of todos
			});
			
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteTodo = function(id) {
			$scope.loading = true;

      Todos.delete(id)
      // if successful creation, call our get function to get all the new todos
      .then(function(data) {
        $scope.loading = false;
        $scope.todos = data.data; // assign our new list of todos
      });
		};
	}]);