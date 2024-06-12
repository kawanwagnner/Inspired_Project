import React from "react";

const PostCard = ({ post }) => {
  return (
    <div style={styles.profileCard}>
      <div style={styles.profileUsuarioFeed}>
        <p style={styles.profileNomeUsuarioFeed}>{post.content}</p>
        {post.imageUrl && (
          <img
            src={`http://192.168.15.6:3000/${post.imageUrl}`}
            alt="Post"
            style={styles.profileFotoPost}
          />
        )}
      </div>
    </div>
  );
};

const styles = {
  profileCard: {
    backgroundColor: "#f9f9f9",
    padding: "10px",
    borderRadius: "5px",
    margin: "10px 0",
  },
  profileUsuarioFeed: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  profileNomeUsuarioFeed: {
    fontSize: "1.2em",
    marginBottom: "10px",
  },
  profileFotoPost: {
    maxWidth: "100%",
    borderRadius: "5px",
  },
};

export default PostCard;
