import * as func from "../repositories/posts.repository.js";
export async function newPost(req,res) {
  const { url, content, hashtags } = req.body;
  try {
    const {userId} = res.locals.user

    await func.createPost(url, content, userId)

    res.status(201).send({message: "Nova publicação registrada com sucesso!"});
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function likePost(req,res) {

}
