import { Row, Col, Image, Spinner } from "react-bootstrap";
import EscuchameEntreElRuidoLogo from "../assets/escuchame-entre-el-ruido.png";
import {
  PlayFill,
  PauseFill,
  SkipBackwardFill,
  SkipForwardFill,
  Dot,
} from "react-bootstrap-icons";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useRef, useState } from "react";

const Player = () => {
  const [radioData, setRadioData] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  /* const [duration, setDuration] = useState(0);
  const [bufferDuration, setBufferDuration] = useState(0); */
  const radioSrc = radioData.onAir
    ? "http://giss.tv:8000/amparo.mp3"
    : "https://buecrplb01.cienradios.com.ar/1406_Rock_Argentino_32000.aac";

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

  const handleVolume = (e) => {
    const volume = e.target.value / 100;
    audioPlayer.current.volume = volume;
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, `app/content`), (querySnapshot) => {
      const radioData = querySnapshot.data().radioData[0];
      setRadioData(radioData);
    });
    return () => unsubscribe;
  }, []);

  useEffect(() => {
    audioPlayer.current.load();
    const prevValue = isPlaying;
    prevValue ? audioPlayer.current.play() : audioPlayer.current.pause();
  }, [radioData]);

  return (
    <Col className="px-0 d-flex align-items-start">
      <Col className="d-flex">
        <Col className="bg-dark ftr-icon-cont col-auto d-flex align-items-center p-1">
          <Image
            className="h-100"
            src={EscuchameEntreElRuidoLogo}
            alt="Escuchame Ente El Ruido"
          />
        </Col>
        <Col className="text-light text-truncate">
          <Row className="row-cols-auto m-0">
            <Col
              className="bg-dark rounded px-1 ms-1 fw-semibold d-flex align-items-center"
              style={{ fontSize: "0.75rem" }}
            >
              <Col
                className="d-flex align-items-center "
                style={{ fontSize: "0.5rem" }}
              >
                {isPlaying ? (
                  <Spinner className="me-1" animation="grow" size="sm" />
                ) : (
                  <Dot className="me-1"></Dot>
                )}
              </Col>
              <small>{radioData.title}</small>
            </Col>
          </Row>
          <Col className="ps-2" style={{ fontSize: "0.75rem" }}>
            <small>{radioData.text}</small>
          </Col>
        </Col>
      </Col>
      <Col className="d-flex justify-content-start align-items-center flex-column col-auto">
        <audio ref={audioPlayer} src={radioSrc}></audio>
        <Col className="d-flex align-items-center">
          <SkipBackwardFill
            onClick={handleBackward}
            className="cstm-btn text-light me-2"
            style={{ fontSize: "2.25vh" }}
          />
          <Col
            className="cstm-btn bg-dark rounded-circle text-light d-flex justify-content-center align-items-center play-btn col-auto"
            style={{ height: "6vh", width: "6vh" }}
            onClick={handleTogglePlayPause}
          >
            {isPlaying ? (
              <PauseFill style={{ fontSize: "4.5vh" }} />
            ) : (
              <PlayFill style={{ fontSize: "4.5vh" }} />
            )}
          </Col>
          <SkipForwardFill
            onClick={handleForward}
            className="cstm-btn text-light ms-2"
            style={{ fontSize: "2.25vh" }}
          />
        </Col>
        <Col className="col-auto d-flex align-items-center">
          <input type="range" onChange={handleVolume} className="w-auto" />
        </Col>
      </Col>
      <Col></Col>
    </Col>
  );
};

export default Player;
