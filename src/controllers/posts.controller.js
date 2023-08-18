import * as func from "../repositories/posts.repository.js";
export async function newPost(req,res) {
  const { url, content, hashtags } = req.body;
  try {
    const {userId} = res.locals.user

    await func.createPost(url, content, userId)

    res.status(201).send({message: "Nova publicação registrada com sucesso!"});
  } catch (err) {
    console.log(err)
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

    if(isLiked) {
      await func.insertLike(postId, userId)
      return res.status(200).send({message: "Like aplicado!"})
    } else {
      await func.deleteLike(postId, userId)
      return res.status(200).send({message: "Like removido!"})
    }

  } catch (err) {
    console.log(err)
    res.status(500).send(err.message);
  }
}
