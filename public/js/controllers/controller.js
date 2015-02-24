App.controller('appController', function($scope, $location, appStorage, $q){
    $scope.asyncScroll = function(room) {
        var deferred = $q.defer();

        if ($scope.getHistory(room)) {
            deferred.resolve('Success');
            return deferred.promise;
        } else {
            deferred.reject('Not allowed');
        }
    };

    socket.on('update_chat', function (data){
        $scope.$apply(function(){
            $scope.messages.push(data);
            updateScroll();
        });
    });
    $scope.post = "";
    $scope.join = function(){
        // Angular front end validations for joining
        if(!$scope.username){
            $scope.notice = { msg: "Username cannot be blank."};
            $scope.password = "";
            return false;
        };
        if(!$scope.password){
            $scope.notice = { msg: "Password cannot be blank."};
            return false;
        };

        // Validations passed, send username and password to server side
        var info = { name: $scope.username, pass: $scope.password };        
        appStorage.join(info, function(data){    
            userJoined(data);
            $scope.person = data;
            $scope.loggedIn = true;
            $scope.password = "";
            setHeight();
            updateScroll();
        });
    };

    // When view is initialized, set the room to "oct" chat room
    $scope.initializeMe = function(){
        appStorage.getUser(function(data){
            if(data){
                $scope.loggedIn = true;
                $scope.person = data.username;
                socket.emit("add_user", { username: data });
            }
            else{
                $scope.loggedIn = false;
            }
        });
        appStorage.getHistory("oct", function(data){
            $scope.messages = data;
        });
    };

    $scope.getHistory = function(room){
        appStorage.getHistory(room, function(data){
            console.log(data);
            $scope.messages = [];
            for (var i = 0; i < data.length; i++) {
                $scope.messages.push(data[i]);
                // d.resolve();
            };            
            return true;
        });
    }
    // When new partial is clicked, get all the history of that room, and append it to the view
    
    $scope.setRoom = function(room){
        socket.emit('switch_room', room);
        appStorage.getHistory(room, function(data){
            $scope.messages = [];
            // var d = $q.defer();            
            for (var i = 0; i < data.length; i++) {
                $scope.messages.push(data[i]);
                // d.resolve();
            };
            // var promise = $scope.asyncScroll(room);
            //     promise.then(function(greeting) {
            //         alert('Success: ' + greeting);
            //         getHeightAndScroll();
            //     }, function(reason) {
            //         alert('Failed: ' + reason);
            //     }, function(update) {
            //         alert('Got notification: ' + update);
            //     });
            // d.promise;
            // if(gotHistory(room, data)){
            //     $scope.getPartial = function () {
            //         return '/clientviews/partials/oct.html';
            //     }
            // }
            // setHeight();
        });
        updateScroll();
    };

    // Room clicked, set messages scope and change rooms
    // $scope.getHistory = function(room){
    //     socket.emit('switch_room', room);
    //     appStorage.getHistory(room, function(data){
    //         $scope.messages = data;

    //     }); 
    // };
    $scope.sendChat = function(){
        appStorage.sendChat($scope.post, function(data){
            console.log(data);
        });
    };
});