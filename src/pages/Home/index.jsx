import React from "react";

import profile from "./img/profile.png";
import aspasParaCima from "./img/aspas1.png";
import aspasParaBaixo from "./img/aspasbaixo2.png";
import imgAboutUs from "./img/img-about-us.jpg";

import "./css/home.css";

const Home = () => {
  return (
    <>
      <section id="home">
        <header>
          <img src={profile} width="50px" alt="image" />
          <a className="signIn" href="/signIn">
            <p>Login</p>
          </a>
        </header>

        <div className="container-position">
          <div className="container-content">
            <img
              src={aspasParaCima}
              className="left-aspas"
              width="130px"
              alt="image"
            />
            <h2 className="title2">INOVATION</h2>
            <h1 className="title1">
              Bem vindo <span className="title_OF">AO</span> Inspired
            </h1>
            <img
              src={aspasParaBaixo}
              className="right-aspas"
              width="130px"
              alt="image"
            />
            <a href="signUp">
              <h3 className="signUp">CADASTRAR-SE</h3>
            </a>
          </div>
        </div>
      </section>

      <section id="aboutUs">
        <h1 className="title">sobre nós</h1>
        <div className="container-aboutUs">
          <div className="image-container">
            <img src={imgAboutUs} alt="Art Gallery" />
          </div>

          <div className="text-container">
            <h1>Nosso Objetivo</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </section>

      <section className="exhibition">
        <div className="container-exhibition">
          <div className="heading">
            <h1 className="title">Micro Exposição</h1>
          </div>
          <div className="row">
            <div className="card">
              <div className="card-header">
                <h1>React</h1>
              </div>
              <div className="card-body">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Culpa, recusandae!
                </p>
                <a href="#" className="btn">
                  Read more
                </a>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h1>Vue</h1>
              </div>
              <div className="card-body">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Culpa, recusandae!
                </p>
                <a href="#" className="btn">
                  Read more
                </a>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h1>Angular</h1>
              </div>
              <div className="card-body">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Culpa, recusandae!
                </p>
                <a href="#" className="btn">
                  Read more
                </a>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h1>JQuery</h1>
              </div>
              <div className="card-body">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Culpa, recusandae!
                </p>
                <a href="#" className="btn">
                  Read more
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
