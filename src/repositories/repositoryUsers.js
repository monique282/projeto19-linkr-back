import db from "../database/database.connection.js";

// verificando se o email ja esta cadastrado
export async function postRequisitionRegisterEmail(email) {
    const existingUserResult = await db.query('SELECT * FROM users WHERE email = $1;', [email]);
    return existingUserResult;
};

// enviar os dados pro servidor pra quando o cadastro der certo
export async function postRequisitionRegisterSend(query, queryParams) {
    const existingUserResultSend = await db.query(query, queryParams);;
    return existingUserResultSend;
};

// verificando se o email ja esta no sistema
export async function postRequisitionLogin(email) {
    const emailExistsQueryResult = await db.query('SELECT * FROM users WHERE email = $1;', [email]);
    return emailExistsQueryResult;
};

// enviar os dados pro servidor pra quando o login der certo
export async function postRequisitionLoginSend(token, userId) {
    const existingUserResultSend = await db.query('INSERT INTO sessions (token, "userId") VALUES ($1, $2);', [token, userId]);
    return existingUserResultSend;
};

export async function postRequisitionValidateToken(token) {
    const userLogeedResult = await db.query('SELECT * FROM sessions WHERE token = $1;', [token]);
    return userLogeedResult;
};

export async function deleteSendSessionsToken(token) {
    const serveSend = await db.query(`DELETE FROM sessions WHERE "token" = $1;`, [token]);
    return serveSend;
};

// verificando os usuarios na tabela 
export async function getRequisitionUser(name) {
    const ExistingUsersResult = await db.query(`SELECT * FROM users WHERE LOWER(name) LIKE LOWER($1 || '%');`, [name]);
    return ExistingUsersResult;
};

export async function situationFollowDB ( followingId, followedId ) {
    const query = `
        SELECT id FROM follows WHERE "followingId" = $1 AND "followedId" = $2;
    `
    return db.query(query, [ followingId, followedId ]);
}

export async function followDB ( followingId, followedId ) {
    const query =`
        INSERT INTO follows ( "followingId", "followedId" ) VALUES ( $1, $2 );
    `
    return db.query( query, [followingId, followedId])
}

export async function unfollowDB ( followingId, followedId ) {
    const query = `
        DELETE FROM follows WHERE "followingId" = $1 AND "followedId" = $2 RETURNING 'OI';
    `
    return db.query(query , [followingId, followedId])
}
