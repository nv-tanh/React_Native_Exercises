import firebase from "firebase"; // 4.8.1
var firebaseConfig = {
  apiKey: "AIzaSyB7eaD06_P5WFBvuq7x_t1mu2MVvaBbPtc",
  authDomain: "week7-6602b.firebaseapp.com",
  databaseURL: "https://week7-6602b.firebaseio.com",
  projectId: "week7-6602b",
  storageBucket: "week7-6602b.appspot.com",
  messagingSenderId: "1038679258719",
  appId: "1:1038679258719:web:20326a7b62b14a20"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export default database;
