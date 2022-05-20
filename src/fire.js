import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const login = {
  apiKey: "AIzaSyBBKUlQy92s2TyaXSRugd5u5JQNIC7qAm4",
  authDomain: "login-809ba.firebaseapp.com",
  projectId: "login-809ba",
  storageBucket: "login-809ba.appspot.com",
  messagingSenderId: "1024887074490",
  appId: "1:1024887074490:web:bef4498aa69714f6461c83",
};

const fire = firebase.initializeApp(login);

const firebaseConfigNew = {
  apiKey: "AIzaSyCH04abeDCmcEFDJRS4V3RKp3bFOs_6UfA",
  authDomain: "kiai-e5b91.firebaseapp.com",
  projectId: "kiai-e5b91",
  storageBucket: "kiai-e5b91.appspot.com",
  messagingSenderId: "310407023592",
  appId: "1:310407023592:web:cc1ed311699e06eef0b25d",
  measurementId: "G-LVQTNMJMC9",
};

const secondaryApp = firebase.initializeApp(firebaseConfigNew, "secondary");

const db = secondaryApp.firestore();
const auth = firebase.auth();

export default fire;
export { auth, db };
