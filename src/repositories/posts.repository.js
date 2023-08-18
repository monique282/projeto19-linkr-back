import db from "../database/database.connection.js"

export async function selectSessionsByToken(token) {
  return await db.query(`SELECT * FROM sessions WHERE token = $1`, [token])
}

export async function createPost(url, content, userId) {
  return await db.query(`INSERT INTO posts (url, content, "userId") VALUES ($1, $2, $3) RETURNING posts.id`, [url, content, userId])
}

export async function selectPostById(postId) {
  return await db.query(`SELECT * FROM posts WHERE id = $1`, [postId])
}

export async function insertLike(userId, postId){
  return await db.query(`INSERT INTO likes (userId, postId) VALUES ($1, $2)`, [userId, postId])
}
export async function removeLike(userId, postId){
  return await db.query(`DELETE FROM likes WHERE userId = $1 AND postId = $2`, [userId, postId])
}

export async function sendPosts(){
  return await db.query(`SELECT 
  users.id AS "userId",
  users.name AS name,
  users.image AS image,
  posts.id AS "postId",
  posts.content AS content,
  posts.url AS url,
  COUNT(likes."userId") AS "numberLikes"
  FROM posts
  JOIN users ON posts."userId" = users.id
  LEFT JOIN likes ON likes."postId" = posts.id
  GROUP BY users.id, users.name, users.image, posts.id, posts.content, posts.url
  ORDER BY "postId" DESC
  LIMIT 20`)
}

export async function insertHashtags(values) {
  const query = `
    INSERT INTO hashtags (name, "postId") VALUES ${values.map((_, index) => `($${index * 2 + 1}, $${index * 2 + 2})`).join(', ')}
  `;

  const queryParams = values.flat();
  await db.query(query, queryParams);
}