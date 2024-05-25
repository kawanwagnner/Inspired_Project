import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import aspas1 from "./img/aspas1.png";
import aspas2 from "./img/aspasbaixo2.png";
import profile from "./img/profile.png";
import BgHands from "./img/bg-maos.png";
import BgWindow from "./img/bg2-janela.png";
import "./css/style.css";

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadScripts = async () => {
      const script1 = document.createElement("script");
      script1.src = "https://unpkg.com/gsap@3/dist/gsap.min.js";
      script1.async = true;
      document.body.appendChild(script1);

      const script2 = document.createElement("script");
      script2.src = "https://unpkg.com/gsap@3/dist/ScrollTrigger.min.js";
      script2.async = true;
      document.body.appendChild(script2);

      script2.onload = () => {
        const script3 = document.createElement("script");
        script3.src = "/main.js";
        script3.async = true;
        script3.onload = () => setIsLoaded(true);
        document.body.appendChild(script3);
      };
    };

    loadScripts();

    return () => {
      // Remove os scripts ao desmontar o componente, se necessário
    };
  }, []);

  return (
    <>
      <Helmet>
        <html lang="pt-br" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://codepen.io/GreenSock/pen/xxmzBrw.css"
        />
        <link rel="stylesheet" href="style.css" />
        <title>Art</title>
      </Helmet>
      <div className={`wrapper ${isLoaded ? "loaded" : ""}`}>
        <div className="content">
          <section className="section hero"></section>
          <section className="section gradient-purple"></section>
          <section className="section gradient-blue"></section>
        </div>
        <div className="image-container">
          <img src={BgWindow} alt="image" />
        </div>
      </div>
    </>
  );
};

export default Home;
