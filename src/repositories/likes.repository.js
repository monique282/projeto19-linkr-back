import db from "../database/database.connection.js";

export async function likesDB() {
  const query = `
    SELECT posts.id, posts.url, posts.content, 
       COALESCE(ARRAY_AGG(users.name), '{}'::TEXT[]) AS "likedUserNames"
FROM posts 
LEFT JOIN likes ON likes."postId" = posts.id
LEFT JOIN users ON users.id = likes."userId"
GROUP BY posts.id, posts.url, posts.content
ORDER BY posts.id DESC
LIMIT 10;
`;
  return db.query(query);
}

export async function likesUser(id) {
  const query = db.query(
    `
    SELECT posts.id, posts.url, posts.content, 
       COALESCE(ARRAY_AGG(users.name), '{}'::TEXT[]) AS "likedUserNames"
FROM posts 
LEFT JOIN likes ON likes."postId" = posts.id
LEFT JOIN users ON users.id = likes."userId"
WHERE posts."userId" = $1
GROUP BY posts.id, posts.url, posts.content
ORDER BY posts.id DESC
LIMIT 10;
    `,
    [id]
  );
  return query;
}

export async function likesHashtagDB (hashtag) {
  const query = `
  SELECT posts.id, posts.url, posts.content, 
       COALESCE(ARRAY_AGG(users.name), '{}'::TEXT[]) AS "likedUserNames"
FROM posts 
JOIN hashtags ON hashtags."postId" = posts.id
LEFT JOIN likes ON likes."postId" = posts.id
LEFT JOIN users ON users.id = likes."userId"
WHERE hashtags.name = $1
GROUP BY posts.id, posts.url, posts.content
ORDER BY posts.id DESC
LIMIT 10;
  `
  return db.query(query, [hashtag]);
}
