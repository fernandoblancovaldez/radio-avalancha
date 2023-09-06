import { Col } from "react-bootstrap";

import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";

const Player = () => {
  const [radioData, setRadioData] = useState([]);

  console.log(radioData);
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, `app/content`), (querySnapshot) => {
      const radioData = querySnapshot.data().radioData[0];
      setRadioData(radioData);
    });
    return () => unsubscribe;
  }, []);
  return <Col className="player"></Col>;
};

export default Player;

<Col className="p-0 d-flex align-items-center ">
  <audio controls>
    <source
      src /* "http://giss.tv:8000/acbradio.mp3" */="/api/"
      type="audio/mpeg"
    />
  </audio>
</Col>;
