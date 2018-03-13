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

   console.log(trainName, destination, firstTrain, frequency);

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
   var firstTrain = childSnapshot.val().firstTrain;
   var frequency = childSnapshot.val().frequency;

   //military time
   var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
   console.log(firstTrainConverted)

  //current time
  var currentTime = moment();
  console.log("Current time: " + moment(currentTime).format("HH:mm"));

  //difference in times
  var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
  console.log("Difference in time: " + diffTime);

  //time apart
  var tRemainder = diffTime % frequency
  console.log(tRemainder);

  //minutes until train
  var tMinTilTrain = frequency - tRemainder;
  console.log("Minutes til train: " + tMinTilTrain);

  //next train
  var nextTrain = moment().add(tMinTilTrain, "minutes").format("h:mm:a");
  console.log("Arrival time: " + moment(nextTrain).format("HH:mm"));


   var tr = $("<tr>");
   var tdName = $("<td>").text(trainName);
   var tdDestination = $("<td>").text(destination);
   var tdFrequency = $("<td>").text(frequency);
   var tdNextArrival = $("<td>").text(nextTrain);
   var tdMinAway = $("<td>").text(tMinTilTrain);

   tr.append(tdName, tdDestination, tdFrequency, tdNextArrival, tdMinAway);
   $("#train-schedule").append(tr);


   // Handle the errors
 }, function (errorObject) {
   console.log("Errors handled: " + errorObject.code);
 });