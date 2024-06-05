import "./assets/css/feed.css";

import logo from "./assets/img/Inspired-preto-no-bg.png";
import homeIcon from "./assets/img/home.png";
import userIcon from "./assets/img/user.png";
import userAvatar from "./assets/img/usuario.png";
import handImage from "./assets/img/maos.png";
import figureImage from "./assets/img/escultura-grego.png";

const Feed = () => {
  const initialImage = ""; // Defina o caminho inicial da imagem de curtida
  const urlImg = "./assets/img/"; // Defina a URL base para imagens
  const element = {
    imageUrl: "imagem_do_post.jpg", // Exemplo de imagem do post
  };

  return (
    <div className="feed-pagina-feed">
      <header className="feed-header">
        <img className="feed-header-logo" src={logo} alt="Logo" />
      </header>

      <div className="feed-container">
        <div className="feed-esquerda">
          <ul className="list-menu">
            <li>
              <div className="feed-flex-item feed-home-hover">
                <img className="feed-logoHome" src={homeIcon} alt="Início" />
                <h1 className="feed-titulo">Início</h1>
              </div>
            </li>
            <li>
              <div className="feed-flex-item">
                <img className="feed-logoUser" src={userIcon} alt="Perfil" />
                <h1 className="feed-titulo">Perfil</h1>
              </div>
            </li>
            <li>
              <div className="feed-flex-item">
                <img className="feed-logoUser" src={userIcon} alt="Perfil" />
                <h1 className="feed-titulo">Perfil</h1>
              </div>
            </li>
            <li>
              <div className="feed-flex-item">
                <img className="feed-logoUser" src={userIcon} alt="Perfil" />
                <h1 className="feed-titulo">Perfil</h1>
              </div>
            </li>
            <li>
              <div className="feed-flex-item">
                <img className="feed-logoUser" src={userIcon} alt="Perfil" />
                <h1 className="feed-titulo">Perfil</h1>
              </div>
            </li>
            <li>
              <button className="feed-botaoPost">
                <strong>POSTAR</strong>
              </button>
            </li>
          </ul>
        </div>

        <div className="feed-meio">
          <div className="feed-feed">
            <div className="feed-post">
              <div className="feed-header-post">
                <ul>
                  <div className="feed-avatar-align">
                    <img
                      src={userAvatar}
                      className="feed-avatar"
                      alt="Usuário"
                    />
                    <h1 className="feed-name">título</h1>
                  </div>
                </ul>
              </div>
              <section className="feed-post-section">
                <h1 className="feed-text-content">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                  odio officia inventore voluptate. Eligendi assumenda animi
                  commodi temporibus debitis dolorum soluta quas fugit
                  voluptatibus. Omnis similique excepturi dignissimos nihil
                  iure.
                </h1>
                <div className="feed-img-content">
                  <img
                    src={`${urlImg}${element.imageUrl}`}
                    alt="Imagem do Post"
                  />
                </div>
                <div className="feed-actions">
                  <button className="feed-button feed-like">
                    <img
                      src={initialImage}
                      alt="curtir"
                      className="feed-img feed-like-img"
                    />
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>

        <div className="feed-direita">
          <img className="feed-imgMao" src={handImage} alt="Mão" />
          <img className="feed-imgBoneco" src={figureImage} alt="Boneco" />
        </div>
      </div>
    </div>
  );
};

export default Feed;
