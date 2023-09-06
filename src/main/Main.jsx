import { Carousel, Container, Row, Col, Image, Button } from "react-bootstrap";
import { Download } from "react-bootstrap-icons";

import Chat from "../chat/Chat";

import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";

const Main = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, `app/content`), (querySnapshot) => {
      const posts = querySnapshot.data().posts;
      setPosts(posts);
    });
    return () => unsubscribe;
  }, []);
  return (
    <main className="w-100">
      <Container className="px-0">
        <Row className="mx-3 gap-3">
          <Col className="col-12 px-0">
            <Carousel>
              {posts.map((pst) => {
                return (
                  <Carousel.Item key={pst.id}>
                    <Image
                      src={pst.fileUrl}
                      text={pst.title}
                      className="d-block w-100"
                      rounded
                    />
                    <Carousel.Caption className="p-0">
                      <h3 className="fs-5 fw-normal mb-1">{pst.title}</h3>
                      <p className="fs-6 fw-light mb-1 lh-1">{pst.text}</p>
                      <Button
                        variant="outline-light"
                        className="btn-sm rounded-circle"
                        href={pst.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download />
                      </Button>
                    </Carousel.Caption>
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </Col>
          <Col className="px-lg-0 gap-3 chat vstack">
            <Chat />
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Main;
