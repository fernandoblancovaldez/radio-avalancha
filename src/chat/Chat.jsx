import { useEffect, useRef, useState } from "react";
import { UserAuth } from "./context/AuthContext";
import { onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

import { Button, Row, Col, Container, Image } from "react-bootstrap";
import { BoxArrowRight } from "react-bootstrap-icons";

const Chat = () => {
  const messagesEndRef = useRef();
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);
  const { currentUser, signInWithGoogle, logout } = UserAuth();

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => scrollToBottom, [messages]);

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

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (value.trim() === "") {
      alert("Ingrese un mensaje válido !");
      return;
    }

    try {
      const { uid, displayName, photoURL } = currentUser;
      const newMsg = {
        text: value,
        name: displayName,
        avatar: photoURL,
        uid: uid,
        createdAt: new Date(),
      };

      const refDoc = doc(db, `chat/messages`);
      await updateDoc(refDoc, { msgsList: [...messages, newMsg] });
    } catch (error) {
      console.log(error);
    }

    setValue("");
    document.querySelector("#input-text").value = null;
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, `chat/messages`),
      (querySnapshot) => {
        const messages = querySnapshot.data().msgsList;
        setMessages(messages);
      }
    );
    return () => unsubscribe;
  }, []);

  return (
    <>
      <Container className="chat-rom gap-3 px-1">
        {messages.map((message) => (
          <Row
            className={`mx-0 ${
              currentUser && message.uid === currentUser.uid
                ? "justify-content-end"
                : ""
            }`}
            key={message.createdAt.seconds}
          >
            <Col
              className={`avatar col-auto p-0 m-2 ${
                currentUser && message.uid === currentUser.uid
                  ? "order-last"
                  : ""
              }`}
            >
              <Image src={message.avatar} roundedCircle />
            </Col>
            <Col className="">
              <Row className="row-cols-auto small text-light fw-lighter">
                <span
                  className={`px-0 lh-1 pb-1 ${
                    currentUser && message.uid === currentUser.uid
                      ? "ms-auto text-end"
                      : ""
                  }`}
                >
                  {message.name} dice:
                </span>
              </Row>
              <Row className="row-cols-auto">
                <span
                  className={`fs-6 fw-normal text-light rounded  lh-1 py-1 ${
                    currentUser && message.uid === currentUser.uid
                      ? "ms-auto text-end  bg-secondary ps-2 pe-1 bg-opacity-50"
                      : " bg-dark ps-1 pe-2 bg-opacity-75"
                  }`}
                  key={message.createdAt.seconds}
                >
                  {message.text}
                </span>
              </Row>
            </Col>
          </Row>
        ))}
        <div ref={messagesEndRef}></div>
      </Container>
      {currentUser ? (
        <form
          className="input-group input-group-sm"
          onSubmit={handleSendMessage}
        >
          <input
            required
            id="input-text"
            className="form-control"
            type="text"
            placeholder="Mensaje"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button className="btn-sm" variant="dark" type="submit">
            Enviar
          </Button>
          <Button
            variant="dark"
            className="btn-sm d-flex justify-content-center align-items-center"
            onClick={handleLogout}
          >
            <BoxArrowRight />
          </Button>
        </form>
      ) : (
        <Button className="btn-sm" variant="dark" onClick={handleLogin}>
          Ingresar al chat
        </Button>
      )}
    </>
  );
};

export default Chat;
