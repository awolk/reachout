import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDonfaXkUqjDEBH9TzgEghUcRFTDP814gI",
  authDomain: "reachout-9a8ff.firebaseapp.com",
  databaseURL: "https://reachout-9a8ff.firebaseio.com",
  projectId: "reachout-9a8ff",
  storageBucket: "reachout-9a8ff.appspot.com",
  messagingSenderId: "465481634879"
};

const app = firebase.initializeApp(config);
const database = app.database();
