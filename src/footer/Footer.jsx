import { Row, Col, Image } from "react-bootstrap";
import Player from "../player/Player";
import EscuchameEntreElRuidoLogo from "../assets/escuchame-entre-el-ruido.png";
import AdminModal from "../adminModal/AdminModal";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="text-center text-light fixed-bottom bg-blur d-flex"
    >
      <Col className="h-100 p-2 col-auto bg-dark">
        <Image
          className="mh-100"
          src={EscuchameEntreElRuidoLogo}
          alt="Escuchame Ente El Ruido"
        />
      </Col>
      <Row className="w-100">
        <Player />
        <Col className="col-12 d-flex justify-content-center align-items-center pb-2 col lh-1">
          <small className="lh-1">
            &copy; 2023 <b className="fw-semibold lh-1">Avalancha </b>|
            <em className="lh-1"> Escuchame Entre el Ruido</em>
          </small>
        </Col>
      </Row>
      <AdminModal />
    </footer>
  );
};

export default Footer;
