angular.module('dashboard')
.directive('clouds', function() {
  return {
    restrict: 'E',
    templateUrl: 'clouds.html',
    link:function($scope, element, attrs){
        console.log('Clouding...')
    }
  };
});
