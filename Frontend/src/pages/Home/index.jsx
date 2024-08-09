import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
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

    const clearLocalStorageTimer = setTimeout(() => {
      localStorage.clear();
    }, 3 * 60 * 60 * 1000);

    return () => clearTimeout(clearLocalStorageTimer);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/signIn";
  };

  // Usando o Intersection Observer para ativar animações no scroll
  const { ref: homeRef, inView: homeInView } = useInView({ triggerOnce: true });
  const { ref: aboutUsRef, inView: aboutUsInView } = useInView({
    triggerOnce: true,
  });
  const { ref: footerRef, inView: footerInView } = useInView({
    triggerOnce: true,
  });

  return (
    <>
      <section id="home" ref={homeRef}>
        <header
          className="header"
          style={{ display: "flex", alignItems: "center" }}
        >
          <motion.img
            src={profile}
            width="50px"
            alt="profile"
            whileHover={{ scale: 1.1 }}
          />
          {isAuthenticated ? (
            <motion.button
              className="logoutButton"
              onClick={handleLogout}
              whileHover={{ scale: 1.1, backgroundColor: "#f00" }}
            >
              Sair
            </motion.button>
          ) : (
            <motion.a
              className="signIn"
              href="/signIn"
              whileHover={{ scale: 1.1 }}
            >
              <p>Login</p>
            </motion.a>
          )}
        </header>

        <motion.div
          className="container-position"
          initial={{ opacity: 0 }}
          animate={homeInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.5 }}
        >
          <div className="container-content">
            <motion.img
              src={aspasParaCima}
              className="left-aspas"
              width="130px"
              alt="aspas para cima"
              initial={{ x: -100, y: -50, opacity: 0 }} // Ajuste o valor de y conforme necessário
              animate={homeInView ? { x: 0, y: -55, opacity: 1 } : {}}
              transition={{ duration: 1.2, ease: "easeOut" }} // Você pode ajustar o tipo de easing para suavizar a animação
            />

            <motion.h2
              className="title2"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={homeInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 1.2 }}
            >
              INOVAÇÃO
            </motion.h2>
            <motion.h1
              className="title1"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={homeInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 1.2 }}
            >
              Bem vindo <span className="title_OF">AO</span> Inspired
            </motion.h1>
            <motion.img
              src={aspasParaBaixo}
              className="right-aspas"
              width="130px"
              alt="aspas para baixo"
              initial={{ x: 100, opacity: 0 }}
              animate={homeInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 1.2 }}
            />
            {isAuthenticated ? (
              <motion.a href="/feed" whileHover={{ scale: 1.1 }}>
                <h3 className="signUp">EXPLORAR</h3>
              </motion.a>
            ) : (
              <motion.a href="/signUp" whileHover={{ scale: 1.1 }}>
                <h3 className="signUp">CADASTRAR-SE</h3>
              </motion.a>
            )}
          </div>
        </motion.div>
      </section>

      <section className="aboutUs" id="aboutUs" ref={aboutUsRef}>
        <motion.div
          className="heading"
          initial={{ opacity: 0, y: 50 }}
          animate={aboutUsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
        >
          <h1 className="title">Sobre nós</h1>
        </motion.div>
        <div className="container-aboutUs">
          <motion.img
            src={vanGogh}
            width="720px"
            height="578px"
            alt="Van Gogh"
            initial={{ opacity: 0 }}
            animate={aboutUsInView ? { opacity: 1 } : {}}
            transition={{ duration: 1.5 }}
          />
          <div className="sobre-text-align">
            <motion.ul
              id="list-sobre-texts"
              initial={{ opacity: 0, y: 50 }}
              animate={aboutUsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.5, staggerChildren: 0.3 }}
            >
              <motion.li>
                <h1 id="sobre-title">Aqui a ARTE ganha vida🎨</h1>
              </motion.li>
              <motion.li>
                <h3 id="sobre-text">
                  Somos uma rede social criada exclusivamente para artistas de
                  todos os gêneros e formas de expressão, proporcionando um
                  espaço seguro e inspirador para compartilhar, colaborar e
                  crescer.
                </h3>
              </motion.li>
              <motion.li>
                <h2 id="sobre-subtitle">
                  Na nossa rede social, você tem liberdade de mostrar seu
                  trabalho em todas as suas formas.
                </h2>
              </motion.li>
            </motion.ul>

            <div className="sobre-buttons">
              <ul>
                {[
                  "Desenhos",
                  "Fotografias",
                  "Esculturas",
                  "Cinema",
                  "Tatuagens",
                  "Textos",
                  "Pinturas",
                  "Teatro",
                ].map((item, index) => (
                  <motion.li key={index} whileHover={{ scale: 1.1 }}>
                    <button>{item}</button>
                  </motion.li>
                ))}
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

      <section className="footer" ref={footerRef}>
        <motion.div
          className="container-footer"
          initial={{ opacity: 0 }}
          animate={footerInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.5 }}
        >
          <div className="logo-footer">
            <a href="#home">
              <motion.img
                src={logoFooter}
                alt="logo footer"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 1 }}
              />
            </a>
          </div>
          <div className="menu-footer">
            <a href="#home">Bem vindo</a>
            <a href="#aboutUs">Sobre nós</a>
            <a href="#developers">Desenvolvedores</a>
          </div>
          <div className="social-footer">
            {/* <p className="texto">(11)9999-9999</p> */}
            <p className="texto">inspired@gmail.com</p>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Home;
