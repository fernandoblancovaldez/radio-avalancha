import AvalanchaLogo from "../assets/avalancha-logo.png";
import { Navbar, Image, Col } from "react-bootstrap";

function Header() {
  return (
    <header>
      <Navbar className="pt-3 d-flex align-items-center justify-content-center hdr-lgo-cont p-0 bg-blur shadow flex-column">
        <Image
          src={AvalanchaLogo}
          alt="Avalancha Logo"
          className="avalancha-logo"
        />
        <Col className="justify-content-center col-12 text-center">
          <h1 className="mb-0 text-light fs-1 h-50">
            <b className="fw-semibold">escuchame entre el ruido</b>
          </h1>
          <h2 className="mb-0 text-light fs-6">
            <small>
              <em className="lh-1 fw-light">- tu programa de rock -</em>
            </small>
          </h2>
        </Col>
      </Navbar>
    </header>
  );
}

export default Header;
