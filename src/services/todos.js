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
			create : function(userInput, todoTags, difficulty) {
				return $http.post('/api/todos', userInput +'/'+ todoTags +'/'+ difficulty);
			},
			delete : function(id) {
				return $http.delete('/api/todos/' + id);
			},
			put : function(id, userInput, difficulty) {
				return $http.put('/api/todos/' + id +'/'+ userInput +'/'+ difficulty);
			}
		}
	}]);