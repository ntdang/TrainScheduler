 var config = {
   apiKey: "AIzaSyALxf3SgWP9s4DdC48n-THZBe7LEuIOBSM",
   authDomain: "nd-class-activities.firebaseapp.com",
   databaseURL: "https://nd-class-activities.firebaseio.com",
   projectId: "nd-class-activities",
   storageBucket: "nd-class-activities.appspot.com",
   messagingSenderId: "959480585452"
 };
 firebase.initializeApp(config);

 // Assign the reference to the database to a variable named 'database'
 var database = firebase.database();


 // Capture Button Click
 $("#submit-form").on("click", function (event) {
   event.preventDefault();

   // Grabbed values from text boxes
   var trainName = $("#train-input").val().trim();
   var destination = $("#destination-input").val().trim();
   var firstTrain = $("#firstTrain-input").val().trim();
   var frequency = parseInt($("#frequency-input").val().trim());

   console.log(trainName, destination, time, frequency);

   // Code for handling the push
   database.ref().push({
     trainName: trainName,
     destination: destination,
     firstTrain: firstTrain,
     frequency: frequency,
     dateAdded: firebase.database.ServerValue.TIMESTAMP
   });

 });

 database.ref().on("child_added", function (childSnapshot) {

   // Log everything that's coming out of snapshot
   console.log(childSnapshot.val())


   var trainName = childSnapshot.val().trainName;
   var destination = childSnapshot.val().destination;
  //  var time = childSnapshot.val().time;
   var frequency = childSnapshot.val().frequency;

   //military time
   var firstTrain = moment().format("HH:mm");

  //  var totalRate = parseInt(totalMonths) * parseInt(rate);

  //  var tr = $("<tr>");
  //  var tdName = $("<td>").text(name);
  //  var tdDestination = $("<td>").text(destination);
  //  var tdTime = $("<td>").text(time);
  //  var tdMonths = $("<td>").text(totalMonths);
  //  var tdRate = $("<td>").text(rate);
  //  var tdTotal = $("<td>").text('$' + totalRate);

  //  tr.append(tdName, tdRole, tdStartDate, tdMonths, tdRate, tdTotal);
  //  $("#train-schedule").append(tr);


   // Handle the errors
 }, function (errorObject) {
   console.log("Errors handled: " + errorObject.code);
 });