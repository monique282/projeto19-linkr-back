import * as func from "../repositories/posts.repository.js";
export async function newPost(req,res) {
  const { url, content, hashtags } = req.body;
  try {
    const {userId} = res.locals.user

    const post = await func.createPost(url, content, userId)

    const hashtagsValues = hashtags.map(hashtag => [hashtag.toLowerCase(), post.rows[0].id]);
    await func.insertHashtags(hashtagsValues);

    res.status(201).send({message: "Nova publicação registrada com sucesso!"});
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function likePost(req,res) {
  const {userId, postId, isLiked} = req.body
  try{
    const {userId: idUser} = res.locals.user
    const checkPost = await func.selectPostById(postId)

    if(idUser !== userId) return res.status(400).send({message: "Inconsistência com os dados de usuário."})
    if(checkPost.rowCount === 0) return res.status(404).send({message: "ID de post incorreto"})


      return res.status(200).send(await func.handleLike(postId, userId))
    if(isLiked) {
      await func.insertLike(postId, userId)
      return res.status(200).send({message: "Like aplicado!"})
    } else {
      await func.removeLike(postId, userId)
      return res.status(200).send({message: "Like removido!"})
    }

  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getPosts(req,res) {
  try{
    return res.status(200).send(await func.sendPosts())
  } catch(err){
    res.status(500).send(err.message);
  }
}

export async function getPostsById(req, res) {
  const { id } = req.params
  try {
    const posts = await func.getUserPosts(id)
    const userInfo = await func.getUserInfo(id)
    const obj = {
      name: userInfo.rows[0].name,
      image: userInfo.rows[0].image,
      posts: posts.rows
    }
    res.status(200).send(obj)
  } catch(err) {
    res.status(500).send(err.message)
  }
}

// função de deleta o post do usuario logado
export async function postDelete(req, res) {
  const { id } = req.params;
  try {

      // verificando se o post existe 
      const postExists = await func.getRequisitionPostId(id);

      // verificando se a short é valida
      if (postExists.rows.length === 0) {
          return res.status(404).send("Post não encontrado");
      };

      // se tudo der certo
      // atualizando o status
      await func.deleteSendPostId(id)
      res.sendStatus(200);

  } catch (erro) {
      res.status(500).send(erro.message);
  };
}