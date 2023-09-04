import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Slide1 from "../assets/slide1.jpeg";
import Slide2 from "../assets/slide2.jpeg";
import Slide3 from "../assets/slide3.jpeg";
import Chat from "../chat/Chat";

const Main = () => {
  return (
    <main className="w-100">
      <Container className="px-0">
        <Row className="mx-3 gap-3">
          <Col className="col-12 px-0">
            <Carousel>
              <Carousel.Item>
                <Image
                  src={Slide1}
                  text="Primer Slide"
                  className="d-block w-100"
                  rounded
                />
                <Carousel.Caption>
                  <h3>Flyer 1</h3>
                  <p>Breve descripcion del evento.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <Image
                  src={Slide2}
                  text="Segundo Slide"
                  className="d-block w-100"
                  rounded
                />
                <Carousel.Caption>
                  <h3>Flyer 2</h3>
                  <p>Breve descripcion del evento.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <Image
                  src={Slide3}
                  text="Tercer Slide"
                  className="d-block w-100"
                  rounded
                />
                <Carousel.Caption>
                  <h3>Flyer 3</h3>
                  <p>Breve descripcion del evento.</p>
                </Carousel.Caption>
              </Carousel.Item>
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
