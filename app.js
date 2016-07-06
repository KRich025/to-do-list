angular.module("PracticeApp", []).controller("MyController", function($scope, $http){
    
    $scope.newTodo = {  
        title: "", 
        description: "",
        price: null, 
        imgUrl: "",
        completed: false 
    };
    
    var url = 'http://mean.codingcamp.us/kyle/todo';
    
    $scope.addToList = function() {
        $http.post(url, $scope.newTodo).then(function(response){
            $scope.allToDo.push(response.data);
            $scope.newTodo = {  
                title: "", 
                description: "",
                price: null, 
                imgUrl: "",
                completed: false 
            };
        });
    };
    
    $scope.removeFromList = function(index) {
        var id = $scope.allToDo[index]._id;
        $http.delete('http://mean.codingcamp.us/kyle/todo/' + id).then(function(response){
            $scope.allToDo.splice(index, 1);
        });
    };

    $http.get(url).then(function (response){
        $scope.allToDo = response.data;
    });
    
    $scope.itemCompleted = function(index) {
        var toDoItem = $scope.allToDo[index],
            id = toDoItem._id;
        $http.put('http://mean.codingcamp.us/kyle/todo/' + id, toDoItem).then(function(response){
            $scope.allToDo[index] = response.data;
        });
    };
    
    $scope.editItem = function(index) {
        $scope.hideForm = false;
        $scope.editingItem = true;
        $scope.oneToDo = $scope.allToDo[index];
    };
    
    $scope.updateItem = function(index) {
        $scope.hideForm = true;
        var toDoItem = $scope.oneToDo,
            id = toDoItem._id;
        $http.put('http://mean.codingcamp.us/kyle/todo/' + id, toDoItem).then(function (response){ 
            $scope.oneToDo[index] = response.data;
        });
    };
    
    $scope.cancelEdit = function() {
        $scope.hideForm = true;
    }
});
