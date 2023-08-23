import db from "../database/database.connection.js";

export function insertComment(postId, userId, content) {
  const promise = db.query(
    `INSERT INTO comments ("postId", "userId", content) VALUES ($1, $2, $3);`,
    [postId, userId, content]
  );

  return promise;
}

export function selectCommentsById(userId, id) {
  const promise = db.query(
    `
    SELECT users.image, users.name, comments.content,
    CASE 
        WHEN posts."userId" = comments."userId" THEN 'posts author'
        WHEN EXISTS ( SELECT 1 FROM follows 
            WHERE follows."followingId" = $1 AND follows."followedId" = comments."userId" ) THEN 'following'
        ELSE ''
    END AS identifier
    FROM posts
    JOIN comments ON comments."postId" = $2
    JOIN users ON users.id = comments."userId"
    GROUP BY comments.id, users.image, users.name, posts."userId"
    ORDER BY comments.id;
    `,
    [userId, id]
  );

  return promise;
}
