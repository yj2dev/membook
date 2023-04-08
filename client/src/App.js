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
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log("imageSrc >> ", imageSrc);
    // imageRef.current = imageSrc;
    setImageURL(imageSrc);

    // axios.get("http://localhost:8080/apple").then((res) => {
    //   console.log("res >> ", res);
    // });

    const formData = new FormData();

    formData.append("file", imageSrc);

    console.log("form .. >> ", formData.get("file"));

    axios
      .post("http://localhost:8080/read-picture", formData)
      // .post("http://localhost:8080/read-picture", { test: "strawberry" })
      .then((res) => {
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
