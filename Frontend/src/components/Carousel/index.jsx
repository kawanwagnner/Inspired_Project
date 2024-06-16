import React, { useState } from "react";
import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faStar } from "@fortawesome/free-solid-svg-icons";

import ricardo from "./assets/img/RicardoF.jpg";
import joao from "./assets/img/joao.jpg";
import emerson from "./assets/img/Emerson.jpg";
import LucasMoedas from "./assets/img/LucasMoedas.jpg";
import Lucas from "./assets/img/LucasSantana.jpg";
import kawan from "./assets/img/Kawan.jpg";

import "./assets/css/style.css";

export default function ResponsiveDemo() {
  const [products] = useState([
    { name: "Ricardo Filho", image: ricardo },
    { name: "João Pedro", image: joao },
    { name: "Emerson", image: emerson },
    { name: "Lucas Santana", image: Lucas },
    { name: "Lucas Rosato", image: LucasMoedas },
    { name: "Kawan Wnn", image: kawan },
  ]);

  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const productTemplate = (product) => {
    return (
      <div className="container-carousel">
        <div className="image-content">
          <img
            src={product.image}
            alt={product.name}
            className="w-6 shadow-2"
          />
        </div>
        <div>
          <h4 className="name">{product.name}</h4>
          <div className="icons">
            <Button className="p-button p-button-rounded">
              <FontAwesomeIcon icon={faSearch} />
            </Button>
            <Button className="p-button-success p-button-rounded">
              <FontAwesomeIcon icon={faStar} />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="card">
      <Carousel
        value={products}
        numScroll={1}
        numVisible={3}
        responsiveOptions={responsiveOptions}
        itemTemplate={productTemplate}
      />
    </div>
  );
}
