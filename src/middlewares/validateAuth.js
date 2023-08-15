import db from "../database/database.connection.js";

export default async function validateAuth(req, res, next) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.sendStatus(401).send("Token não enviado!");

  try {
    const session = await db.query(
      `SELECT "userId" FROM sessions WHERE token = $1;`,
      [token]
    );
    if (session.rowCount === 0)
      return res.status(404).send("Usuário não encontrado, faça login!");

    res.locals.user = session.rows[0];
    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
}
