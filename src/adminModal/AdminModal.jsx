import { useState } from "react";
import { UserAuth } from "../chat/context/AuthContext";
import {
  doc,
  deleteDoc,
  query,
  collection,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";

import { Button, Modal, Image, Col } from "react-bootstrap";

import { BoxArrowRight } from "react-bootstrap-icons";
import AvalanchaIcon from "../assets/icon-light.png";

const AdminModal = () => {
  const { currentUser, signInWithGoogle, logout } = UserAuth();
  const [show, setShow] = useState(false);
  const q = query(collection(db, "messages"), orderBy("createdAt"), limit(50));
  console.log(q);

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

  const handleClearChat = async () => {
    const q = query(collection(db, "messages"));

    await onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach(async (doc) => {
        try {
          await deleteDoc(doc);
        } catch (error) {
          console.log(error);
        }
      });
    });
  };

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
        {!currentUser ? (
          <Modal.Body>
            <Button className="btn-dark btn-sm" onClick={handleLogin}>
              Ingresar como administrador
            </Button>
          </Modal.Body>
        ) : (
          <Modal.Body className="d-flex justify-content-center">
            {currentUser.email !== "fernandoblancovaldez@gmail.com" ? (
              <Modal.Body>
                <p className="d-block">
                  No tienes autorización para administrar éste sitio pero puedes
                  participar del chat, bienvenido!
                </p>
                <Button
                  variant="dark"
                  className="btn-sm d-flex justify-content-center align-items-center"
                  onClick={handleLogout}
                >
                  <BoxArrowRight />
                </Button>
              </Modal.Body>
            ) : (
              <Modal.Body>
                <p className="d-block fw-bold">
                  {currentUser.displayName}, bienvenido !
                </p>
                <br />
                <Button
                  variant="danger"
                  onClick={handleClearChat}
                  className="btn-sm d-flex justify-content-center align-items-center"
                >
                  Limpiar chat
                </Button>
                <Button
                  variant="dark"
                  className="btn-sm d-flex justify-content-center align-items-center"
                  onClick={handleLogout}
                >
                  <BoxArrowRight />
                </Button>
              </Modal.Body>
            )}
          </Modal.Body>
        )}

        <Modal.Footer>
          <Button className="btn-sm" variant="secondary" onClick={handleClose}>
            Volver
          </Button>
          {currentUser &&
            currentUser.email === "fernandoblancovaldez@gmail.com" && (
              <Button
                className="btn-sm"
                variant="primary"
                onClick={handleClose}
              >
                Guardar cambios
              </Button>
            )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminModal;
