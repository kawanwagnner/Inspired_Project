import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaGithub, FaInstagram } from "react-icons/fa";

import kawan from "./assets/img/Kawan.png";
import ricardo from "./assets/img/RicardoF.png";
import emerson from "./assets/img/Emerson.jpg";
import lucasM from "./assets/img/LucasMoedas.png";
import joao from "./assets/img/joao.png";
import lucas from "./assets/img/LucasSantana.png";

import "./assets/css/style.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const developers = [
  {
    name: "Kawan Wnn",
    image: kawan,
    github: "https://github.com/kawanwagnner",
    instagram: "https://instagram.com/kawan_wg.k",
  },
  {
    name: "Ricardo Filho",
    image: ricardo,
    github: "https://github.com/RicksDev",
    instagram: "https://instagram.com/ricardo.filho04",
  },
  {
    name: "Emerson Morales",
    image: emerson,
    github: "https://github.com/emersonjrdev",
    instagram: "https://instagram.com/emersxnsep",
  },
  {
    name: "Lucas Santos",
    image: lucasM,
    github: "https://github.com/lucassdolv",
    instagram: "https://instagram.com/ineffable.lucas",
  },
  {
    name: "João Pedro",
    image: joao,
    github: "https://github.com/JoaoP0liveira",
    instagram: "https://instagram.com/xdjoaopedro09",
  },
  {
    name: "Lucas Santana",
    image: lucas,
    github: "https://github.com/LucasRossatto",
    instagram: "https://instagram.com/rlucasrossatto",
  },
];

const DevelopersCarousel = (props) => {
  return (
    <Carousel
      swipeable={true}
      draggable={true}
      showDots={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlay={props.deviceType !== "mobile"}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      deviceType={props.deviceType}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {developers.map((developer, index) => (
        <div className="container-image" key={index}>
          <img src={developer.image} alt={`Imagem de ${developer.name}`} />
          <p className="name-developer">{developer.name}</p>
          <div className="social-medias">
            <a
              href={developer.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="github">
                <FaGithub />
              </div>
            </a>
            <a
              href={developer.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="instagram">
                <FaInstagram />
              </div>
            </a>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default DevelopersCarousel;
