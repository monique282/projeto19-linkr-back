import db from "../database/database.connection.js";


export const selectAllItems = async () => {
  return await db.query(`SELECT * FROM posts`);
};

