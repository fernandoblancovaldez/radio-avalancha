import { useEffect, useState } from "react";
import { UserAuth } from "../chat/context/AuthContext";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase";

import {
  Button,
  Modal,
  Image,
  Col,
  Form,
  Row,
  Container,
  Card,
} from "react-bootstrap";
import { BoxArrowRight, PlusCircleFill, DashLg } from "react-bootstrap-icons";
import AvalanchaIcon from "../assets/icon-light.png";

const AdminModal = () => {
  const { currentUser, signInWithGoogle, logout } = UserAuth();
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([]);

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

  const handleAddPost = async (e) => {
    e.preventDefault();
    try {
      const title = e.target.postTitle.value;
      const text = e.target.postText.value;
      const localFile = e.target.postFile.files[0];
      await uploadBytes(ref(storage, `imgs/${localFile.name}`), localFile);
      const url = await getDownloadURL(ref(storage, `imgs/${localFile.name}`));
      const newPost = {
        id: +new Date(),
        title,
        text,
        fileName: localFile.name,
        fileUrl: url,
      };

      const refDoc = doc(db, `app/content`);
      await updateDoc(refDoc, { posts: [...posts, newPost] });
    } catch (error) {
      console.log(error);
    }

    e.target.postTitle.value = "";
    e.target.postText.value = "";
    e.target.postFile.value = "";
  };

  const handleDeletePost = async (pst) => {
    const newPosts = posts.filter((el) => el.id !== pst.id);
    const refDoc = doc(db, `app/content`);
    await updateDoc(refDoc, { posts: [...newPosts] });
    const fileRef = ref(storage, `imgs/${pst.fileName}`);
    await deleteObject(fileRef);
  };

  const handleAddRadioData = async (e) => {
    e.preventDefault();
    try {
      const title = e.target.radioDataTitle.value;
      const text = e.target.radioDataText.value;
      const newData = {
        id: +new Date(),
        title,
        text,
      };

      const refDoc = doc(db, `app/content`);
      await updateDoc(refDoc, { radioData: [newData] });
    } catch (error) {
      console.log(error);
    }

    e.target.radioDataTitle.value = "";
    e.target.radioDataText.value = "";
  };

  const handleClearChat = async () => {
    try {
      const refDoc = doc(db, `app/chat`);
      await updateDoc(refDoc, { messages: [] });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, `app/content`), (querySnapshot) => {
      const posts = querySnapshot.data().posts;
      setPosts(posts);
    });
    return () => unsubscribe;
  }, []);

  return (
    <>
      <Col className="ftr-icon-cont d-flex align-items-center p-1 admn-btn ">
        <Image
          className="h-75 mx-auto"
          src={AvalanchaIcon}
          alt="Escuchame Ente El Ruido"
          onClick={handleShow}
        />
      </Col>

      <Modal centered backdrop="static" show={show} onHide={handleClose}>
        <Modal.Header closeButton className="py-2 px-3">
          <Modal.Title>Panel de Administrador</Modal.Title>
        </Modal.Header>
        {!currentUser ? (
          <Modal.Body className="d-flex align-items-center justify-content-center p-2">
            <Button className="btn-dark btn-sm" onClick={handleLogin}>
              Ingresar como administrador
            </Button>
          </Modal.Body>
        ) : (
          <Modal.Body className="modal-dialog-scrollable py-2 px-3">
            {currentUser.email !== "ccastronuevo@gmail.com" ? (
              <>
                <p className="d-block">
                  No tienes autorización para administrar éste sitio pero puedes
                  participar del chat, bienvenido!
                </p>
                <Button
                  variant="dark"
                  className="btn-sm d-flex justify-content-center align-items-center mx-auto p-2 rounded-circle"
                  onClick={handleLogout}
                >
                  <BoxArrowRight />
                </Button>
                <div className="text-center fs-6 fw-light">cerrar sesión</div>
              </>
            ) : (
              <>
                <p className="d-block fw-bold mb-2">
                  {currentUser.displayName}, bienvenido !
                </p>
                <Container className="mb-2">
                  <Form onSubmit={handleAddPost}>
                    <Row className="gap-1 align-items-center">
                      <Col className="col-12 p-0">
                        <Form.Control
                          type="text"
                          placeholder="Ingresa el tÏtulo del nuevo Flyer"
                          id="postTitle"
                          required
                        />
                      </Col>
                      <Col className="col-12 p-0">
                        <Form.Control
                          type="text"
                          placeholder="Ingresa el texto del nuevo Flyer"
                          id="postText"
                          required
                        />
                      </Col>
                      <Col className="p-0">
                        <Form.Control
                          required
                          type="file"
                          placeholder="Añade archivo"
                          id="postFile"
                        />
                      </Col>
                      <Col xs="auto" className="p-0 ms-auto">
                        <Button
                          type="submit"
                          size="sm"
                          variant="success"
                          className="d-flex mx-auto p-1"
                        >
                          <PlusCircleFill size="1rem" />
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Container>
                <Container className="m-0 row">
                  {posts.map((pst) => {
                    return (
                      <Card key={pst.id} className="p-0 b-0 fluid-card">
                        <Card.Img
                          style={{ maxHeight: "7rem", objectFit: "contain" }}
                          src={pst.fileUrl}
                          alt={pst.title}
                          className="my-auto"
                        />
                        <Card.ImgOverlay className="p-0">
                          <Button
                            onClick={() => {
                              handleDeletePost(pst);
                            }}
                            className="btn-sm btn-danger d-flex justify-content-center align-items-center p-1 rounded-circle m-1"
                          >
                            <DashLg />
                          </Button>
                        </Card.ImgOverlay>
                      </Card>
                    );
                  })}
                </Container>
                <Container className="my-2">
                  <Form onSubmit={handleAddRadioData}>
                    <Row className="gap-1 align-items-center">
                      <Col className="col-12 p-0">
                        <Form.Control
                          type="text"
                          placeholder="Ingresar el título del Programa"
                          id="radioDataTitle"
                          required
                        />
                      </Col>
                      <Col className="p-0">
                        <Form.Control
                          type="text"
                          placeholder="Ingresar el subtítulo del Programa"
                          id="radioDataText"
                          required
                        />
                      </Col>
                      <Col className="p-0 ms-auto col-auto">
                        <Button
                          type="submit"
                          size="sm"
                          variant="success"
                          className="d-flex mx-auto p-1"
                        >
                          <PlusCircleFill size="1rem" />
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Container>
                <Button
                  variant="danger"
                  onClick={handleClearChat}
                  className="btn-sm d-flex justify-content-center align-items-center mx-auto mb-2"
                >
                  Limpiar chat
                </Button>
                <Button
                  variant="dark"
                  className="btn-sm d-flex justify-content-center align-items-center  mx-auto p-2 rounded-circle "
                  onClick={handleLogout}
                >
                  <BoxArrowRight />
                </Button>
                <div className="text-center fs-6 fw-light">cerrar sesión</div>
              </>
            )}
          </Modal.Body>
        )}

        <Modal.Footer className="py-2 px-3">
          <Button className="btn-sm" variant="secondary" onClick={handleClose}>
            Volver
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminModal;
