import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/feed.css";

import logo from "./assets/img/Inspired-preto-no-bg.png";
import homeIcon from "./assets/img/home.png";
import userIcon from "./assets/img/user.png";
import userAvatar from "./assets/img/usuario.png";
import handImage from "./assets/img/maos.png";
import figureImage from "./assets/img/escultura-grego.png";

const Feed = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [post, setPost] = useState({
    user_image: userAvatar,
    desc: "",
    post_image: null,
  });
  const [userName, setUserName] = useState("");
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
            const firstName = response.data.username.split(" ")[0];
            setUserName(firstName);
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
        const response = await axios.get("http://localhost:3000/api/posts");
        setPosts(response.data);
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
    if (name === "post_image") {
      setPost({ ...post, [name]: files[0] });
    } else {
      setPost({ ...post, [name]: value });
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("post_image", post.post_image);
    formData.append("desc", post.desc);

    try {
      const authToken = localStorage.getItem("authToken");

      const response = await axios.post(
        "http://localhost:3000/api/posts/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data) {
        toast.success("Post criado com sucesso!");
        setPosts((prevPosts) => [response.data.postData, ...prevPosts]);
      }
    } catch (error) {
      toast.error("Erro ao criar o post.");
      console.error("Erro ao criar o post:", error);
    }

    setIsPopupVisible(false);
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar dados.</p>;

  return (
    <div className="feed-pagina-feed">
      <ToastContainer />
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
          {posts.map((post, index) => (
            <div key={index} className="feed-post">
              <div className="feed-header-post">
                <ul>
                  <div className="feed-avatar-align">
                    <img
                      src={userAvatar}
                      className="feed-avatar"
                      alt="Usuário"
                    />
                    <h1 className="feed-name">{post.username}</h1>
                  </div>
                </ul>
              </div>
              <section className="feed-post-section">
                <h1 className="feed-text-content">{post.description}</h1>
                <div className="feed-img-content">
                  <img src={`./uploads/${post.image}`} alt="Imagem do Post" />
                </div>
                <div className="feed-actions">
                  <button className="feed-button feed-like">
                    <img
                      src=""
                      alt="curtir"
                      className="feed-img feed-like-img"
                    />
                  </button>
                </div>
              </section>
            </div>
          ))}
        </div>

        <div className="feed-direita">
          <img className="feed-imgMao" src={handImage} alt="Mão" />
          <img className="feed-imgBoneco" src={figureImage} alt="Boneco" />
        </div>
      </div>

      {isPopupVisible && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Novo Post</h2>
            <div className="popup-username">
              <img src={post.user_image} alt="Avatar do Usuário" />
              <span>{userName}</span>
            </div>
            <form onSubmit={handlePostSubmit}>
              <div className="form-group">
                <p className="form-label">Imagem do Post:</p>
                <input
                  type="file"
                  id="post_image"
                  name="post_image"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <p className="form-label">Descrição (opcional):</p>
                <textarea
                  id="desc"
                  name="desc"
                  value={post.desc}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <button type="submit">Enviar</button>
              <button type="button" onClick={() => setIsPopupVisible(false)}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;
