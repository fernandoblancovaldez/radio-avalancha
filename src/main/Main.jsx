import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";

import Slide1 from "../assets/slide1.jpeg";
import Slide2 from "../assets/slide2.jpeg";
import Slide3 from "../assets/slide3.jpeg";

const Main = () => {
  return (
    <main className="">
      <Carousel>
        <Carousel.Item>
          <Image
            src={Slide1}
            text="Primer Slide"
            rounded
            className="d-block w-50"
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
            rounded
            className="d-block w-50"
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
            rounded
            className="d-block w-50"
          />
          <Carousel.Caption>
            <h3>Flyer 3</h3>
            <p>Breve descripcion del evento.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </main>
  );
};

export default Main;
