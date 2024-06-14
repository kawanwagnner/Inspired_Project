import { useState, useEffect } from "react";
import axios from "axios";

import logo from "./assets/img/logo.png";
import homeIcon from "./assets/img/home.png";
import userProfile from "./assets/img/usuario.png";
import handImage from "./assets/img/maos.png";
import figureImage from "./assets/img/escultura-grego.png";
import "./assets/css/profile.css";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  //Tem q puxar essa função do IsPopupVisible
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  const PORT = 3000;
  const ip_Host = `172.21.208.1${":"}${PORT}`;

  useEffect(() => {
    const fetchUserData = async () => {
      const authToken = localStorage.getItem("authToken");

      try {
        console.log("Fetching user data...");
        const response = await axios.get(
          "http://localhost:3000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const { profile } = response.data;
        console.log("User data received:", profile);
        setUserData(profile);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const authToken = localStorage.getItem("authToken");

      try {
        console.log("Fetching posts...");
        const response = await axios.get("http://localhost:3000/feed/posts/", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        console.log("Posts received:", response.data);
        if (response.data && Array.isArray(response.data.posts)) {
          const userPosts = response.data.posts.filter(
            (post) => post.creator.email === userData.email
          );
          setPosts(userPosts);
          console.log("User posts set:", userPosts);
        } else {
          console.error("Invalid data received from API:", response.data);
          setError("Invalid data received from API.");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(error);
      }
    };

    if (userData && userData.email) {
      fetchPosts();
    }
  }, [userData]);

  if (error) {
    return <p>Ocorreu um erro ao carregar os dados: {error.message}</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-esquerda">
        <a href="/">
          <img className="profile-logo" src={logo} alt="Logo" />
        </a>
        <ul className="profile-ul">
          <li className="profile-li">
            <a href="/feed">
              <div className="profile-flex-item">
                <img className="profile-logoHome" src={homeIcon} alt="Home" />{" "}
                {/* Use homeIcon */}
                <h1 style={{ color: "#000" }} className="profile-h1">
                  Feed
                </h1>
              </div>
            </a>
          </li>
        </ul>
        <button
          className="profile-botaoPost"
          onClick={() => setIsPopupVisible(true)}
        >
          <strong>POSTAR</strong>
        </button>
      </div>
      <div className="profile-meio">
        <div className="profile-sobre">
          <div className="content-block">
            <img
              className="profile-foto_perfil"
              src={userProfile}
              alt="Usuário"
            />
            <p className="profile-username">@{userData?.username}</p>
            <p className="profile-usuario_bio">- Sem Bio</p>
            <p className="profile-date">entrou em {userData?.createdAt}</p>
          </div>
          <button className="profile-botao_editar">Editar Perfil</button>
        </div>
        <div className="divisor-content">
          <h2>Posts</h2>
          <div className="profile-linha"></div>
        </div>
        {posts.map((post) => (
          <div key={post._id} className="post-card">
            <div className="post-header">
              <img
                className="post-avatar"
                src={userProfile}
                alt="Avatar do usuário"
              />
              <h3 className="post-username">{post.creator.username}</h3>
            </div>
            <div className="post-content">
              {post.imageUrl && (
                <img
                  className="post-image"
                  src={`http://${ip_Host}/${post.imageUrl}`}
                  alt="Post"
                />
              )}
              <p className="description">{post.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="profile-direita">
        <div className="relative-profile">
          <div className="img-mao-content">
            <img className="profile-imgMao" src={handImage} alt="Imagem" />
          </div>
          <img className="profile-imgBoneco" src={figureImage} alt="Imagem" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
