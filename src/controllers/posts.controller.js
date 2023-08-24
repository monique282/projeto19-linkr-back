import * as func from "../repositories/posts.repository.js";
export async function newPost(req,res) {
  const { url, content, hashtags } = req.body;
  try {
    const {userId} = res.locals.user

    const post = await func.createPost(url, content, userId)
    if(content.match(/#\w+/g)){
      const hashtagsValues = hashtags.map(hashtag => [hashtag.toLowerCase(), post.rows[0].id]);
      await func.insertHashtags(hashtagsValues);
    }
    

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

  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getPosts(req, res) {
  const { userId } = res.locals.user;

  try {
    const result = await func.sendPosts(userId);
    const followStatus = await func.followingStatusDB(userId);
    console.log(followStatus)

    let response = [];
    let status = "not following";

    if (followStatus.followedIds.length > 0) {
      const followedIds = new Set(followStatus.followedIds);
      response = result.rows.filter(post => followedIds.has(post.userId));
      if (response.length === 0) {
        status = "following";
      }
    }

    return res.status(200).send({ rows: response, status, followedNames: followStatus.followedNames, followedIds: followStatus.followedIds });
  } catch (err) {
    res.status(500).send(err.message);
  }
}



export async function getPostsById(req, res) {
  const { id } = req.params
  const { userId } = res.locals.user;
  try {
    const posts = await func.getUserPosts(id)
    const userInfo = await func.getUserInfo(id, userId);

    const obj = {
      name: userInfo.rows[0].name,
      image: userInfo.rows[0].image,
      id: userInfo.rows[0].id,
      statusFollow: userInfo.rows[0].status,
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

export async function editPostById(req, res) {
  const { content, hashtags } = req.body;
  const { id } = req.params;

  try {
    await func.deleteHashtags(id);

    const promise = await func.updatePost(content, id);
    if(content.match(/#\w+/g)){
      const hashtagsValues = hashtags.map(hashtag => [hashtag.toLowerCase(), id]);
      console.log(hashtagsValues)
      await func.insertHashtags(hashtagsValues);
    
    }
    
    res.status(201).send("Post editado!");
  } catch (err) {
    res.status(500).send(err.message);
  }
}