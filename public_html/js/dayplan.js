/**
 * Contains the main functions of the Day Plan app.
 */
$(document).ready(function () 
{ 
    /* Initial settings 
     * ----------------------------------- */
    Parse.initialize("HkKD0qeE7y93LaBTO7lL2IIGbJVitPImljl5b3cV", "AMsA3zfBrUo78H3yFI63tuHWAZ5Ttr2KLbquFQQi");
    var Event = Parse.Object.extend("Event");
    var Activity = Parse.Object.extend("Activity");
    
    $("#guide-step-2").hide();
    $("#guide-step-3").hide();
    
    var eventObject, activityObject, definedEventName, definedEventDate;
    
    /* Guide actions
     * ----------------------------------- */
    $("#button-step-1").click(function() { 
        // Create new event object.
        eventObject = new Event();
        
        // Set the event name.
        eventObject.set("name", document.getElementById("eventName").value);
        
        // Save the event name to display later.
        definedEventName = document.getElementById("eventName").value;
        
        // UI Effects.
        $("#guide-step-1").hide();
        $("#guide-step-2").show();
    });
    
    $("#button-step-2").click(function() { 
        // Set the event date.
        eventObject.set("date", document.getElementById("eventDate").value);
        
        // Save the event date to display later.
        definedEventDate = document.getElementById("eventDate").value;
        
        // Add Event Name and Date to Step 3 of the guide.
        $('#definedEventName').html(definedEventName);
        $('#definedEventDate').html(definedEventDate);
        
        // UI Effects.
        $("#guide-step-2").hide();
        $("#guide-step-3").show();
        
    });
    
    $("#button-step-3").click(function() { 
        // Create new activity object.
        activityObject = new Activity();
        
        // Save event and activity object and tie activity to event.
        activityObject.save({
            parent: eventObject,
            title: document.getElementById("activityTitle").value,
            location: document.getElementById("activityLocation").value,
            start: document.getElementById("activityStart").value,
            end: document.getElementById("activityEnd").value
        }, {
            success: function (activityObject) {
                // The object was saved successfully.
                alert('Successfully saved activity.');
            },
            error: function (activityObject, error) {
                // The save failed.
                alert('Failed to create new object, with error code: ' + error.message);
            }
        });
    });
});