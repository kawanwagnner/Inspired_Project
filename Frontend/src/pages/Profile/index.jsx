import "./assets/css/profile.css";

import logo from "./assets/img/Inspired-removebg-preview (1)cort.png";
import homeIcon from "./assets/img/home.png";
import userIcon from "./assets/img/user.png";
import userProfile from "./assets/img/usuario.png";
import handImage from "./assets/img/Login e Cadastro (4) 1.png";
import dollImage from "./assets/img/Login e Cadastro (5) 1.png";

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="profile-esquerda">
        <a href="/">
          <img className="profile-logo" src={logo} alt="Logo" />
        </a>
        <ul className="profile-ul">
          <li className="profile-li">
            <div className="profile-flex-item">
              <img className="profile-logoHome" src={homeIcon} alt="Home" />
              <h1 className="profile-h1">Home</h1>
            </div>
          </li>
          <li className="profile-li">
            <div className="profile-flex-item">
              <img className="profile-logoUser" src={userIcon} alt="User" />
              <h1 className="profile-h1">Profile</h1>
            </div>
          </li>
          <li className="profile-li">
            <div className="profile-flex-item">
              <img className="profile-logoUser" src={userIcon} alt="User" />
              <h1 className="profile-h1">Profile</h1>
            </div>
          </li>
          <li className="profile-li">
            <div className="profile-flex-item">
              <img className="profile-logoUser" src={userIcon} alt="User" />
              <h1 className="profile-h1">Profile</h1>
            </div>
          </li>
          <li className="profile-li">
            <div className="profile-flex-item">
              <img className="profile-logoUser" src={userIcon} alt="User" />
              <h1 className="profile-h1">Profile</h1>
            </div>
          </li>
        </ul>
        <button className="profile-botaoPost">
          <strong>POSTAR</strong>
        </button>
      </div>
      <div className="profile-meio">
        <div className="profile-banner">
          <label className="profile-custum-file-upload" htmlFor="file">
            <div className="profile-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill=""
                viewBox="0 0 24 24"
              >
                <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  id="SVGRepo_tracerCarrier"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fill=""
                    d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  ></path>
                </g>
              </svg>
            </div>
            <div className="profile-text">
              <span>Adicione uma imagem</span>
            </div>
            <input type="file" id="file" />
          </label>
        </div>
        <div className="profile-usuario_bio">
          <img
            className="profile-foto_perfil"
            src={userProfile}
            alt="Usuário"
          />
          <div className="profile-sobre_usuario">
            <p className="profile-nome_usuario">@LucasMoedas</p>
            <button className="profile-botao_editar">Editar Perfil</button>
          </div>
          <div className="profile-bio_usuario">
            <p style={{ fontFamily: "Bogart Regular, sans-serif" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus,
              suscipit dolor neque vitae odit ullam accusantium odio maxime
              laborum, hic voluptates non excepturi harum necessitatibus
              quibusdam culpa? Autem, laudantium nulla.
            </p>
            <p
              style={{ fontFamily: "Bogart Regular, sans-serif" }}
              id="profile-date"
            >
              Entrou em 29/05/2024
            </p>
            <br />
            <h2>Posts</h2>
            <div className="profile-linha"></div>
          </div>
          <div className="profile-card">
            <div className="profile-usuario_feed">
              <img
                src={userProfile}
                alt="Usuário"
                className="profile-foto_usuario_feed"
              />
              <p className="profile-nome_usuario_feed">Username</p>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-direita">
        <img className="profile-imgMao" src={handImage} alt="Mão" />
        <img className="profile-imgBoneco" src={dollImage} alt="Boneco" />
      </div>
    </div>
  );
};

export default Profile;
