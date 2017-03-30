'use strict';

angular.module('myApp.index', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/index', {
            templateUrl: 'index/index.html',
            controller: 'IndexCtrl'
        });
    }])

    .controller('IndexCtrl', function($scope) {
        $scope.count = [''];
        var removeEmpty = function(){
            var numbers = [],
                v,i;
            for(i = 0;i < $scope.count.length;i++){
                v = parseFloat($scope.count[i]);
                if(!isNaN(v)){
                    numbers.push(v);
                }
            }
            numbers.push('');
            $scope.count = numbers;
        };
        $scope.addNumber = function (key) {
            removeEmpty();
            $scope.count.push('');
        };
        $scope.answer   = '';
        $scope.answer2  = '';
        $scope.submit = function(){
            var numbers = [],
                v,i;
            for(i = 0;i < $scope.count.length;i++){
                v = parseFloat($scope.count[i]);
                if(!isNaN(v)){
                    numbers.push(v);
                }
            }
            console.log('a');
            var d = new Delta(numbers);
            d.useGeo = false;
            var f = d.formula();
            $scope.answer = f.printLatex();
			
            console.log('b');
            d = new Delta(numbers);
            d.useGeo = true;
            f = d.formula();
            $scope.answer2 = f.printLatex();

            if($scope.answer == $scope.answer2){
                $scope.answer2 = '';
            }
            console.log('c');

            setTimeout(function () {
                MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
            }, 500);
        };
        $scope.refresh = function () {
            setTimeout(function () {
                MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
            }, 500);
        };
        $scope.remove = function () {
            $scope.count = [''];
            $scope.answer = '';
        }
    });
