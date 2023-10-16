import  firebase  from "firebase/compat/app"
import "firebase/compat/storage"
import "firebase/compat/firestore"

export const appFirebase = firebase.initializeApp({
    "projectId": "imagenes-react-659b7",
    "appId": "1:1080123825166:web:02b9750b0cf4abff2ff05f",
    "storageBucket": "imagenes-react-659b7.appspot.com",
    "locationId": "us-central",
    "apiKey": "AIzaSyCXqklkob6stFK9JBo7hQJI9_eK75Uq1vE",
    "authDomain": "imagenes-react-659b7.firebaseapp.com",
    "messagingSenderId": "1080123825166"
  });