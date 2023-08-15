import { getHashtagsDB, getOneHashtagDB } from "../repositories/hashtag.repository";

export async function getHashtags ( req, res ) {
    const { user } = res.locals;
    try {

        const hashtags = await getHashtagsDB();

        return res.status(200).send(hashtags.rows);

    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function getOneHashtag ( req, res ) {
    const { user } = res.locals;
    const { hashtag } = req.params;
    try {

        const hashtagPosts = getOneHashtagDB(hashtag);

        if( hashtagPosts.rowCount === 0 ) return res.status(404).send({message: "Nenhum post com esta hashtag"});

        return res.status(200).send(hashtagPosts.rows);

    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function soma (a, b, c) {
    return a + b + c
}