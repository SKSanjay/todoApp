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
			create : function(userInput, todoTags, difficulty) {
				// console.log('Factory :' + userInput);
				// console.log('Factory :' + todoTags);
				// console.log('Factory :' + difficulty);
				return $http.post('/api/todos/' + userInput +'/'+ todoTags +'/'+ difficulty);
			},
			delete : function(id) {
				return $http.delete('/api/todos/' + id);
			},
			completeTodo : function(id, completed, dateCompleted) {
				console.log('Factory :' + id);
				console.log('Factory :' + completed);
				console.log('Factory :' + dateCompleted);
				return $http.put('/api/todos/' + id +'/'+ completed +'/'+ dateCompleted);
			},
			put : function(id, userInput, difficulty, completed) {
				return $http.put('/api/todos/' + id +'/'+ userInput +'/'+ difficulty +'/'+ completed);
			}
		}
	}]);