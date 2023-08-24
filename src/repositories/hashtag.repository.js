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
  posts.id AS "postId",
  posts.content AS content,
  posts.url AS url,
  users.id AS "userId",
  users.name AS name,
  users.image AS image,
  COALESCE(likes."numberLikes", 0) AS "numberLikes",
  COALESCE(comments."numberComments", 0) AS "numberComments",
  COALESCE(reposts."numberReposts", 0) AS "numberReposts",
  ARRAY_AGG(likes."userId") AS "likedUserIds"
FROM hashtags
LEFT JOIN posts ON hashtags."postId" = posts.id
LEFT JOIN users ON users.id = posts."userId"
LEFT JOIN (
  SELECT "postId", COUNT(*) AS "numberLikes", "userId"
  FROM likes
  GROUP BY "postId", "userId"
) AS likes ON posts.id = likes."postId"
LEFT JOIN (
  SELECT "postId", COUNT(*) AS "numberComments"
  FROM comments
  GROUP BY "postId"
) AS comments ON posts.id = comments."postId"
LEFT JOIN (
  SELECT "postId", COUNT(*) AS "numberReposts"
  FROM reposts
  GROUP BY "postId"
) AS reposts ON posts.id = reposts."postId"
WHERE hashtags.name = $1
GROUP BY users.id, posts.id, posts.content, posts.url, posts."createdAt", users.name, users.image, likes."numberLikes", comments."numberComments", reposts."numberReposts"
ORDER BY posts.id DESC
LIMIT 10;
    `;
  return db.query(query, [hashtag]);
}
