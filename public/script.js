// IMPORTS
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import { getStorage, 
          ref,
          uploadBytes,
          getDownloadURL, } 
    from "https://www.gstatic.com/firebasejs/9.7.0/firebase-storage.js";


// CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyC8tu5TtzibQgx_PzZOM_Um6Ljt6bbSWJE",
  authDomain: "image-demo-be0cf.firebaseapp.com",
  projectId: "image-demo-be0cf",
  storageBucket: "image-demo-be0cf.appspot.com",
  messagingSenderId: "939598215270",
  appId: "1:939598215270:web:dcb7dd71981f452a9e15a7"
};

// INITIALIZE
const app = initializeApp(firebaseConfig);

// STORAGE
const storage = getStorage(app);
// STORAGE REFERENCE
const storageRef = ref(storage);

// UPLOAD BUTTON
const uploadBtn = document.getElementById("upload");
uploadBtn.addEventListener("click", uploadFn);

// UPLOAD FUNCTION
function uploadFn(){
  //get file
  const fileInput = document.getElementById("myfile");
  const fileObject = fileInput.files[0];

  console.log("uploading....", fileObject.name);

  //create reference in storage for this file
  const fileRef = ref(storage, fileObject.name);

  uploadBytes(fileRef, fileObject)
  .then(
    (snapshot) => {
      console.log("uploaded some bytes");
      //here you can check for errors or do more processing
    }
  )
}

// DISPLAY BUTTONG
const displayBtn = document.getElementById("display");
displayBtn.addEventListener("click", displayFn);

// DISPLAY FUNCTION
function displayFn(){
  //get filename from text input
  const imagename = document.getElementById("imagename");
  //console.log(imagename.value);

  //create reference in storage for this filename
  const fileRef = ref(storage, imagename.value);

  //download - other options available, look at docs
  getDownloadURL(fileRef)
  .then(
    (url) => {
      const imgTag = "<img src='" + url + "'>";
      document.getElementById("imageoutput").innerHTML = imgTag;
    }
  )

}