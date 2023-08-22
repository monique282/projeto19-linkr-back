import { insertComment } from "../repositories/comments.repository.js";

export async function createComment(req, res) {
  const { userId } = res.locals.user;
  const { id } = req.params;
  const { content } = req.body;
  try {
    await insertComment(id, userId, content);
    res.status(201).send("Comentário realizado!")
  } catch (err) {
    res.status(500).send(err.message);
  }
}
