angular.module('todoApp')

	.controller('TodoController', ['$scope','$http','Todos', function($scope, $http, Todos) {

		//Init: Page load info
    $scope.date = moment().format('DD-MM-YYYY');
    $scope.loading = true;
		$scope.todoDoc = {};
		$scope.todoDoc.text ="";

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

		//Tag init (probably needs to become an empty object)
		$scope.todoDoc.tags = [
			{ text: 'just' },
			{ text: 'some' },
			{ text: 'cool' },
			{ text: 'tags' }
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
		$scope.updateTodo = function(id, text) {

			console.log(id,text);

			// call the create function from our service (returns a promise object)
			Todos.put(id, text)

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