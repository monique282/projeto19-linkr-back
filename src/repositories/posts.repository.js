import db from "../database/database.connection.js";

export async function selectSessionsByToken(token) {
  return await db.query(`SELECT * FROM sessions WHERE token = $1;`, [token]);
}

export async function createPost(url, content, userId) {
  return await db.query(
    `INSERT INTO posts (url, content, "userId", "createdAt") VALUES ($1, $2, $3, to_timestamp($4)) RETURNING posts.id;`,
    [url, content, userId, Date.now() / 1000]
  );
}

export async function createRepost(id, userId) {
  return db.query(
    `INSERT INTO reposts ("postId", "userId", "createdAt") VALUES ($1, $2, to_timestamp($3));`,
    [id, userId, Date.now()]
  );
}

export async function validateRepost(id, userId) {
  return db.query(
    `SELECT * FROM reposts WHERE "postId" = $1 AND "userId" = $2;`,
    [id, userId]
  );
}

export async function selectPostById(postId) {
  return await db.query(`SELECT * FROM posts WHERE id = $1;`, [postId]);
}

export async function handleLike(postId, userId) {
  const existingLike = await db.query(
    `SELECT * FROM likes WHERE "postId" = $1 AND "userId" = $2;`,
    [postId, userId]
  );
  if (existingLike.rows.length == 0) {
    await db.query(`INSERT INTO likes ("userId", "postId") VALUES ($1, $2);`, [
      userId,
      postId,
    ]);
    return "Like added";
  }
  if (existingLike.rowCount > 0) {
    await db.query(`DELETE FROM likes WHERE "postId" = $1 AND "userId" = $2;`, [
      postId,
      userId,
    ]);
    return "Like removed";
  }
}

export async function sendPosts() {
  return await db.query(`SELECT 
  posts.id AS "postId",
  posts.content AS content,
  posts.url AS url,
  posts."createdAt" AS "createdAt",
  users.id AS "userId",
  users.name AS name,
  users.image AS image,
  COALESCE(likes."numberLikes", 0) AS "numberLikes",
  COALESCE(comments."numberComments", 0) AS "numberComments",
  COALESCE(reposts."numberReposts", 0) AS "numberReposts",
  ARRAY_AGG(likes."userId") AS "likedUserIds"
FROM posts
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
GROUP BY users.id, posts.id, posts.content, posts.url, posts."createdAt", users.name, users.image, likes."numberLikes", comments."numberComments", reposts."numberReposts"
ORDER BY posts.id DESC
LIMIT 10;`);
}

export async function sendReposts() {
  return db.query(`
SELECT 
  posts.id AS "postId",
  posts.content AS content,
  posts.url AS url,
  users.id AS "userId",
  users.name AS name,
  users.image AS image,
  repost_user.name AS "repostedBy",
  reposts."userId" AS "repostedId",
  reposts."createdAt" AS "createdAt",
  COALESCE(likes."numberLikes", 0) AS "numberLikes",
  COALESCE(comments."numberComments", 0) AS "numberComments",
  COALESCE(reposts."numberReposts", 0) AS "numberReposts",
  ARRAY_AGG(likes."userId") AS "likedUserIds"
FROM posts
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
  SELECT "postId", COUNT(*) AS "numberReposts", "userId", "createdAt"
  FROM reposts
  GROUP BY "postId", "userId", "createdAt"
) AS reposts ON posts.id = reposts."postId"
LEFT JOIN users AS repost_user ON reposts."userId" = repost_user.id
GROUP BY users.id, posts.id, posts.content, posts.url, posts."createdAt", users.name, users.image, reposts."createdAt", 
likes."numberLikes", comments."numberComments", reposts."numberReposts", repost_user.name, reposts."userId"
ORDER BY posts.id DESC
LIMIT 10;

  `);
}

export async function insertHashtags(values) {
  const query = `
    INSERT INTO hashtags (name, "postId") VALUES ${values
      .map((_, index) => `($${index * 2 + 1}, $${index * 2 + 2})`)
      .join(", ")};
  `;

  const queryParams = values.flat();
  await db.query(query, queryParams);
}

