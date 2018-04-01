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

export function newTemplate(subject, body) {
  const data = { subject, body };
  return app.database().ref().child('templates').push(data).key;
}

export function getTemplates(count) {
  const ref = app.database().ref('/templates').limitToLast(count);
  return ref.once('value').then(snapshot => {
    const res = [];
    snapshot.forEach(
      child => {
        const val = child.val();
        res.push({key: child.key, subject: val.subject, body: val.body});
      }
    );
    return res;
  });
}

export function getTemplateByKey(key) {
  const ref = app.database().ref(`/templates/${key}`);
  return ref.once('value').then(snapshot => {
    const val = snapshot.val();
    return {key: snapshot.key, subject: val.subject, body: val.body};
  });
}