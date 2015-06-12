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

  /* Navigation Bar Partial */
  app.directive("navigationBar", function() {
    return {
      restrict: "A",
      templateUrl: "partials/navigation-bar.html"
    };
  });

  /* New Activity Popup */
  app.directive("newActivityModal", function() {
    return {
      restrict: "A",
      templateUrl: "partials/new-activity-modal.html",
      controller: function($scope) {
        /*
          Creates a new activity and persists it into the database.
          @param activity the activity object to be added.
          @param eventId the event object id the activity is linked to.
        */
        this.addActivity = function(activity, eventId) {
          var activityObject = new Activity();
          var event = new Event();
          event.id = eventId;

          activityObject.set("parent", event);
          activityObject.set("name", activity.name);
          activityObject.set("start", activity.start);
          activityObject.set("end", activity.end);

          activityObject.save(null, {
            success: function(activityObject) {
              $('#newActivityModal').modal('hide');
              activityForm.reset();
              alert('Successfully added new activity: ' + activityObject);
            },
            error: function(activityObject, error) {
              alert('Failed to create new object, with error code: ' + error.message);
            }
          });
        };

        /*
          Resets the form.
        */
        this.resetForm = function() {
          activityForm.reset();
        };
      },
      controllerAs: "activityFormCtrl"
    };
  });

  /* New Event Form */
  app.directive("newEventForm", function() {
    return {
      restrict: "A",
      templateUrl: "partials/new-event-form.html",
      controller: function() {
        // Creates a new event and persists it into the database.
        this.addEvent = function(event) {
          var eventObject = new Event();

          eventObject.set("name", event.name);
          eventObject.set("date", event.date);

          eventObject.save(null, {
            success: function(eventObject) {
              window.location = "/#/event/" + eventObject.id;
            },
            error: function(eventObject, error) {
              alert('Failed to create new object, with error code: ' + error.message);
            }
          });

        };
      },
      controllerAs: "eventFormCtrl"
    };
  });

  /* Controller for the event page */
  app.controller('EventController', function($scope, $routeParams) {
    $scope.eventObjectId = $routeParams.eventId; // Get the event id.
    $scope.eventObjectName = "";

    // Retrieve the event using the id from the Parse database.
    var query = new Parse.Query(Event);
    query.get($scope.eventObjectId, {
      success: function(eventObject) {
        $scope.eventObjectName = eventObject.get("name");
        $scope.eventObjectDate = eventObject.get("date");
        $scope.$apply();
      },
      error: function(object, error) {
        alert('Failed to retrieve event ' + error.message);
      }
    });
  });


})();