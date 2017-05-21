angular.module('todoApp')

	// inject the Todo service factory into our controller
	.controller('TodoController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		$scope.formData.text ="";
		$scope.loading = true;
		$scope.date = moment().format('DD-MM-YYYY');
		$scope.datePicker = {};
		$scope.datePicker.date = {
			startDate: null,
			endDate: null
    	};

		$scope.tags = [
			{ text: 'just' },
			{ text: 'some' },
			{ text: 'cool' },
			{ text: 'tags' }
		];

		$scope.loadTags = function(query) {

			return $http.post('/api/todos/' + query);
			// call the create function from our service (returns a promise object)
			// Todos.getSearch(query)

			// // if successful creation, call our get function to get all the new todos
			// .then(function(data) {
			// 	$scope.loading = false;
			// 	$scope.formData = {}; // clear the form so our user is ready to enter another
			// 	$scope.todos = data.data; // assign our new list of todos
			// });
		};

		//console.log($scope.loadTags('hello'));

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