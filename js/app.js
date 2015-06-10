(function() {
  var app = angular.module('dayPlan', []);

  app.directive("newActivityModal", function() {
    return {
      restrict: 'E',
      templateUrl: "new-activity-modal.html"
    };
  });

})();