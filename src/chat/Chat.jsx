import { useEffect, useRef, useState } from "react";
import { UserAuth } from "./context/AuthContext";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  serverTimestamp,
  orderBy,
  limit,
} from "firebase/firestore";
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
      await addDoc(collection(db, "messages"), {
        text: value,
        name: displayName,
        avatar: photoURL,
        uid: uid,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }

    setValue("");
    document.querySelector("#input-text").value = null;
  };

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt"),
      limit(50)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });

      setMessages(messages);
    });
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
            key={message.id}
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
                  className={`px-0 ${
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
                  className={`fs-6 fw-normal bg-dark text-light rounded ${
                    currentUser && message.uid === currentUser.uid
                      ? "ms-auto text-end"
                      : ""
                  }`}
                  key={message.id}
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
        <form className="input-group" onSubmit={handleSendMessage}>
          <input
            id="input-text"
            className="form-control"
            type="text"
            placeholder="Mensaje"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button variant="dark" type="submit">
            Enviar
          </Button>
          <Button
            variant="dark"
            className="d-flex justify-content-center align-items-center"
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
