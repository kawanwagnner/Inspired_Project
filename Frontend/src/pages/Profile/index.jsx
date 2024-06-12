import React, { useState, useEffect } from "react";
import axios from "axios";
// import PostCard from "../../components/Card/index";
import logo from "./assets/img/logo.png";
import homeIcon from "./assets/img/home.png"; // Import the home icon
import userProfile from "./assets/img/usuario.png"; // Import the default user profile picture
import "./assets/css/profile.css";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

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
            <div className="profile-flex-item">
              <img className="profile-logoHome" src={homeIcon} alt="Home" />{" "}
              {/* Use homeIcon */}
              <a href="/feed">
                <h1 style={{ color: "#000" }} className="profile-h1">
                  Feed
                </h1>
              </a>
            </div>
          </li>
        </ul>
        <button className="profile-botaoPost">
          <strong>POSTAR</strong>
        </button>
      </div>
      <div className="profile-meio">
        <div className="profile-banner">
          <img
            className="profile-foto_perfil"
            src={userProfile} // Use userProfile for user profile picture
            alt="Usuário"
          />
          <div className="profile-sobre_usuario">
            <p className="profile-nome_usuario">@{userData?.username}</p>
            <button className="profile-botao_editar">Editar Perfil</button>
          </div>
          <div className="profile-bio_usuario">
            <p>- Sem Bio</p>
            <p id="profile-date">Entrou em {userData?.joinDate}</p>
            <br />
            <h2>Posts</h2>
            <div className="profile-linha"></div>
          </div>
          {posts.map((post) => (
            <div key={post.createdAt} className="profile-card">
              <div className="profile-usuario_feed"></div>
              <img
                style={{ margin: "auto", display: "block" }}
                src={`http://192.168.15.6:3000/${post.imageUrl}`}
                alt="Post"
                className="profile-foto_post"
              />
              <p className="profile-nome_usuario_feed">{post.content}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="profile-direita">
        {/* Add any additional elements here */}
      </div>
    </div>
  );
};

export default Profile;
