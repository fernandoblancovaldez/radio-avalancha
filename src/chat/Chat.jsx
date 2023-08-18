import { useState } from "react";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const Chat = () => {
  const [value, setValue] = useState("");

  const messages = [
    {
      id: 1,
      nombre: "Fulano",
      message: "Mensaje 1",
    },
    {
      id: 2,
      nombre: "Mengano",
      message: "Mensaje 2",
    },
    {
      id: 3,
      nombre: "Juan",
      message: "Mensaje 3",
    },
    {
      id: 4,
      nombre: "Manuel",
      message: "Mensaje 4",
    },
    {
      id: 5,
      nombre: "Fabrizio",
      message: "Mensaje 5",
    },
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log(value);
    setValue("");
    document.querySelector("#input-text").value = null;
  };

  return (
    <Stack gap={2} className="chat ">
      <FloatingLabel controlId="floatingNombre" label="Nombre">
        <Form.Control type="nombre" placeholder="Nombre" />
      </FloatingLabel>
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
      </form>
      <Container className="chat-rom gap-1">
        {messages.map((message) => (
          <>
            <Row xs="auto" className="mx-0">
              <Col className="my-auto">
                <Badge pill bg="dark" text="white" key={message.id}>
                  {message.id}
                </Badge>
              </Col>
              <Col>
                <Row className="small text-light text-start">
                  {message.nombre} dice:
                </Row>
                <Row>
                  <Badge
                    className="text-start fs-6"
                    bg="dark"
                    text="white"
                    key={message.id}
                  >
                    {message.message}
                  </Badge>
                </Row>
              </Col>
            </Row>
          </>
        ))}
      </Container>
    </Stack>
  );
};

export default Chat;
