import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

function App() {
  const webcamRef = useRef(null);
  const imageRef = useRef(null);
  const [imageURL, setImageURL] = useState(null);

  const dataURLtoFile = (dataurl, fileName) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, { type: mime });
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log("imageSrc >> ", imageSrc);
    // imageRef.current = imageSrc;
    setImageURL(imageSrc);

    const file = dataURLtoFile(imageSrc, "username-day.jpeg");
    console.log(file);

    const formData = new FormData();

    formData.append("file", file);

    // console.log("form .. >> ", formData.get("image"));

    // {"Content-Type": "multipart/form-data"}
    axios.post("http://localhost:8080/read-picture", formData).then((res) => {
      console.log("res >> ", res);
    });
  }, [webcamRef]);

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        height={180}
        width={320}
        // height={360}
        // width={640}
        // height={640}
        // width={1280}
        videoConstraints={videoConstraints}
      />

      <button onClick={capture}>Capture photo</button>
      <img height="180" width="320" src={imageURL} alt="" />
    </>
  );
}

export default App;
