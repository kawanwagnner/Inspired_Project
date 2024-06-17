import { useState, useEffect } from "react";
import profile from "./assets/img/profile.png";
import aspasParaCima from "./assets/img/aspas1.png";
import aspasParaBaixo from "./assets/img/aspasbaixo2.png";
import vanGogh from "./assets/img/van-gogh.png";
import logoFooter from "./assets/img/img-developers/inspired_White.png";
import DevelopersCarousel from "../../components/Carousel/index";

import "./assets/css/home.css";
import "./assets/css/aboutUs.css";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      setIsAuthenticated(true);
    }

    // Definindo um temporizador para limpar o localStorage após 3 horas
    const clearLocalStorageTimer = setTimeout(() => {
      localStorage.clear();
    }, 3 * 60 * 60 * 1000); // 3 horas em milissegundos

    // Limpando o temporizador ao desmontar o componente
    return () => clearTimeout(clearLocalStorageTimer);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/signIn"; // Redireciona para a página de login após o logout
  };

  return (
    <>
      <section id="home">
        <header
          className="header"
          style={{ display: "flex", alignItems: "center" }}
        >
          <img src={profile} width="50px" alt="profile" />
          {isAuthenticated ? (
            <button className="logoutButton" onClick={handleLogout}>
              Sair
            </button>
          ) : (
            <a className="signIn" href="/signIn">
              <p>Login</p>
            </a>
          )}
        </header>

        <div className="container-position">
          <div className="container-content">
            <img
              src={aspasParaCima}
              className="left-aspas"
              width="130px"
              alt="aspas para cima"
            />
            <h2 className="title2">INOVAÇÃO</h2>
            <h1 className="title1">
              Bem vindo <span className="title_OF">AO</span> Inspired
            </h1>
            <img
              src={aspasParaBaixo}
              className="right-aspas"
              width="130px"
              alt="aspas para baixo"
            />
            {isAuthenticated ? (
              <a href="/feed">
                <h3 className="signUp">EXPLORAR</h3>
              </a>
            ) : (
              <a href="/signUp">
                <h3 className="signUp">CADASTRAR-SE</h3>
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="aboutUs" id="aboutUs">
        <div className="heading">
          <h1 className="title">Sobre nós</h1>
        </div>
        <div className="container-aboutUs">
          <img src={vanGogh} width="720px" height="578px" alt="Van Gogh" />
          <div className="sobre-text-align">
            <ul id="list-sobre-texts">
              <li>
                <h1 id="sobre-title">Aqui a ARTE ganha vida🎨</h1>
              </li>
              <li>
                <h3 id="sobre-text">
                  Somos uma rede social criada exclusivamente para artistas de
                  todos os gêneros e formas de expressão, proporcionando um
                  espaço seguro e inspirador para compartilhar, colaborar e
                  crescer.
                </h3>
              </li>
              <li>
                <h2 id="sobre-subtitle">
                  Na nossa rede social, você tem liberdade de mostrar seu
                  trabalho em todas as suas formas.
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

      <section className="exhibition" id="developers">
        <div className="container-exhibition">
          <div className="heading">
            <h1 className="title">Desenvolvedores</h1>
          </div>

          <DevelopersCarousel />
        </div>
      </section>

      <section className="footer">
        <div className="container-footer">
          <div className="logo-footer">
            <a href="#home">
              <img src={logoFooter} alt="logo footer" />
            </a>
          </div>
          <div className="menu-footer">
            <a href="#home">Bem vindo</a>
            <a href="#aboutUs">Sobre nós</a>
            <a href="#developers">Desenvolvedores</a>
          </div>
          <div className="social-footer">
            <p className="texto">(11)9999-9999</p>
            <p className="texto">inspired@gmail.com</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
