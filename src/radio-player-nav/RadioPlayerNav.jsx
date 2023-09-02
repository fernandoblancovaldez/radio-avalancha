import AvalanchaLogo from "../assets/avalancha-logo.png";
//import EscuchameEntreElRuidoLogo from "../assets/escuchame-entre-el-ruido.png";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
//import Row from "react-bootstrap/Row";
//import Col from "react-bootstrap/Col";

function RadioPlayerNav() {
  return (
    <header className="fixed-top bg-blur">
      <Navbar
        className="p-0 shadow bg-dark bg-body-tertiary"
        bg="transparent"
        expand="lg"
      >
        <Container className="px-lg-0">
          <Navbar.Brand className="m-auto p-0 fs-4 fw-light d-flex align-items-center justify-content-center">
            <Image src={AvalanchaLogo} alt="Avalancha Logo" className="h-50" />
          </Navbar.Brand>
        </Container>
      </Navbar>
    </header>
  );
}

export default RadioPlayerNav;

//<Navbar.Toggle aria-controls="basic-navbar-nav" />
//          <Navbar.Collapse id="basic-navbar-nav">
//            <Row className="navbar-nav mx-0 w-100">
//              <Col className="ms-lg-auto p-0 col-lg-2 d-flex align-items-center justify-content-center">
//                <Image
//                  src={EscuchameEntreElRuidoLogo}
//                  fluid
//                  alt="Escuchame Ente El Ruido"
//                  className="w-50 h-75"
//                  rounded
//                  style={{
//                    objectFit: "contain",
//                  }}
//                />
//              </Col>
//              <Col className="p-0 col-lg-4 d-flex align-items-center justify-content-center">
//                <audio controls>
//                  <source
//                    src /* "http://giss.tv:8000/acbradio.mp3" */="/api/"
//                    type="audio/mpeg"
//                  />
//                </audio>
//              </Col>
//            </Row>
//          </Navbar.Collapse>
