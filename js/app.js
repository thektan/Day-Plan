(function() {
  var app = angular.module('dayPlan', []);

  app.directive("newActivityModal", function() {
    return {
      restrict: 'A',
      templateUrl: "new-activity-modal.html"
    };
  });

})();