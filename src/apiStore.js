import firebase from 'firebase';
import config from './apiConfig';

firebase.initializeApp(config);
const db = firebase.firestore();

db.settings({
  timestampsInSnapshots: true,
});

export default db;
