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
  CardGroup,
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
      console.log(posts);
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
      console.log(posts);
    });
    return () => unsubscribe;
  }, []);

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
          <Modal.Body className="d-flex align-items-center justify-content-center">
            <Button className="btn-dark btn-sm" onClick={handleLogin}>
              Ingresar como administrador
            </Button>
          </Modal.Body>
        ) : (
          <Modal.Body className="d-flex justify-content-center modal-dialog-scrollable">
            {currentUser.email !== "fernandoblancovaldez@gmail.com" ? (
              <Modal.Body>
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
              </Modal.Body>
            ) : (
              <Modal.Body>
                <p className="d-block fw-bold">
                  {currentUser.displayName}, bienvenido !
                </p>
                <Container className="mb-3">
                  <Form onSubmit={handleAddPost}>
                    <Row className="gap-1 align-items-center">
                      <Col className="col-12 p-0">
                        <Form.Control
                          type="text"
                          placeholder="Ingresar título del post"
                          id="postTitle"
                          required
                          size="sm"
                        />
                      </Col>
                      <Col className="col-12 p-0">
                        <Form.Control
                          type="text"
                          placeholder="Ingresar texto del post"
                          id="postText"
                          required
                          size="sm"
                        />
                      </Col>
                      <Col className="p-0">
                        <Form.Control
                          required
                          type="file"
                          placeholder="Añade archivo"
                          id="postFile"
                          size="sm"
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
                <Container className="mb-3">
                  <CardGroup className="row justify-content-evenly gap-1">
                    {posts.map((pst) => {
                      console.log(pst.id);
                      return (
                        <Card key={pst.id} className="col-3 p-0 m-0">
                          <Card.Img
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
                  </CardGroup>
                </Container>
                <Button
                  variant="danger"
                  onClick={handleClearChat}
                  className="btn-sm d-flex justify-content-center align-items-center mx-auto mb-3"
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
