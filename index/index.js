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
        function decimalPlaces(num) {
            var match = (''+num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
            if (!match) { return 0; }
            return Math.max(
                0,
                // Number of digits right of decimal point.
                (match[1] ? match[1].length : 0)
                // Adjust for scientific notation.
                - (match[2] ? +match[2] : 0));
        }
        function print(max_dec, delta) {
            if(max_dec == 0)
                return delta.printLatex();
            if(max_dec == 1)
                return $scope.answer = '\\frac{'+delta.printLatex()+'}{10}';
            return $scope.answer = '\\frac{'+delta.printLatex()+'}{10^'+max_dec+'}';
        }
        $scope.submit = function(){
            var numbers = [],
                v,i,max_dec = 0,h;
            for(i = 0;i < $scope.count.length;i++){
                v = parseFloat($scope.count[i]);
                if(!isNaN(v)){
                    numbers.push(v);
                    h = decimalPlaces(v);
                    if(h > max_dec){
                        max_dec = h;
                    }
                }
            }
            for(i = 0;i < numbers.length;i++){
                numbers[i] = parseInt(numbers[i] * Math.pow(10, max_dec))
            }
            var d = new Delta(numbers);
            d.useGeo = false;
            var f = d.formula();
            $scope.answer = print(max_dec, f);

            d = new Delta(numbers);
            d.useGeo = true;
            f = d.formula();
            $scope.answer2 = print(max_dec, f);

            if($scope.answer == $scope.answer2){
                $scope.answer2 = '';
            }

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
