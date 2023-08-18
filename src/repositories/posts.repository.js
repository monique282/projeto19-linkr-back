import db from "../database/database.connection.js"

export async function selectSessionsByToken(token) {
  return await db.query(`SELECT * FROM sessions WHERE token = $1`, [token])
}

export async function createPost(url, content, userId) {
  return await db.query(`INSER INTO posts (url, content, "userId") VALUES ($1, $2, $3)`, [url, content, userId])
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

export async function sendPosts()