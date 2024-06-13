// Popup.js
import React, { useState } from "react";
import "./css/popup.css"; // Create and import the CSS for the popup

const Popup = ({ onClose }) => {
  const [content, setContent] = useState("");

  const handlePost = () => {
    // Implement post submission logic here
    console.log("Posting content:", content);
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Novo Post</h2>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Escreva seu post aqui..."
        />
        <button onClick={handlePost}>Postar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default Popup;
