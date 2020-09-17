import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyAEjo1PBJ_inyTgYKhHYfL3xV6PCfTJ0WY',
    authDomain: 'chatapp-20617.firebaseapp.com',
    databaseURL: 'https://chatapp-20617.firebaseio.com',
    projectId: 'chatapp-20617',
    storageBucket: 'chatapp-20617.appspot.com',
    messagingSenderId: '683495420640',
    appId: '1:683495420640:web:d9df22b1cb1686831f9685',
    measurementId: "G-1Z3HS73YVM"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };