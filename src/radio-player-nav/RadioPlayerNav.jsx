import AvalanchaLogo from "../assets/avalancha-logo.jpg";
import EscuchameEntreElRuidoLogo from "../assets/escuchame-entre-el-ruido.jpg";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function RadioPlayerNav() {
  const api = "https://giss.tv:8000/amparo.mp3";
  return (
    <header className="fixed-top bg-blur">
      <Navbar
        className="p-0 shadow bg-dark bg-body-tertiary"
        bg="transparent"
        expand="lg"
      >
        <Container className="">
          <Navbar.Brand className="my-1 mx-auto fs-4 fw-light d-flex align-items-center justify-content-center">
            <Image src={AvalanchaLogo} height="50" alt="Avalancha Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Row className="navbar-nav ms-lg-auto">
              <Col className="ms-lg-auto py-3 col-lg-2 d-flex align-items-center justify-content-center">
                <Image
                  src={EscuchameEntreElRuidoLogo}
                  thumbnail
                  rounded
                  alt="Escuchame Ente El Ruido"
                />
              </Col>
              <Col className="py-3 col-lg-4 d-flex align-items-center justify-content-center">
                <audio controls>
                  <source src={api} type="audio/mpeg" />
                </audio>
              </Col>
            </Row>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default RadioPlayerNav;
