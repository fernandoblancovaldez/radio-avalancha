import { Col, Button } from "react-bootstrap";
import {
  PlayFill,
  PauseFill,
  SkipBackwardFill,
  SkipForwardFill,
} from "react-bootstrap-icons";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";

const Player = () => {
  const [radioData, setRadioData] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  console.log(radioData);
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, `app/content`), (querySnapshot) => {
      const radioData = querySnapshot.data().radioData[0];
      setRadioData(radioData);
    });
    return () => unsubscribe;
  }, []);
  return (
    <Col className="player p-0">
      <audio src /* "http://giss.tv:8000/acbradio.mp3" */="/api/"></audio>
      <Button
        variant="outline-light"
        className="btn-sm border-0 rounded-circle"
      >
        <SkipBackwardFill />
      </Button>
      <Button
        variant="outline-light"
        className="btn-sm border-0 rounded-circle"
      >
        {isPlaying ? <PauseFill /> : <PlayFill />}
      </Button>
      <Button
        variant="outline-light"
        className="btn-sm border-0 rounded-circle"
      >
        <SkipForwardFill />
      </Button>
    </Col>
  );
};

export default Player;
