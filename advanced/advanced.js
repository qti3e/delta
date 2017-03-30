'use strict';

angular.module('myApp.advanced', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/advanced', {
            templateUrl: 'advanced/advanced.html',
            controller: 'AdvancedCtrl'
        });
    }])

    .controller('AdvancedCtrl', function($scope) {
        $scope.count = [];
	$scope.structure	= '';
	$scope.num		= 0;
	$scope.step		= 'structure'
	$scope.demo		= '';
	$scope.use = function(){
		$scope.structure	= $scope.preview;
		$scope.num		= $scope.preview.split('?').length - 1;
		$scope.demo		= $scope.structure;
		for(var i = 0;i < $scope.num;i++){
			//65: A
			$scope.demo = $scope.demo.replace('?', '<'+String.fromCharCode(i + 65)+'>')
		}
		if($scope.structure != ''){
			$scope.step		= 'inputs'
			for(var i = 0; i < $scope.num;i++){$scope.input.push(String.fromCharCode(65 + i))}
			$scope.getTex();
		}
	}

	$scope.inputs	= [];
	$scope.input	= [];
	$scope.tex	= '';
	$scope.teXs	= [];
	$scope.add	= function(){
		$scope.inputs.push($scope.input)
		$scope.teXs.push($scope.tex);
		$scope.input = [];
		for(var i = 0; i < $scope.num;i++){$scope.input.push(String.fromCharCode(65 + i))}
		$scope.getTex();
	}
	$scope.getTex	= function(){
		var tex = $scope.structure,
			i;
		for(i = 0;i < $scope.num;i++){
			tex = tex.replace('?',$scope.input[i]);
		}
		$scope.tex = tex;
		$scope.refresh();
		return tex;
	}

	$scope.indexChar = function(index){
		return String.fromCharCode(index + 65)
	}	

	var delta = function(sequnce){
		var d = new Delta(sequnce);
	            d.useGeo = false;
            	var f = d.formula();
           	return f.printLatex();
	}

        $scope.answer   = '';
	$scope.find	= function(){
		$scope.step = 'loading';
		console.log($scope.inputs)
		var sequnces 	= [],
			ret	= [],
				i,b,j,answer;
		for(i = 0;i < $scope.num;i++){
			b = [];
			for(j = 0;j < $scope.inputs.length;j++){
				b.push(parseFloat($scope.inputs[j][i]))
			}
			sequnces.push(b)
		}
		answer = $scope.structure;
		for(i = 0;i < $scope.num;i++){
			ret.push(delta(sequnces[i]));
			answer = answer.replace('?', '('+ret[i]+')')
		}
		$scope.answer = answer;
		$scope.step = 'answer';
		$scope.refresh();
	}	

        $scope.refresh = function () {
	    jQuery('#preview_panel > .MJXc-display, #preview_panel > .MathJax_Preview, #preview_panel > .MathJax_MathML').remove()
            setTimeout(function () {
                MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
            },200);
        };
        $scope.remove = function () {
            $scope.answer = '';
        $scope.count = [];
	$scope.structure	= '';
	$scope.num		= 0;
	$scope.step		= 'structure'
	$scope.demo		= '';
	$scope.inputs	= [];
	$scope.input	= [];
	$scope.tex	= '';
	$scope.teXs	= [];
        }
	$scope.refresh();
	$scope.preview = '';
	$scope.replace = function(newtxt){
		var textarea = jQuery('#textpreview')[0];
		var $ = jQuery;
		var b = textarea.value.substring(0, textarea.selectionStart) + newtxt + textarea.value.substring(textarea.selectionEnd)
		console.log(textarea.selectionEnd, textarea.selectionStart,b);
		$scope.preview = b;
		$scope.refresh();
	}
    });
