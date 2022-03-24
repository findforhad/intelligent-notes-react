import withFirebaseAuth from "react-with-firebase-auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import firebaseConfig from "./firebaseConfig";
import AddNote from "./Components/AddNote";
import "./index.css";

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();
const database = firebaseApp.database();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

const App = ({ user, signOut, signInWithGoogle }) => {
  const createNewNote = async (payload) => {
    console.log(payload);
    console.log(user);
    console.log({ ...payload, user_uid: user.uid });
    await database
      .ref("/Notes")
      .push({ ...payload, user_uid: user.uid })
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      {user ? <p>Hello, {user.displayName}</p> : <p>Please sign in.</p>}
      {user && <AddNote createNewNote={createNewNote} />}
      <br />
      {user ? (
        <button onClick={signOut}>Sign out</button>
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )}
    </div>
  );
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
