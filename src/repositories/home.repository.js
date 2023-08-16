import db from "../database/database.connection.js";


export const selectAllItems = async () => {
  return await db.query(`SELECT * FROM posts`);
};

export async function selectSessionsByToken(token) {
  return await db.query(`SELECT * FROM sessions WHERE token = $1`, [token])
}
export async function createPost(url, content, userId) {
  return await db.query(`INSER INTO posts (url, content, "userId") VALUES ($1, $2, $3)`, [url, content, userId])
}