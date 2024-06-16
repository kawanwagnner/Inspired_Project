import Post from "../models/post.mjs";
import User from "../models/user.mjs";

// Obter posts com paginação
const getPosts = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  let totalItems;

  try {
    totalItems = await Post.find().countDocuments();
    const posts = await Post.find()
      .populate("creator", "name email username")
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
  const { content } = req.body;
  const imageUrl = req.file ? req.file.path.replace(/\\/g, "/") : null; // Substituir barras invertidas por barras normais

  if (!content || !imageUrl) {
    return res.status(422).json({
      error: true,
      message: "Por favor, forneça conteúdo e uma imagem válida.",
    });
  }

  try {
    // Verificar se o usuário está autenticado
    if (!req.userId) {
      return res.status(401).json({
        error: true,
        message: "Usuário não autenticado.",
      });
    }

    // Criar uma nova postagem
    const post = new Post({
      content,
      imageUrl,
      creator: req.userId,
    });

    // Salvar a postagem no banco de dados
    await post.save();

    // Adicionar o ID da postagem ao array de postagens do usuário
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        error: true,
        message: "Usuário não encontrado.",
      });
    }
    user.posts.push(post._id);
    await user.save();

    // Responder com os detalhes da postagem criada
    res.status(201).json({
      message: "Post criado com sucesso!",
      postId: post._id,
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
const updatePost = async (req, res, next) => {
  const postId = req.params.postId;
  const { content } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post não encontrado!" });
    }

    if (post.creator.toString() !== req.userId) {
      return res.status(403).json({ message: "Não autorizado!" });
    }

    post.content = content || post.content;
    if (req.file) {
      post.imageUrl = req.file.path;
    }

    await post.save();
    res.status(200).json({ message: "Post atualizado com sucesso!", post });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar post", error: error.message });
  }
};

// Deletar post
const deletePost = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    // Encontrar o post pelo ID
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post não encontrado!" });
    }

    // Verificar se o usuário autenticado é o criador do post
    if (post.creator.toString() !== req.userId) {
      return res.status(403).json({ message: "Não autorizado!" });
    }

    // Remover o post
    await Post.findByIdAndDelete(postId);

    // Atualizar a lista de posts do usuário
    const user = await User.findById(req.userId);
    user.posts.pull(postId);
    await user.save();

    // Responder com sucesso
    res.status(200).json({ message: "Post excluído com sucesso!" });
  } catch (error) {
    // Logar o erro no console para depuração
    console.error("Erro ao excluir post:", error);
    res
      .status(500)
      .json({ message: "Erro ao excluir post", error: error.message });
  }
};

export { getPosts, createPost, updatePost, deletePost };
