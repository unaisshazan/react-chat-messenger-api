import firebase from "firebase"


// Initialize Firebase
  var config = {

  };

  firebase.initializeApp(config);

  const database = firebase.database()

  export {database};
