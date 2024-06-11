import { validationResult } from "express-validator";
import Post from "../models/post.mjs";
import User from "../models/user.mjs";

// Obter posts com paginação
const getPosts = async (req, res, next) => {
  const page = req.query.page || 1;
  const perPage = req.query.perPage || 10;
  let totalItems;

  try {
    totalItems = await Post.find().countDocuments();
    const posts = await Post.find()
      .populate("creator", "name email")
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      totalItems: totalItems,
      posts: posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao buscar posts" });
  }
};

// Criar post
const createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: true,
      message: errors.array()[0].msg,
    });
  }

  if (!req.file) {
    const error = new Error("Faltou enviar a imagem!!");
    error.statusCode = 422;
    throw error;
  }

  const { title, content } = req.body;
  const imageUrl = req.file.path;
  let postCreator;

  try {
    const postagem = new Post({
      title,
      content,
      imageUrl,
      creator: req.userId,
    });

    await postagem.save();
    const user = await User.findById(req.userId);
    postCreator = user;
    user.posts.push(postagem);
    await user.save();

    res.status(201).json({
      message: "Post criado com sucesso!!",
      creator: {
        _id: postCreator._id,
        name: postCreator.name,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao criar post", error: error.message });
  }
};

// Atualizar post
const updatePost = (req, res, next) => {
  const postId = req.params.postID;
  console.log(postId);
  res.status(200).json({
    msg: "Post atualizado com sucesso!",
    post: postId,
  });
};

// Deletar post
const deletePost = (req, res, next) => {
  const postID = req.params.postID;
  console.log(postID);
  res.status(200).json({
    msg: "Post excluído com sucesso!",
    post: postID,
  });
};

export default { getPosts, createPost, updatePost, deletePost };
