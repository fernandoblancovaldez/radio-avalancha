import { useEffect, useRef, useState } from "react";
import { UserAuth } from "./context/AuthContext";
import { onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

import { Button, Row, Col, Container, Image } from "react-bootstrap";
import { BoxArrowRight } from "react-bootstrap-icons";

const Chat = () => {
  const messagesEndRef = useRef();
  const chatBoxRef = useRef();
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);

  const { currentUser, signInWithGoogle, logout } = UserAuth();

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    const { scrollHeight, scrollTop, clientHeight } = chatBoxRef.current;
    const adicional = clientHeight * 0.5;
    //console.log(scrollTop, clientHeight, scrollHeight, adicional);
    scrollTop + clientHeight + adicional >= scrollHeight
      ? scrollToBottom()
      : null;
  }, [messages]);

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
        id: new Date(),
        uid: uid,
        createdAt: new Date(),
        avatar: photoURL,
        name: displayName,
        text: value,
      };

      const refDoc = doc(db, `app/chat`);
      await updateDoc(refDoc, { messages: [...messages, newMsg] });
    } catch (error) {
      console.log(error);
    }

    document.querySelector("#input-text").value = null;
    setValue("");
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, `app/chat`), (querySnapshot) => {
      const messages = querySnapshot.data().messages;
      setMessages(messages);
    });
    return () => unsubscribe;
  }, []);

  return (
    <>
      <Container className="chat-rom gap-2 px-1 flex-grow-1" ref={chatBoxRef}>
        {messages.map((msg, index) => (
          <Row
            className={`mx-0 ${
              currentUser && msg.uid === currentUser.uid
                ? "justify-content-end "
                : ""
            }${index === 1 ? " active" : ""}`}
            key={msg.id}
          >
            <Col
              className={`avatar col-auto p-0 m-2 ${
                currentUser && msg.uid === currentUser.uid ? "order-last" : ""
              }`}
            >
              <Image src={msg.avatar} roundedCircle />
            </Col>
            <Col className="">
              <Row className="row-cols-auto small text-light fw-lighter">
                <span
                  className={`px-0 lh-1 pb-1 ${
                    currentUser && msg.uid === currentUser.uid
                      ? "ms-auto text-end"
                      : ""
                  }`}
                >
                  {msg.name} dice:
                </span>
              </Row>
              <Row className="row-cols-auto">
                <span
                  className={`fs-6 fw-normal text-light rounded  lh-1 py-1 ${
                    currentUser && msg.uid === currentUser.uid
                      ? "ms-auto text-end  bg-secondary ps-2 pe-1 bg-opacity-50"
                      : " bg-dark ps-1 pe-2 bg-opacity-75"
                  }`}
                >
                  {msg.text}
                </span>
              </Row>
            </Col>
          </Row>
        ))}
        <div ref={messagesEndRef}></div>
      </Container>
      {currentUser ? (
        <form className="input-group" onSubmit={handleSendMessage}>
          <input
            required
            id="input-text"
            className="form-control"
            type="text"
            placeholder="Escribe tu mensaje"
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
