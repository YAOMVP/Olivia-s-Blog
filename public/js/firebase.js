// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCtHHHZdmqd6oft8kvSdBVNKxE6XrSwfzI",
    authDomain: "blog-personal-project-11b2d.firebaseapp.com",
    projectId: "blog-personal-project-11b2d",
    storageBucket: "blog-personal-project-11b2d.appspot.com",
    messagingSenderId: "767081272167",
    appId: "1:767081272167:web:34091f17ab6794baf155c2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// export const db = getFirestore(app);

let db = firebase.firestore();
let auth = firebase.auth();

const logoutUser = () => {
    auth.signOut();
    location.reload();
}