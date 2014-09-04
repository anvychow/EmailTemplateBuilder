'use strict';

angular.module('emailTemplateBuilderApp', ['ngSanitize', 'ngDraggable'])
	.controller('MainCtrl', function($scope, $sce, $filter) {

		$scope.draggableObjects = [{
			contenuto: 'Lorem ipsum <strong>dolor</strong> sit amet...',
			type: 'testo',
			allineamento: 'block'
		},{
			contenuto: 'Lorem',
			type: 'testo',
			allineamento: 'inline'
		},{
			contenuto: '<div style="display:block !important; clear:both; width:100%;"><div style="height: 60px"><br /><br /></div></div>',
			type: 'spacer',
			allineamento: 'block'
		},
		 {
			contenuto: '<div style="display:block !important; clear:both; width:100%; height: 30px;"><img src="/images/yeoman.png"></img></div>',
			type: 'immagine',
			allineamento: 'block'
		}, 
		{
			contenuto: '<div style="display:block !important; clear:both; width:100%; height: 30px;padding: 40px !important;"><hr style="display:block; clear:both; height: inherit;" ></div>',
			type: 'divider',
			allineamento: 'block'
		}, {
			contenuto: 'Cliccami',
			allineamento: 'block',
			type: 'button'
		}];
		$scope.droppedObjects = [];

		$scope.onDropComplete = function(data, evt) {
			var index = $scope.droppedObjects.indexOf(data);
			if (data.sorgente === "panel") {
				$scope.droppedObjects.push(clone(data));
			}
		}
		//TODO: refactoring
		Array.prototype.max = function (property, max_value) {
				
				if(this.length === 0)
					return 0;

				var max_value = max_value || 1;
			    for (var i = 0, len = this.length; i < len; i++) {
			        if (this[i][property] >= max_value)
			        	max_value = this[i][property]
			    }
			    return max_value;
    	};

		var clone = function  (data) {
				var el = {};
				angular.copy(data, el);
				el.id = $scope.droppedObjects.max('id', 1) + 1;
				return el;
		}
		$scope.onDragSuccess = function(data, evt) {
			console.log(' $scope.droppedObjects:onDragSuccess',  $scope.droppedObjects.length)
		}

		$scope.onDropCompleteReorder = function(index, obj, evt) {
			if (obj.sorgente !== "panel") {
				var otherObj = $scope.droppedObjects[index];
				var otherIndex = $scope.droppedObjects.indexOf(obj);
				$scope.droppedObjects[index] = obj;
				$scope.droppedObjects[otherIndex] = otherObj;
			}
		}

		$scope.removeComponent = function(obj) {
		
			var index = $scope.droppedObjects.indexOf(obj);
			console.log(index)
			if (index > -1) {
			console.log(' $scope.droppedObjects:removeComponent',  $scope.droppedObjects)
				$scope.droppedObjects.splice(index, 1);
			}
		}
	});