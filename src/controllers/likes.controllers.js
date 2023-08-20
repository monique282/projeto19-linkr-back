import { likesDB, likesUser } from "../repositories/likes.repository.js";

export async function getLikes(req, res) {
  try {
    const likes = await likesDB();

    return res.status(200).send(likes.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function getLikesByUser(req, res) {
  const { id } = req.params;
  try {
    const likes = await likesUser(id);
    res.status(200).send(likes.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

