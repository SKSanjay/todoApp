angular.module('todoApp')

	// super simple service
	// each function returns a promise object 
	.factory('Todos', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/todos');
			},
			getDateBased : function(startDate, endDate) {
				return $http.get('/api/todos' + startDate +'/'+ endDate);
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