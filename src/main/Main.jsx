import { Carousel, Container, Col, Image, Button } from "react-bootstrap";
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
    <main className="w-100 flex-grow-1 d-flex">
      <Container className="my-2 px-0 flex-grow-1 d-flex flex-column gap-1">
        <Col className="px-0 flex-grow-1">
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
                    {pst.title.length > 0 && (
                      <h3 className="fs-5 fw-semibold mb-1">{pst.title}</h3>
                    )}
                    {pst.text.length > 0 && (
                      <p className="fs-6 fw-light mb-1 lh-1">{pst.text}</p>
                    )}
                    <Button
                      variant="outline-light"
                      className="btn-sm rounded-circle p-2"
                      href={pst.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Col className="d-flex align-items-center">
                        <Download />
                      </Col>
                    </Button>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Col>
        <Col className="px-1 px-lg-0 gap-2 chat vstack flex-grow-1">
          <Chat />
        </Col>
      </Container>
    </main>
  );
};

export default Main;
