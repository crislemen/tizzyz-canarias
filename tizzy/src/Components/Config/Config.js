import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyBE08C_cicdwEtOyvIb_2Ge6SdcSjA96vo",
  authDomain: "tizzys-canarias.firebaseapp.com",
  databaseURL: "https://tizzys-canarias-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tizzys-canarias",
  storageBucket: "tizzys-canarias.appspot.com",
  messagingSenderId: "1086932709594",
  appId: "1:1086932709594:web:615e4e7962127efb86f5e3",
  measurementId: "G-E9P5BSX40C"
};

firebase.initializeApp(firebaseConfig);

//Cojo la base de datos de firebase, tanto la autentificacion como los productos, etc
//lo meto en una variable, y los exporto para poder utilizarlos 
const auth = firebase.auth();
const fs= firebase.firestore();
const storage= firebase.storage();


export {auth,fs,storage}