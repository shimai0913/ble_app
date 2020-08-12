import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDoUedl3RaJfOnE28nWi0yUm6_qaxk3_p8",
    authDomain: "bleapp-bt.firebaseapp.com",
    databaseURL: "https://bleapp-bt.firebaseio.com",
    projectId: "bleapp-bt",
    storageBucket: "bleapp-bt.appspot.com",
    messagingSenderId: "447133439235",
    appId: "1:447133439235:web:58a654951b3f9202e0c536",
    measurementId: "G-TM15J8CPZD"
};

firebase.initializeApp(firebaseConfig);
export default firebase;
export const db = firebase.firestore();
