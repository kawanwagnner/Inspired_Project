// Card.jsx
import React from "react";
import userAvatar from "./assets/img/usuario.png"; // Ajuste o caminho conforme necessário

const Card = ({ post, userName }) => {
  return (
    <div className="feed-post">
      <div className="feed-header-post">
        <ul>
          <div className="feed-avatar-align">
            <img src={userAvatar} className="feed-avatar" alt="Usuário" />
            <h1>{userName}</h1>
          </div>
        </ul>
        <p>{new Date(post.createdAt).toLocaleString()}</p>
      </div>
      <div className="feed-img-content">
        <img
          src={`http://localhost:3000/uploads/${post.image}`}
          alt="Imagem do Post"
        />
      </div>
      <div className="feed-text-content">
        <p>{post.description}</p>
      </div>
    </div>
  );
};

export default Card;
