import { Col, Image } from "react-bootstrap";
import EscuchameEntreElRuidoLogo from "../assets/escuchame-entre-el-ruido.png";
import {
  PlayFill,
  PauseFill,
  SkipBackwardFill,
  SkipForwardFill,
} from "react-bootstrap-icons";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useRef, useState } from "react";

const Player = () => {
  const [radioData, setRadioData] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  /* const [duration, setDuration] = useState(0);
  const [bufferDuration, setBufferDuration] = useState(0); */

  const audioPlayer = useRef();

  /* useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    return () => {};
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]); */

  const handleTogglePlayPause = () => {
    /* console.log(audioPlayer.current.buffered.start(0));

    console.log(
      audioPlayer.current.buffered.end(audioPlayer.current.buffered.length - 1)
    );

    console.log(audioPlayer.current.buffered.length);

    console.log(audioPlayer.current.duration); */

    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    !prevValue ? audioPlayer.current.play() : audioPlayer.current.pause();
  };

  const handleForward = () => {
    audioPlayer.current.currentTime = audioPlayer.current.currentTime + 15;
  };

  const handleBackward = () => {
    audioPlayer.current.currentTime = audioPlayer.current.currentTime - 15;
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, `app/content`), (querySnapshot) => {
      const radioData = querySnapshot.data().radioData[0];
      setRadioData(radioData);
    });
    return () => unsubscribe;
  }, []);
  return (
    <Col className="px-0 d-flex align-items-center">
      <Col className="d-flex col-4">
        <Col className="bg-dark ftr-icon-cont col-auto d-flex align-items-center p-1">
          <Image
            className="h-75 mx-auto"
            src={EscuchameEntreElRuidoLogo}
            alt="Escuchame Ente El Ruido"
          />
        </Col>
        <Col className="text-light text-truncate">
          <Col>
            <Col
              className="bg-dark rounded ps-1 ms-1 fw-semibold"
              style={{ fontSize: "0.75rem" }}
            >
              {radioData.title}
            </Col>
          </Col>
          <Col className="ps-2" style={{ fontSize: "0.75rem" }}>
            <small>{radioData.text}</small>
          </Col>
        </Col>
      </Col>
      <Col className="d-flex justify-content-center align-items-center">
        <audio
          ref={audioPlayer}
          src /* ="http://giss.tv:8000/acbradio.mp3"  */="/api/"
        ></audio>
        <Col className="col-auto d-flex align-items-center">
          <SkipBackwardFill
            className="cstm-btn text-light me-2"
            onClick={handleBackward}
          />
          <Col
            className="cstm-btn bg-dark rounded-circle text-light d-flex justify-content-center align-items-center play-btn"
            style={{ height: "6vh", width: "6vh" }}
            onClick={handleTogglePlayPause}
          >
            {isPlaying ? (
              <PauseFill style={{ fontSize: "5.5vh" }} />
            ) : (
              <PlayFill style={{ fontSize: "5.5vh" }} />
            )}
          </Col>
          <SkipForwardFill
            onClick={handleForward}
            className="cstm-btn text-light ms-2"
          />
        </Col>
      </Col>
      <Col></Col>
    </Col>
  );
};

export default Player;
