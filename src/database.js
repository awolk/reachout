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

export function newTemplate(subject, body) {
  const data = { subject, body };
  return database.ref().child('templates').push(data).key;
}

export function getTemplates(count) {
  return new Promise((resolve, reject) => {
    const ref = database.ref('templates').limitToLast(count);
    ref.once('value', snapshot => {
      resolve(
        snapshot.map(
          child => ({key: child.key, value: child.val()})
        )
      );
    });
  });
}