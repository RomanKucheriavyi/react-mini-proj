import React from "react";
import videoBg from "../../../assets/videoBg.mp4"
import "./VideoBg.css"

const VideoBg = () => <video className="videoBg" src={videoBg} autoPlay loop muted disablePictureInPicture />

export default VideoBg;