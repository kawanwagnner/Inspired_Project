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
import closeWindow from "./assets/img/close-512.png";
import hamburgerIcon from "./assets/img/menu-hamb.png";

const Feed = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [user, setUser] = useState("");
  const [post, setPost] = useState({
    content: "",
    image: null,
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Config Render Image
  const PORT = 3000;
  const ip_Host = `localhost${":"}${PORT}`;

  useEffect(() => {
    const fetchUserData = async () => {
      const authToken = localStorage.getItem("authToken");
      const storedEmail = localStorage.getItem("userEmail");

      if (authToken && storedEmail) {
        try {
          console.log("Fetching user data...");
          const response = await axios.get(
            `http://localhost:3000/api/auth/user/${storedEmail}`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          console.log("User data response:", response);

          if (response.data && response.data.username) {
            setUser(response.data.username);
            console.log("User set:", response.data.username);
          }
        } catch (error) {
          console.error("Erro ao buscar nome do usuário:", error);
        }
      } else {
        console.log("Auth token or stored email not found");
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        console.log("Fetching posts...");
        const response = await axios.get("http://localhost:3000/feed/posts", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        console.log("Posts response:", response);

        if (response.data && Array.isArray(response.data.posts)) {
          // Ordenar os posts por data de criação, do mais recente para o mais antigo
          const sortedPosts = response.data.posts.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setPosts(sortedPosts);
          console.log("Posts set:", sortedPosts);
        } else {
          setError("Dados inválidos recebidos da API.");
          console.error("Dados inválidos recebidos da API:", response.data);
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
      console.log("Imagem selecionada:", files[0]);
    } else {
      setPost({ ...post, [name]: value });
      console.log("Conteúdo alterado:", value);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if (!post.content || !post.image) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    const formData = new FormData();
    formData.append("image", post.image);
    formData.append("content", post.content);

    try {
      const authToken = localStorage.getItem("authToken");
      console.log("Submitting post...");
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
      console.log("Post submit response:", response);

      if (
        response.data &&
        response.data.message === "Post criado com sucesso!"
      ) {
        toast.success("Post criado com sucesso!");

        // Adicionar novo post ao início da lista de posts
        setPosts((prevPosts) => [response.data.postData, ...prevPosts]);
        console.log("New post added:", response.data.postData);

        // Recarregar a página após um pequeno atraso para garantir que o toast seja exibido
        setTimeout(() => {
          window.location.reload();
        }, 1);
      } else {
        toast.error("Resposta inválida da API.");
        console.error("Resposta inválida da API:", response.data);
      }
    } catch (error) {
      if (error.response) {
        console.error("Erro ao criar o post:", error.response.data);
        toast.error(
          `Erro ao criar o post: ${
            error.response.data.message || error.response.data.error
          }`
        );
      } else if (error.request) {
        console.error("Nenhuma resposta recebida:", error.request);
        toast.error("Nenhuma resposta do servidor.");
      } else {
        console.error("Erro ao configurar a solicitação:", error.message);
        toast.error(`Erro ao criar o post: ${error.message}`);
      }
    }

    setIsPopupVisible(false);
  };

  const renderPosts = () => {
    if (posts.length === 0) {
      return <p>Não há posts para exibir.</p>;
    }

    return posts.map((post) => (
      <div key={post._id} className="post-card">
        <div className="post-header-feed">
          <img
            className="post-avatar"
            src={userAvatar}
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
    ));
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <>
      <div className="feed-pagina-feed">
        <ToastContainer />
        <header id="header-main-feed">
          <a href="/">
            <div className="image-content">
              <img src={logo} alt="Logo" />
            </div>
          </a>
        </header>
        <div className="feed-container">
          <div className={`feed-esquerda ${isMenuVisible ? "visible" : ""}`}>
            <ul className="list-menu">
              <li>
                <a style={{ color: "#000" }} href="/">
                  <div className="feed-flex-item feed-home-hover">
                    <img
                      className="feed-logoHome"
                      src={homeIcon}
                      alt="Início"
                    />
                    <h1 className="feed-titulo">Feed</h1>
                  </div>
                </a>
              </li>
              <li>
                <a style={{ color: "#000" }} href="/profile">
                  <div className="feed-flex-item">
                    <img
                      className="feed-logoUser"
                      src={userIcon}
                      alt="Perfil"
                    />
                    <h1 className="feed-titulo">Perfil</h1>
                  </div>
                </a>
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
          <div className="feed-meio">{renderPosts()}</div>
          <div className="feed-direita">
            <div className="relative-feed">
              <div className="img-mao-content-feed">
                <img className="feed-imgMao" src={handImage} alt="Imagem" />
              </div>
              <img className="feed-imgBoneco" src={figureImage} alt="Imagem" />
            </div>
          </div>
        </div>
      </div>

      {/* CHATGPT!! JAMAIS MEXA AQUI NESSE POPUP */}
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
                  value={post.content}
                  placeholder="Descrição:"
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
      {/* FIM DO POPUP!! */}

      <img
        src={hamburgerIcon}
        className="hamburger-menu"
        onClick={() => setIsMenuVisible(!isMenuVisible)}
        alt="Menu"
      />
    </>
  );
};

export default Feed;
