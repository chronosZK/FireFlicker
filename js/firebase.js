// Initialize Firebase
var config = {
  apiKey: "AIzaSyD7IxelvPKih6PXihWN6ShngT2AEWpuKoE",
  authDomain: "cmt322-e1ac7.firebaseapp.com",
  databaseURL: "https://cmt322-e1ac7.firebaseio.com",
  projectId: "cmt322-e1ac7",
  storageBucket: "cmt322-e1ac7.appspot.com",
  messagingSenderId: "19245692440"
};
firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});



