import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
import logo from "./assets/img/logo.png";
import homeIcon from "./assets/img/home.png";
import userProfile from "./assets/img/usuario.png";
import handImage from "./assets/img/maos.png";
import figureImage from "./assets/img/escultura-grego.png";
import closeIcon from "./assets/img/close-512.png";
import "./assets/css/profile.css";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isEditPopupVisible, setIsEditPopupVisible] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [newPost, setNewPost] = useState({
    content: "",
    image: null,
  });
  const [editProfileData, setEditProfileData] = useState({
    username: "",
    bio: "",
  });

  const PORT = 3000;
  const ip_Host = `192.168.15.5:${PORT}`;

  useEffect(() => {
    const fetchUserData = async () => {
      const authToken = localStorage.getItem("authToken");

      try {
        const response = await axios.get(
          "http://localhost:3000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const { profile } = response.data;
        setUserData(profile);
        setEditProfileData({
          username: profile.username,
          bio: profile.bio || "",
        });
      } catch (error) {
        setError(error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const authToken = localStorage.getItem("authToken");

      try {
        const response = await axios.get("http://localhost:3000/feed/posts/", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.data && Array.isArray(response.data.posts)) {
          const userPosts = response.data.posts.filter(
            (post) => post.creator.email === userData.email
          );
          setPosts(userPosts);
        } else {
          setError("Invalid data received from API.");
        }
      } catch (error) {
        setError(error);
      }
    };

    if (userData && userData.email) {
      fetchPosts();
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewPost({ ...newPost, image: files[0] });
    } else {
      setNewPost({ ...newPost, content: value });
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditProfileData({ ...editProfileData, [name]: value });
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if (!newPost.content || !newPost.image) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    const formData = new FormData();
    formData.append("image", newPost.image);
    formData.append("content", newPost.content);

    try {
      const authToken = localStorage.getItem("authToken");
      const response = await axios.post(
        `http://localhost:3000/feed/post`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (
        response.data &&
        response.data.message === "Post criado com sucesso!"
      ) {
        toast.success("Post criado com sucesso!");

        setPosts((prevPosts) => [response.data.postData, ...prevPosts]);

        setNewPost({ content: "", image: null });

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error("Resposta inválida da API.");
      }
    } catch (error) {
      if (error.response) {
        toast.error(
          `Erro ao criar o post: ${
            error.response.data.message || error.response.data.error
          }`
        );
      } else if (error.request) {
        toast.error("Nenhuma resposta do servidor.");
      } else {
        toast.error(`Erro ao criar o post: ${error.message}`);
      }
    }

    setIsPopupVisible(false);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const authToken = localStorage.getItem("authToken");
      const response = await axios.put(
        `http://localhost:3000/api/users/update/`, // Corrigido para a rota de atualização
        editProfileData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (
        response.data &&
        response.data.message === "Perfil atualizado com sucesso!"
      ) {
        toast.success("Perfil atualizado com sucesso!");
        setUserData({ ...userData, ...editProfileData });
        setTimeout(() => {
          window.location.reload();
        }, 1);
      } else {
        toast.error("Resposta inválida da API.");
      }
    } catch (error) {
      if (error.response) {
        toast.error(
          `Erro ao atualizar o perfil: ${
            error.response.data.message || error.response.data.error
          }`
        );
      } else if (error.request) {
        toast.error("Nenhuma resposta do servidor.");
      } else {
        toast.error(`Erro ao atualizar o perfil: ${error.message}`);
      }
    }

    setIsEditPopupVisible(false);
  };

  if (error) {
    return <p>Ocorreu um erro ao carregar os dados: {error.message}</p>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy");
  };

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
                <img className="profile-logoHome" src={homeIcon} alt="Home" />
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
            <p className="profile-usuario_bio">
              - {userData?.bio || "Sem Bio"}
            </p>
            <p className="profile-date">
              entrou em{" "}
              {userData?.createdAt ? formatDate(userData.createdAt) : ""}
            </p>
          </div>
          <button
            className="profile-botao_editar"
            onClick={() => setIsEditPopupVisible(true)}
          >
            Editar Perfil
          </button>
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

      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-inner">
            <img
              className="close-btn"
              onClick={() => setIsPopupVisible(false)}
              src={closeIcon}
              alt="Fechar"
            />
            <h2 className="titulo">Novo POST:</h2>
            <form onSubmit={handlePostSubmit}>
              <div className="popup-username">
                <img src={userProfile} alt="Usuário" />
                <p>{userData?.username}</p>
              </div>
              <div className="form-group">
                <p className="form-label" htmlFor="image">
                  Selecionar imagem:
                </p>
                <input
                  id="image"
                  type="file"
                  name="image"
                  accept="image/*"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group form-group-desc">
                <p className="form-label" htmlFor="content">
                  Conteúdo:
                </p>
                <input
                  className="feed-input-post"
                  type="text"
                  id="content"
                  name="content"
                  value={newPost.content}
                  onChange={handleInputChange}
                />
              </div>
              <button className="feed-botaoEnviar" type="submit">
                Postar
              </button>
            </form>
          </div>
        </div>
      )}

      {isEditPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-inner">
            <img
              className="close-btn"
              onClick={() => setIsEditPopupVisible(false)}
              src={closeIcon}
              alt="Fechar"
            />
            <h2 className="titulo">Editar Perfil:</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="popup-username">
                <img src={userProfile} alt="Usuário" />
                <p>{userData?.username}</p>
              </div>
              <p className="form-label" htmlFor="username">
                Nome de usuário:
              </p>
              <div className="form-group">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={editProfileData.username}
                  onChange={handleEditInputChange}
                  required
                />
              </div>
              <p className="form-label" htmlFor="bio">
                Bio:
              </p>
              <div className="form-group form-group-desc">
                <input
                  type="text"
                  id="bio"
                  name="bio"
                  value={editProfileData.bio}
                  onChange={handleEditInputChange}
                />
              </div>
              <button className="feed-botaoEnviar" type="submit">
                Salvar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
