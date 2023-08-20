import db from "../database/database.connection.js";

export async function getHashtagsDB() {
    const query = `
        SELECT COUNT(hashtags.name) AS "hashtagCount", hashtags.name AS hashtag
            FROM hashtags 
            JOIN posts ON hashtags."postId" = posts.id
            GROUP BY hashtags.name
            ORDER BY "hashtagCount" DESC
            LIMIT 10;
    `;
    return db.query(query);
}

export async function getOneHashtagDB(hashtag) {
    const query = `
        SELECT
        users.id AS "userId",
        users.name AS name,
        users.image AS image,
        posts.id AS "postId",
        posts.content AS content,
        posts.url AS url,
        COUNT(likes."userId") AS "numberLikes",
        ARRAY_AGG(likes."userId") AS "likedUserIds"
            FROM hashtags
            JOIN posts ON hashtags."postId" = posts.id
            JOIN users ON posts."userId" = users.id
            LEFT JOIN likes ON likes."postId" = posts.id
            WHERE hashtags.name = $1
            GROUP BY users.id, posts.id
            ORDER BY posts.id DESC;
    `;
    return db.query(query, [hashtag])
}