export async function getUserPosts(id) {
  const promise = db.query(
    `SELECT 
    posts.id AS "postId",
    posts.content AS content,
    posts.url AS url,
    posts."createdAt" AS "createdAt",
    users.id AS "userId",
    users.name AS name,
    users.image AS image,
    COALESCE(likes."numberLikes", 0) AS "numberLikes",
    COALESCE(comments."numberComments", 0) AS "numberComments",
    COALESCE(reposts."numberReposts", 0) AS "numberReposts",
    ARRAY_AGG(likes."userId") AS "likedUserIds"
  FROM posts
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
  WHERE users.id = $1
  GROUP BY users.id, posts.id, posts.content, posts.url, posts."createdAt", users.name, users.image, likes."numberLikes", comments."numberComments", reposts."numberReposts"
  ORDER BY posts.id DESC
  LIMIT 10;
  `,
    [id]
  );
  return promise;
}

export async function getUserReposts(id) {
  return db.query(
    `
    SELECT 
    posts.id AS "postId",
    posts.content AS content,
    posts.url AS url,
    users.id AS "userId",
    users.name AS name,
    users.image AS image,
    repost_user.name AS "repostedBy",
    reposts."userId" AS "repostedId",
    reposts."createdAt" AS "createdAt",
    COALESCE(likes."numberLikes", 0) AS "numberLikes",
    COALESCE(comments."numberComments", 0) AS "numberComments",
    COALESCE(reposts."numberReposts", 0) AS "numberReposts",
    ARRAY_AGG(likes."userId") AS "likedUserIds"
  FROM posts
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
    SELECT "postId", COUNT(*) AS "numberReposts", "userId", "createdAt"
    FROM reposts
    GROUP BY "postId", "userId", "createdAt"
  ) AS reposts ON posts.id = reposts."postId"
  LEFT JOIN users AS repost_user ON reposts."userId" = repost_user.id
  WHERE reposts."userId" = $1
  GROUP BY users.id, posts.id, posts.content, posts.url, posts."createdAt", users.name, users.image, reposts."createdAt", 
  likes."numberLikes", comments."numberComments", reposts."numberReposts", repost_user.name, reposts."userId"
  ORDER BY posts.id DESC
  LIMIT 10;
  `,
    [id]
  );
}

export async function getUserInfo(id, userId) {
  const promise = db.query(
    `
  SELECT users.name, users.image, users.id,
    CASE
      WHEN follows.id IS NOT NULL THEN 'following'
      ELSE 'not following'
    END AS status
  FROM users 
  LEFT JOIN follows ON follows."followedId" = users.id AND follows."followingId" = $2
  WHERE users.id = $1;
  `,
    [id, userId]
  );
  return promise;
}

// verificando se o post existe
export async function getRequisitionPostId(id) {
  const idPostResult = await db.query("SELECT * FROM posts WHERE id = $1;", [
    id,
  ]);
  return idPostResult;
}

// apagando o post
export async function deleteSendPostId(id) {
  const serveSend = await db.query(`DELETE FROM posts WHERE id = $1;`, [id]);
  return serveSend;
}

export async function deleteHashtags(id) {
  const promise = db.query(`DELETE FROM hashtags WHERE "postId" = $1;`, [id]);
  return promise;
}

export async function updatePost(content, id) {
  const promise = db.query(`UPDATE posts SET content = $1 WHERE id = $2;`, [
    content,
    id,
  ]);
  return promise;
}

export async function followingStatusDB(userId) {
  const query = `
  SELECT 
    COALESCE(ARRAY_AGG(users.id), ARRAY[]::INTEGER[]) AS "followedIds",
    COALESCE(ARRAY_AGG(users.name), ARRAY[]::TEXT[]) AS "followedNames"
  FROM follows
  JOIN users ON users.id = follows."followedId"
  WHERE "followingId" = $1;
  `;
  const result = await db.query(query, [userId]);
  return result.rows[0];
}
