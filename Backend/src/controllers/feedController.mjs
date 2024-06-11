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
  const { title, content } = req.body;
  const imageUrl = req.file ? req.file.path : null; // Verifica se a imagem foi enviada

  if (!title || !content || !imageUrl) {
    return res.status(422).json({
      error: true,
      message: "Por favor, forneça um título, conteúdo e uma imagem válida.",
    });
  }

  try {
    const postagem = new Post({
      title,
      content,
      imageUrl,
      creator: req.userId,
    });

    await postagem.save();
    const user = await User.findById(req.userId);
    user.posts.push(postagem);
    await user.save();

    res.status(201).json({
      message: "Post criado com sucesso!!",
      postId: postagem._id,
      creator: {
        _id: user._id,
        name: user.name,
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

export { getPosts, createPost, updatePost, deletePost };
