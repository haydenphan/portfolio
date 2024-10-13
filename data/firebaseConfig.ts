// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getDatabase, Database } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyD-eu-LRJGyR5zEnFYd3owrhYyM-beBIfs",
    authDomain: "portfolio-bd9d3.firebaseapp.com",
    databaseURL: "https://portfolio-bd9d3-default-rtdb.firebaseio.com",
    projectId: "portfolio-bd9d3",
    storageBucket: "portfolio-bd9d3.appspot.com",
    messagingSenderId: "981884837875",
    appId: "1:981884837875:web:5ed029f3fc6cdd3b06bc86",
    measurementId: "G-J7N8EDNNCH"
};

const app = initializeApp(firebaseConfig);
const database: Database = getDatabase(app);

export { database };