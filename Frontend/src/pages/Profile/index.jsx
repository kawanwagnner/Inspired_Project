import { useState, useEffect } from "react";
import axios from "axios";
import logo from "./assets/img/logo.png";
import homeIcon from "./assets/img/home.png";
import userProfile from "./assets/img/usuario.png";
import handImage from "./assets/img/Login e Cadastro (4) 1.png";
import dollImage from "./assets/img/Login e Cadastro (5) 1.png";
import "./assets/css/profile.css";

const Profile = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({});
  const [newPost, setNewPost] = useState("");
  const [postImage, setPostImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
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

          console.log("Dados do usuário recebidos:", response.data); // Debug

          if (response.data) {
            setUserData(response.data);
          }
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error); // Debug
          setError(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchUserPosts = async () => {
      setLoading(true);
      const authToken = localStorage.getItem("authToken");

      try {
        const response = await axios.get(
          `http://localhost:3000/api/posts/user/${userData.email}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        console.log("Posts do usuário recebidos:", response.data); // Debug

        if (response.data && Array.isArray(response.data)) {
          setUserPosts(response.data);
        } else {
          console.error("Dados inválidos recebidos da API:", response.data); // Debug
          setError("Dados inválidos recebidos da API.");
        }
      } catch (error) {
        console.error("Erro ao buscar posts do usuário:", error); // Debug
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (userData.email) {
      // Certifique-se de que os dados do usuário foram carregados antes de buscar os posts
      fetchUserPosts();
    }
  }, [userData]);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem("authToken");

    // Verifica se userData está definido corretamente
    if (!userData || !userData.email || !userData.username) {
      console.error("Dados do usuário não estão definidos corretamente.");
      return;
    }

    const formData = new FormData();
    formData.append("description", newPost);
    formData.append("post_image", postImage);
    formData.append("email", userData.email); // Usando o email do usuário logado
    formData.append("username", userData.username); // Usando o username do usuário logado

    try {
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

      console.log("Post criado com sucesso:", response.data);
      setUserPosts((prevPosts) => [response.data.postData, ...prevPosts]);
      setNewPost("");
      setPostImage(null);
    } catch (error) {
      console.error("Erro ao criar o post:", error);
      setError(error);
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error)
    return (
      <p>Ocorreu um erro ao carregar os dados do usuário: {error.message}</p>
    );

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
            src={userProfile}
            alt="Usuário"
          />
          <div className="profile-sobre_usuario">
            <p className="profile-nome_usuario">@{userData.username}</p>
            <button className="profile-botao_editar">Editar Perfil</button>
          </div>
          <div className="profile-bio_usuario">
            <p>{userData.bio}</p>
            <p id="profile-date">Entrou em {userData.joinDate}</p>
            <br />
            <h2>Posts</h2>
            <div className="profile-linha"></div>
          </div>
          {userPosts.map((post) => (
            <div key={post.createdAt} className="profile-card">
              <div className="profile-usuario_feed">
                <img
                  src={`http://localhost:3000/uploads/${post.image}`}
                  alt="Post"
                  className="profile-foto_post"
                />
                <p className="profile-nome_usuario_feed">{post.description}</p>
              </div>
            </div>
          ))}
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
