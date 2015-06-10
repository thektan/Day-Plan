(function() {
  /* Initialize Parse and Objects */
  Parse.initialize("HkKD0qeE7y93LaBTO7lL2IIGbJVitPImljl5b3cV", "AMsA3zfBrUo78H3yFI63tuHWAZ5Ttr2KLbquFQQi");
  var Event = Parse.Object.extend("Event");
  var Activity = Parse.Object.extend("Activity");

  var app = angular.module('dayPlan', []);

  app.directive("newActivityModal", function() {
    return {
      restrict: 'A',
      templateUrl: "new-activity-modal.html"
    };
  });

})();