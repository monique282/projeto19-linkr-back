import { getHashtagsDB, getOneHashtagDBScroll, getOneHashtagDB } from "../repositories/hashtag.repository.js";
import { likesHashtagDB } from "../repositories/likes.repository.js";

export async function getHashtags ( req, res ) {
    const { user } = res.locals;
    try {
        const hashtags = await getHashtagsDB();
        return res.status(200).send(hashtags.rows);
    } catch (err) {
        console.log(err)
        return res.status(500).send(err.message);
    }
}

export async function getOneHashtag ( req, res ) {
    const { user } = res.locals;
    const { hashtag } = req.params;
    try {

        const hashtagPosts = await getOneHashtagDB(hashtag);

        if( hashtagPosts.rowCount === 0 ) return res.status(404).send({message: "Nenhum post com esta hashtag"});

        return res.status(200).send(hashtagPosts.rows);

    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function getOneHashtagScroll ( req, res ) {
    const { hashtag } = req.params;
    const {lastPost} = req.query;
    try {
        const hashtags = await getOneHashtagDBScroll(hashtag, lastPost);
        return res.status(200).send(hashtags.rows);

    } catch (err) {
        console.log(err)
        return res.status(500).send(err.message);
    }
}

export async function getLikesByHashtag ( req, res ) {
    const { hashtag } = req.params;
    try {

        const hashtagsLikes = await likesHashtagDB(hashtag);

        return res.status(200).send(hashtagsLikes.rows);

    } catch (err) {
        return res.status(500).send(err.message);
    }
}