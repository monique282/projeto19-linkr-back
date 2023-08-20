import db from "../database/database.connection.js";

export async function likesDB () {
    const query = `
    SELECT posts.id, posts.url, posts.content, 
       COALESCE(ARRAY_AGG(users.name), '{}'::TEXT[]) AS "likedUserNames"
FROM posts 
LEFT JOIN likes ON likes."postId" = posts.id
LEFT JOIN users ON users.id = likes."userId"
GROUP BY posts.id, posts.url, posts.content
ORDER BY posts.id DESC
LIMIT 20;
` 
    return db.query(query);
}