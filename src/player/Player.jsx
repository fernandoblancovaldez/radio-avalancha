import { Row, Col, Button, Badge } from "react-bootstrap";
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
    <Col className="p-0 d-flex flex-column">
      <Col className="px-1 d-flex align-items-center flex-grow-1">
        <Col className="text-light">
          <Col>
            <Col>
              <Badge bg="dark">{radioData.title}</Badge>
            </Col>
            <Col className="ps-2">
              <small>{radioData.text}</small>
            </Col>
          </Col>
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <audio
            ref={audioPlayer}
            src="http://giss.tv:8000/acbradio.mp3" /* ="/api/" */
          ></audio>
          <Col className="col-auto d-flex">
            <Col className="cstm-btn text-light">
              <SkipBackwardFill onClick={handleBackward} />
            </Col>
            <Col
              className="cstm-btn bg-dark rounded-circle text-light"
              onClick={handleTogglePlayPause}
            >
              {isPlaying ? <PauseFill size={30} /> : <PlayFill size={30} />}
            </Col>
            <Col className="cstm-btn text-light">
              <SkipForwardFill onClick={handleForward} className="" />
            </Col>
          </Col>
        </Col>
        <Col></Col>
      </Col>
      <Col className="text-center lh-1 text-light flex-grow-0">
        <small className="lh-1">
          &copy; 2023 <b className="fw-semibold lh-1">Avalancha </b>|
          <em className="lh-1"> Escuchame Entre el Ruido</em>
        </small>
      </Col>
    </Col>
  );
};

export default Player;
