import { Row, Col, Image } from "react-bootstrap";
import Player from "../player/Player";
import EscuchameEntreElRuidoLogo from "../assets/escuchame-entre-el-ruido.png";
import AdminModal from "../adminModal/AdminModal";

const Footer = () => {
  return (
    <footer>
      <Col>
        <Row className="m-0">
          <Col className="bg-dark png-cont col-auto d-flex align-items-center p-1">
            <Image
              className="h-75"
              src={EscuchameEntreElRuidoLogo}
              alt="Escuchame Ente El Ruido"
            />
          </Col>
          <Player />
          <AdminModal />
        </Row>
      </Col>
    </footer>
  );
};

export default Footer;
<footer
  id="footer"
  className="text-center text-light fixed-bottom bg-blur d-flex"
></footer>;
