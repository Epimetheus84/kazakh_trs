
import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyBTodsxOgJpke6HSVuISF5BOaohGw2p1m8",
    authDomain: "registration-3c6c4.firebaseapp.com",
    databaseURL: "https://registration-3c6c4.firebaseio.com",
    projectId: "registration-3c6c4",
    storageBucket: "registration-3c6c4.appspot.com",
    messagingSenderId: "406066715604",
    appId: "1:406066715604:web:f88928d5fb97765d365441",
    measurementId: "G-FDW95NK9JT"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const db = app.database();