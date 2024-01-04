import firebase from "firebase/compat/app";
import { getAnalytics } from "firebase/analytics";
import { getEnv } from "api/utils/functions";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: getEnv("API_KEY"),
    authDomain: getEnv("AUTH_DOMAIN"),
    projectId: getEnv("PROJECT_ID"),
    storageBucket: getEnv("STORAGE_BUCKET"),
    messagingSenderId: getEnv("MESSAGING_SENDER_ID"),
    appId: getEnv("APP_ID"),
    measurementId: getEnv("MEASUREMENT_ID"),
};

const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = app.auth();
const firestore = app.firestore();
const storage = app.storage();

export { firebaseConfig, app, analytics, auth, firestore, storage };
