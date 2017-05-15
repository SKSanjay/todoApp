angular.module('todoApp')

	// super simple service
	// each function returns a promise object 
	.factory('Todos', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/todos');
			},
			getSearch : function(text) {
				return $http.get('/api/todos/' + text);
			},
			create : function(todoData) {
				return $http.post('/api/todos', todoData);
			},
			delete : function(id) {
				return $http.delete('/api/todos/' + id);
			},
			put : function(id, userInput) {
				return $http.put('/api/todos/' + id +'/'+ userInput);
			}
		}
	}]);