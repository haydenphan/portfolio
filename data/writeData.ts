// writeData.js
import { database } from './firebaseConfig';
import { ref, set } from "firebase/database";

const personalInformation = {
  name: "Hayden Phan",
  age: 20,
  "contactInformation": {
    "phoneNumber": "0901984129",
    "personalEmail": "khanhnhiphan.amy@gmail.com",
    "universityEmail": "nhiptkde180931@fpt.edu.vn"
  },
  images: {}
};

function writePersonalInformation() {
  set(ref(database, 'personal-information'), personalInformation)
    .then(() => {
      console.log('Data written successfully!');
    })
    .catch((error) => {
      console.error('Error writing data: ', error);
    });
}

writePersonalInformation();