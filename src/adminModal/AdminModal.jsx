import { useState } from "react";
import { UserAuth } from "../chat/context/AuthContext";

import { Button, Modal, Image, Col } from "react-bootstrap";
import AvalanchaIcon from "../assets/icon-light.png";

const AdminModal = () => {
  const { currentUser, signInWithGoogle, logout } = UserAuth();

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Col className="h-100 p-2 col-auto">
        <Image
          className="mh-100 admn-btn"
          src={AvalanchaIcon}
          alt="Escuchame Ente El Ruido"
          onClick={handleShow}
        />
      </Col>

      <Modal centered backdrop="static" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Panel de Administrador</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          <Button className="btn-dark btn-sm" onClick={handleLogin}>
            Ingresar como administrador
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-sm" variant="secondary" onClick={handleClose}>
            Volver
          </Button>
          <Button className="btn-sm" variant="primary" onClick={handleClose}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminModal;
