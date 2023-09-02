import { Col, Container, Image } from "react-bootstrap";
import EscuchameEntreElRuidoLogo from "../assets/escuchame-entre-el-ruido.png";

const Player = () => {
  return (
    <Container className="player w-100 d-flex">
      <Col className="h-100 col-auto">
        <Image
          className="mh-100"
          src={EscuchameEntreElRuidoLogo}
          alt="Escuchame Ente El Ruido"
        />
      </Col>
    </Container>
  );
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
