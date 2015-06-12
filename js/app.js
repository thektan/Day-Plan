(function() {
  /* Parse Setup 
  --------------------------------------------------------- */
  Parse.initialize("HkKD0qeE7y93LaBTO7lL2IIGbJVitPImljl5b3cV", "AMsA3zfBrUo78H3yFI63tuHWAZ5Ttr2KLbquFQQi");
  var Event = Parse.Object.extend("Event");
  var Activity = Parse.Object.extend("Activity");

  /* Angular 
  --------------------------------------------------------- */
  var app = angular.module('dayPlan', ['ngRoute']);

  /* Routing 
  --------------------------------------------------------- */
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

  /* Navigation Bar Partial 
  --------------------------------------------------------- */
  app.directive("navigationBar", function() {
    return {
      restrict: "A",
      templateUrl: "partials/navigation-bar.html"
    };
  });

  /* New Activity Popup 
  --------------------------------------------------------- */
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

          activityObject.set("event", event);
          activityObject.set("name", activity.name);
          activityObject.set("location", activity.location);
          activityObject.set("start", activity.start);
          activityObject.set("end", activity.end);
          activityObject.set("description", activity.description);

          activityObject.save(null, {
            success: function(activityObject) {
              $('#newActivityModal').modal('hide');
              activityForm.reset();
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

  /* New Event Form 
  --------------------------------------------------------- */
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

  /* Controller for the event page 
  --------------------------------------------------------- */
  app.controller('EventController', function($scope, $routeParams) {
    $scope.eventObjectId = $routeParams.eventId; // Get the event id.
    $scope.eventObjectName = "";
    var eventQuery = new Parse.Query(Event);
    var activityQuery = new Parse.Query(Activity);

    // Retrieve the event using the id from the Parse database.
    eventQuery.get($scope.eventObjectId, {
      success: function(eventObject) {
        $scope.eventObjectName = eventObject.get("name");
        $scope.eventObjectDate = eventObject.get("date");
        $scope.$apply();

        // Retrieve the activies related to the event.
        $scope.getActivites(eventObject);
      },
      error: function(object, error) {
        alert('Failed to retrieve event ' + error.message);
      }
    });

    /*
      Gets the activities from an event.
      Process:
        1. Takes the event id
        2. Compares it to the events to find the event object matching the id.
        3. Finds activities matching the parent event object.
      @param eventObjectId the event id to get activities from.
    */
    $scope.getActivites = function(eventObjectId) {
      eventQuery.get($scope.eventObjectId, {
        success: function(eventObject) {
          activityQuery.equalTo("event", eventObject);
          activityQuery.find({
            success: function(results) {
              // Create empty list of activities.
              var activityList = [];

              // Loop through the results, create activity objects,
              // and push them onto the array of activities.
              for (var i = 0; i < results.length; i++) { 
                var object = results[i];
                activityList.push({
                  "name": object.get("name"),
                  "start": object.get("start"),
                  "end": object.get("end")
                });
              }

              // Attach list of the controller to make accessible.
              $scope.activities = activityList;
              $scope.$apply();
            },
            error: function(error) {
              alert("Error: " + error.code + " " + error.message);
            }
          }); // end activityQuery.find
        },
        error: function(object, error) {
          alert('Failed to retrieve event ' + error.message);
        }
      });
    }; // end getActivities

  }); // end EventController


})();