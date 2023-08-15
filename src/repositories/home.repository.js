import db from "../database/database.connection.js";


export const selectAllItems = () => {
  const promise = db.query(`SELECT * FROM posts`);
  return promise;
};
