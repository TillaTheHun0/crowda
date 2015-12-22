angular.module('starter.directives', [])

.directive('braintreeDropin', function() {
  return {
    restrict: 'AEC',
    scope: {
      options: '='
    },
    template: '<div id="bt-dropin"></div>',
    controller: ['$scope', 'braintree', function($scope, braintree) {
      var options = $scope.options || {};
      options.container = 'bt-dropin';

      braintree.setupDropin(options);
    }]
  }
})

.directive('braintreePaypal', function() {
  return {
    restrict: 'AEC',
    scope: {
      options: '='
    },
    template: '<div id="bt-paypal"></div>',
    controller: function($scope, braintree) {
      var options = $scope.options || {};
      options.container = 'bt-paypal';

      braintree.setupPayPal(options);
    }
  }
})

.directive('crowdaList', function(){
    return {
       restrict: 'E',
       scope: {
           type: '=' //need to figure out why this did not work for attribute per angular docs
       },
       link: function(scope, elem, attrs){
           scope.getTemplateUrl = function(){
               var type = attrs.type;
               return 'templates/' + type + 'List.html';
           };
       },
       template: '<div ng-include="getTemplateUrl()"></div>'
    }
});