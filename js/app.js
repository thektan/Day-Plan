(function() {
  /* Parse */
  Parse.initialize("HkKD0qeE7y93LaBTO7lL2IIGbJVitPImljl5b3cV", "AMsA3zfBrUo78H3yFI63tuHWAZ5Ttr2KLbquFQQi");
  var Event = Parse.Object.extend("Event");
  var Activity = Parse.Object.extend("Activity");

  /* Angular */
  var app = angular.module('dayPlan', ['ngRoute']);

  app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '/partials/home.html'
      }).
      when('/event/:eventId', {
        templateUrl: '/partials/event.html',
        controller: 'EventController'
      }).
      otherwise({
        redirectTo: '/'
      });
      
    /*$locationProvider.html5Mode(true);*/
  }]);

  app.directive("navigationBar", function() {
    return {
      restrict: "A",
      templateUrl: "partials/navigation-bar.html"
    };
  });

  app.directive("newActivityModal", function() {
    return {
      restrict: "A",
      templateUrl: "partials/new-activity-modal.html"
    };
  });

  app.directive("newEventForm", function() {
    return {
      restrict: "A",
      templateUrl: "partials/new-event-form.html",
      controller: function() {
        /* Creates a new event and persists it into the database. */
        this.addEvent = function(event) {
          var eventObject = new Event();

          eventObject.set("name", event.name);
          eventObject.set("date", event.date);

          eventObject.save(null, {
            success: function(eventObject) {
              // Execute any logic that should take place after the object is saved.
              window.location = "/" + eventObject.id;
            },
            error: function(eventObject, error) {
              // Execute any logic that should take place if the save fails.
              // error is a Parse.Error with an error code and message.
              alert('Failed to create new object, with error code: ' + error.message);
            }
          });

        };
      },
      controllerAs: "eventFormCtrl"
    };
  });

  app.controller('EventController', function($scope, $routeParams) {
    $scope.name = "test";
    $scope.params = $routeParams;
  });


})();