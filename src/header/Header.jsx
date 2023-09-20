import AvalanchaLogo from "../assets/avalancha-logo.png";
import { Navbar, Image, Col } from "react-bootstrap";

function Header() {
  return (
    <header>
      <Navbar className="d-flex align-items-center justify-content-center hdr-lgo-cont p-0 bg-blur shadow flex-column">
        <Image src={AvalanchaLogo} alt="Avalancha Logo" className="h-25" />
        <Col className="justify-content-center col-12 text-center">
          <h1 className="h-50 mb-0 text-light fs-5">
            <b className="fw-semibold lh-1">Escuchame entre el ruido</b>
          </h1>
          <h2 className="h-50 mb-0 text-light fs-6">
            <em className="lh-1 fw-light">tu programa de rock</em>
          </h2>
        </Col>
      </Navbar>
    </header>
  );
}

export default Header;
