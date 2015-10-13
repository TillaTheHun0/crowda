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
});