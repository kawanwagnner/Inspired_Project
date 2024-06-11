import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "../../components/Card"; // Ajuste o caminho conforme necessário
import "./assets/css/feed.css";

import logo from "./assets/img/Inspired-preto-no-bg.png";
import homeIcon from "./assets/img/home.png";
import userIcon from "./assets/img/user.png";
import userAvatar from "./assets/img/usuario.png";
import handImage from "./assets/img/maos.png";
import figureImage from "./assets/img/escultura-grego.png";
import closeWindow from "./assets/img/close-512.png";

const Feed = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [user, setUser] = useState("");
  const [post, setPost] = useState({
    user_image: userAvatar,
    title: "",
    content: "",
    image: null,
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
            setUser(response.data.username);
          }
        } catch (error) {
          console.error("Erro ao buscar nome do usuário:", error);
        }
      }
    };

    fetchUserName();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/feed/posts", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        if (response.data && Array.isArray(response.data)) {
          const postsWithUsernames = response.data.reduce((acc, user) => {
            const userPosts = user.posts.map((post) => ({
              ...post,
              userName: user.username,
            }));
            return [...acc, ...userPosts];
          }, []);
          setPosts(postsWithUsernames);
        } else {
          setError("Dados inválidos recebidos da API.");
        }
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setPost({ ...post, [name]: files[0] });
    } else {
      setPost({ ...post, [name]: value });
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", post.image);
    formData.append("title", post.title);
    formData.append("content", post.content);

    try {
      const authToken = localStorage.getItem("authToken");
      const username = user;

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
      } else {
        toast.error("Resposta inválida da API.");
      }
    } catch (error) {
      toast.error("Erro ao criar o post.");
      console.error("Erro ao criar o post:", error);
    }

    setIsPopupVisible(false);
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <>
      <div className="feed-pagina-feed">
        <ToastContainer />
        <header id="header-main-feed">
          <div className="image-content">
            <img src={logo} alt="Logo" />
          </div>
        </header>
        <div className="feed-container">
          <div className="feed-esquerda">
            <ul className="list-menu">
              <li>
                <div className="feed-flex-item feed-home-hover">
                  <img className="feed-logoHome" src={homeIcon} alt="Início" />
                  <a style={{ color: "#000" }} href="/">
                    <h1 className="feed-titulo">Início</h1>
                  </a>
                </div>
              </li>
              <li>
                <div className="feed-flex-item">
                  <img className="feed-logoUser" src={userIcon} alt="Perfil" />
                  <a style={{ color: "#000" }} href="/profile">
                    <h1 className="feed-titulo">Perfil</h1>
                  </a>
                </div>
              </li>
              <li>
                <button
                  className="feed-botaoPost"
                  onClick={() => setIsPopupVisible(true)}
                >
                  <strong>POSTAR</strong>
                </button>
              </li>
            </ul>
          </div>
          <div className="feed-meio">
            {posts.length === 0 ? (
              <p>Não há posts para exibir.</p>
            ) : (
              posts.map((post, index) => <Card key={index} post={post} />)
            )}
          </div>
          <div className="feed-direita">
            <div className="relative-feed">
              <img className="feed-handImage" src={handImage} alt="Imagem" />
              <img
                className="feed-figureImage"
                src={figureImage}
                alt="Imagem"
              />
            </div>
          </div>
        </div>

        {isPopupVisible && (
          <div className="popup-overlay">
            <div className="popup-inner">
              <img
                className="close-btn"
                onClick={() => setIsPopupVisible(false)}
                src={closeWindow}
                alt="Fechar"
              />
              <h2 className="titulo">Novo POST:</h2>
              <form onSubmit={handlePostSubmit}>
                <div className="popup-username">
                  <img src={userAvatar} alt="Usuário" />
                  <p>{user}</p>
                </div>
                <div className="form-group">
                  <p className="form-label" htmlFor="title">
                    Título:
                  </p>
                  <input
                    className="feed-input-post"
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Título"
                    value={post.title}
                    onChange={handleInputChange}
                  />
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
                    placeholder="Conteúdo"
                    value={post.content}
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
      </div>
    </>
  );
};

export default Feed;
