import AvalanchaLogo from "../assets/avalancha-logo.png";
import { Navbar, Image } from "react-bootstrap";

function Header() {
  return (
    <header>
      <Navbar className="d-flex align-items-center justify-content-center hdr-lgo-cont p-0 bg-blur shadow">
        <Image src={AvalanchaLogo} alt="Avalancha Logo" className="h-50" />
      </Navbar>
    </header>
  );
}

export default Header;
