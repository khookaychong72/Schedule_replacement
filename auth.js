// Firebase Web SDK Modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// 1. REPLACE THIS BLOCK with your own config from the Firebase Console
// (Go to Project Settings > General > Your Apps > Web App)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// 2. Initialize Firebase and Auth services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 3. Monitor Authentication State
// This tracks if a user is logged in or out across page reloads
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user.email);
    // Code to update your UI for logged-in status (e.g., show logout button, hide login form)
  } else {
    console.log("No user signed in.");
    // Code to update your UI for logged-out status
  }
});

/**
 * 4. Sign Up Function
 * Call this function when your registration form is submitted
 */
export function registerUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Account created successfully for:", user.email);
      alert("Registration successful!");
    })
    .catch((error) => {
      console.error("Signup error:", error.code, error.message);
      alert(`Signup failed: ${error.message}`);
    });
}

/**
 * 5. Log In Function
 * Call this function when your login form is submitted
 */
export function loginUser(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Logged in successfully as:", user.email);
      alert("Login successful!");
    })
    .catch((error) => {
      console.error("Login error:", error.code, error.message);
      alert(`Login failed: ${error.message}`);
    });
}

/**
 * 6. Log Out Function
 * Call this function when a user clicks a logout button
 */
export function logoutUser() {
  signOut(auth)
    .then(() => {
      console.log("User signed out successfully.");
      alert("Logged out successfully.");
    })
    .catch((error) => {
      console.error("Logout error:", error);
    });
}
