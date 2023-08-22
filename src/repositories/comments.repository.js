import db from "../database/database.connection.js";

export function insertComment(postId, userId, content) {
  const promise = db.query(
    `INSERT INTO comments ("postId", "userId", content) VALUES ($1, $2, $3);`,
    [postId, userId, content]
  );

  return promise;
}
