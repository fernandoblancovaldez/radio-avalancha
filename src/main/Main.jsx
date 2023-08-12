import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import Slide1 from "../assets/slide1.jpeg";
/* import Slide2 from "../assets/slide2.jpeg";
import Slide3 from "../assets/slide3.jpeg"; */

const Main = () => {
  return (
    <main className="w-100">
      <Container>
        <Row className="mx-0">
          <Col className="col-12 col-lg-4">
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
                  src={Slide1}
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
                  src={Slide1}
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
          <Col>chat</Col>
        </Row>
      </Container>
    </main>
  );
};

export default Main;
