angular.module('todoApp')

	// super simple service
	// each function returns a promise object 
	.factory('Todos', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/todos');
			},
			getDateBased : function(startDate, endDate) {
				return $http.get('/api/todosDate/' + startDate +'/'+ endDate);
			},
			getSearch : function(text) {
				return $http.get('/api/todos/' + text);
			},
			create : function(todo) {
				console.log('Factory :' + todo);
				console.log('Factory :' + todo.text);
				return $http.post('/api/todos/', todo);
			},
			updateTodo : function(todo, id){
				console.log('Factory :' + todo);
				console.log('Factory :' + id);
				return $http.post('/api/todos/', todo, id);
			},
			delete : function(id) {
				return $http.delete('/api/todos/' + id);
			},
			completeTodo : function(id, completed) {
				console.log('Factory :' + id);
				console.log('Factory :' + completed);
				return $http.put('/api/todos/' + id +'/'+ completed);
			},
			put : function(id, userInput, difficulty, completed) {
				return $http.put('/api/todos/' + id +'/'+ userInput +'/'+ difficulty +'/'+ completed);
			}
		}
	}]);