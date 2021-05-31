import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBXmAtgYaJgTwdWTtm2Na0NACf2fH9kAEA",
    authDomain: "utube-api-react.firebaseapp.com",
    projectId: "utube-api-react",
    storageBucket: "utube-api-react.appspot.com",
    messagingSenderId: "741873020137",
    appId: "1:741873020137:web:020bd4ffa9f0a38c055478"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase.auth();