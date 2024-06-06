import { useState, useEffect } from "react";
import axios from "axios";
import profile from "./img/profile.png";
import aspasParaCima from "./img/aspas1.png";
import aspasParaBaixo from "./img/aspasbaixo2.png";
import vanGogh from "./img/van-gogh.png";

import "./css/home.css";
import "./css/aboutUs.css";

const Home = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      const authToken = localStorage.getItem("authToken");
      const storedEmail = localStorage.getItem("userEmail");

      if (authToken && storedEmail) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/auth/user/${storedEmail}`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );

          if (response.data && response.data.username) {
            const firstName = response.data.username.split(" ")[0]; // Extracting the first name
            setUserName(firstName);
          }
        } catch (error) {
          console.error("Erro ao buscar nome do usuário:", error);
        }
      }
    };

    fetchUserName();
  }, []);

  return (
    <>
      <section id="home">
        <header>
          <img src={profile} width="50px" alt="profile" />
          <a className="signIn" href={userName ? "/profile" : "/signIn"}>
            <p>{userName ? userName : "Login"}</p>
          </a>
        </header>

        <div className="container-position">
          <div className="container-content">
            <img
              src={aspasParaCima}
              className="left-aspas"
              width="130px"
              alt="aspas para cima"
            />
            <h2 className="title2">INOVATION</h2>
            <h1 className="title1">
              Bem vindo <span className="title_OF">AO</span> Inspired
            </h1>
            <img
              src={aspasParaBaixo}
              className="right-aspas"
              width="130px"
              alt="aspas para baixo"
            />
            <a href="signUp">
              <h3 className="signUp">CADASTRAR-SE</h3>
            </a>
          </div>
        </div>
      </section>

      <section className="aboutUs">
        <div className="container-aboutUs">
          <img src={vanGogh} width="720px" height="578px" alt="" />
          <div className="sobre-text-align">
            <ul id="list-sobre-texts">
              <li>
                <h1 id="sobre-title">Aqui a arte ganha vida</h1>
              </li>
              <li>
                <h3 id="sobre-text">
                  Somos uma rede social criada exclusivamente para artistas de
                  todos os gêneros e formas de expressão, proporcionando um
                  espaço seguro e inspirador para compartilhar, colaborar e
                  crescer
                </h3>
              </li>
              <li>
                <h2 id="sobre-subtitle">
                  Na nossa rede social, você tem liberdade de mostrar seu
                  trabalho em todas as suas formas
                </h2>
              </li>
            </ul>

            <div className="sobre-buttons">
              <ul>
                <li>
                  <button>Desenhos</button>
                </li>
                <li>
                  <button>Fotografias</button>
                </li>
                <li>
                  <button>Esculturas</button>
                </li>
                <li>
                  <button>Cinema</button>
                </li>
                <li>
                  <button>Tatuagens</button>
                </li>
                <li>
                  <button>Textos</button>
                </li>
                <li>
                  <button>Pinturas</button>
                </li>
                <li>
                  <button>Teatro</button>
                </li>
              </ul>
            </div>
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
