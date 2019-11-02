import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDh8XoN1q-2pTvQ429F5AgfH1TDoWCFmME",
  authDomain: "evenner.firebaseapp.com",
  databaseURL: "https://evenner.firebaseio.com",
  projectId: "evenner",
  storageBucket: "evenner.appspot.com",
  messagingSenderId: "1075368722631",
  appId: "1:1075368722631:web:8773ab977009ecd3debee2",
  measurementId: "G-8LLQZCZRP7"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
