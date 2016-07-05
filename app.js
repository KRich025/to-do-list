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
        console.log($scope.allToDo);
    });
    
    $scope.itemCompleted = function(index) {
        var id = $scope.allToDo[index]._id;
        $http.put('http://mean.codingcamp.us/kyle/todo/' + id).then(function(response){
            $scope.allToDo[index].completed = true;
        });
    };
    
    $scope.editItem = function(index) {
        $scope.editingItem = true;
        var id = $scope.allToDo[index]._id;
        $http.get('http://mean.codingcamp.us/kyle/todo/' + id).then(function (response){
            $scope.oneToDo = response.data;  
        });
    };
});
