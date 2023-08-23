import {
    insertComment,
    selectCommentsById,
} from "../repositories/comments.repository.js";

export async function createComment(req, res) {
  const { userId } = res.locals.user;
  const { id } = req.params;
  const { content } = req.body;
  try {
    await insertComment(id, userId, content);
    res.status(201).send("Comentário realizado!");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getCommentsById(req, res) {
  const { userId } = res.locals.user;
  const { id } = req.params;

  try {
    const promise = await selectCommentsById(userId, id);
    res.status(200).send(promise.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
