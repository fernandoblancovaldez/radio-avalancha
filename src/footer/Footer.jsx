import Player from "../player/Player";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="text-center text-light fixed-bottom bg-blur d-grid"
    >
      <Player />
      <small>
        &copy; 2023 <b className="fw-semibold">Avalancha </b>|
        <em> Escuchame Entre el Ruido</em>
      </small>
    </footer>
  );
};

export default Footer;
