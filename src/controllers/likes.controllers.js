import { likesDB } from "../repositories/likes.repository.js";

export async function getLikes (req, res) {
    try {

        const likes = await likesDB();

        return res.status(200).send(likes.rows);

    } catch (err) {
        return res.status(500).send(err.message);
    }
}