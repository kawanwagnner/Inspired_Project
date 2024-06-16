import React, { useState } from "react";
import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faStar } from "@fortawesome/free-solid-svg-icons";

import ricardo from "./img/RicardoF.jpg";
import joao from "./img/joao.jpg";
import emerson from "./img/Emerson.jpg";
import LucasMoedas from "./img/LucasMoedas.jpg";
import Lucas from "./img/LucasSantana.jpg";
import kawan from "./img/Kawan.jpg";

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
      <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
        <div className="mb-3">
          <img
            src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`}
            alt={product.name}
            className="w-6 shadow-2"
          />
        </div>
        <div>
          <h4 className="mb-1">{product.name}</h4>
          <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
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
