import { Col } from "react-bootstrap";
import Player from "../player/Player";

const Footer = () => {
  return (
    <footer>
      <Player />
      <Col
        className="text-center lh-1 text-light flex-grow-1 my-auto fixed-bottom bg-blur"
        style={{ fontSize: "0.75rem" }}
      >
        <p className="m-0">
          <small className="lh-1">
            &copy; 2023 <b className="fw-semibold lh-1">Avalancha </b>|
            <em className="lh-1"> Escuchame Entre el Ruido</em>
          </small>
        </p>
      </Col>
    </footer>
  );
};

export default Footer;
