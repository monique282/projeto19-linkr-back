import { getHashtagsDB } from "../repositories/hashtag.repository";

export async function getHashtags ( req, res ) {
    const { user } = res.locals;
    try {

        const hashtags = await getHashtagsDB();

        return res.status(200).send(hashtags.rows);

    } catch (err) {
        return res.status(500).send(err.message);
    }
}