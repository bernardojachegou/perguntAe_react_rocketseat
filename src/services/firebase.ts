import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCC9UhuJo4ad5WusP9Fcl75IZ4d9J43rT0',
  authDomain: 'letmeask-a1882.firebaseapp.com',
  databaseURL: 'https://letmeask-a1882-default-rtdb.firebaseio.com',
  projectId: 'letmeask-a1882',
  storageBucket: 'letmeask-a1882.appspot.com',
  messagingSenderId: '175681590625',
  appId: '1:175681590625:web:fd8793ff3ccc2d960aa120',
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const databse = firebase.database();
