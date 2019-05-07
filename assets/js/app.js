// Initialize Firebase

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyBwRXGzW8VdVANH4IS2BwXImwGEKuuv3Vc",
    authDomain: "wglm-196516.firebaseio.com",
    databaseURL: "https://wglm-196516.firebaseio.com",
    projectId: "wglm-196516",
    storageBucket: "wglm-196516.appspot.com",
    messagingSenderId: "748326687106",
    appId: "1:748326687106:web:e9eaeae82ec5fb63"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var trainName = "";
var destination = "";
var firstTrain = "00:00 AM";
var frequency = 0;

var database = firebase.database();

//var currentTime = moment();
//console.log(currentTime);
var firstTimeConverted;
// the time difference between current time and the first train
var difference;
var remainder;
var minUntilTrain;
var nextTrain;
var msg = "";
console.log("before click");

$('#save').on("click", function (event) {
    //event.preventDefaul();
    msg = "";
    trainName = $('#train-name').val().trim();
    destination = $('#destination').val().trim();
    firstTrain = $('#first-time').val().trim();
    frequency = $('#frequency').val().trim();
    if (!validateNull(trainName, destination, firstTrain, frequency)) {
        alert(msg);
        return
    }
    firstTimeConverted = moment(firstTrain, "hh:mm").subtract("1, years");
    difference = moment().diff(moment(firstTimeConverted), "minutes");
    remainder = difference % frequency;
    minUntilTrain = frequency - remainder;
    nextTrain = moment().add(minUntilTrain, "minutes").format("hh:mm a");


    database.ref().push({

        dbTrainName: trainName,
        dbDestination: destination,
        dbFirstTrain: firstTrain,
        dbFrequency: frequency,
        dbMin: minUntilTrain,
        dbNext: nextTrain

    });
});
database.ref().on("child_added", function (snapshot) {
    // clicker();
    var sv = snapshot.val();
    console.log(sv);
    var dTrainName = sv.dbTrainName;

    var dDestination = sv.dbDestination;
    console.log(sv.dbDestination);
    //firstTrain = sv.firstTrain;
    var dFrequency = sv.dbFrequency;
    var dMin = sv.dbMin;
    var dNext = sv.dbNext;

    $("#allTrains").append("<tr><td>" + dTrainName + "</td><td>" + dDestination + "</td><td>" + dFrequency + "</td><td>" + dNext + "</td><td>" + dMin + "</td></tr>");
});

function validateNull(t, d, f, fr) {
    var tf = true;
    if (t == "") {
        msg = "Enter train name";
        tf = false
    }
    if (d == "") {
        msg = "Enter destination name";
        tf = false
    }
    if (f == "") {
        msg = "Enter a valid time";
        tf = false
    }
    if ((fr == "") || (fr === 0)) {
        msg = "Enter a valid requency";
        tf = false
    }
    return tf;
}    