import db from "../database/database.connection.js";
import { followingStatusDB } from "./posts.repository.js";

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
export async function getRequisitionUser(name, userId) {
    // pegando todos os usuarios que tem os que eu digitei
    const existingUsersResult = await db.query(`SELECT * FROM users WHERE LOWER(name) LIKE LOWER($1 || '%');`, [name]);

    // apartir do meu usuario logado pelo meu id eu vou ver quem eu sigo
    const followedStatus = await followingStatusDB(userId);

    // pegando os usuarios que eu sigo pelo id
    const followedIds = followedStatus.followedIds;

    // aqui ele vai fazer um map somente dos usuarios que eu sigo
    const usersWithFollowStatus = existingUsersResult.rows.map(user => {
        const follow = followedIds.includes(user.id);
        return { ...user, follow };
    });

    // fazendo um filtro os usuarios que eu sigo
    const usersYouFollow = usersWithFollowStatus.filter(user => user.follow);

    // aqui são os que eu não sigo
    const usersYouDontFollow = usersWithFollowStatus.filter(user => !user.follow);

    // juntando os que eu sigo com os que eu não sigo
    const orderedUsers = [...usersYouFollow, ...usersYouDontFollow];
    const result = orderedUsers;

    return result;
};


export async function situationFollowDB(followingId, followedId) {
    const query = `
        SELECT id FROM follows WHERE "followingId" = $1 AND "followedId" = $2;
    `
    return db.query(query, [followingId, followedId]);
}

export async function followDB(followingId, followedId) {
    const query = `
        INSERT INTO follows ( "followingId", "followedId" ) VALUES ( $1, $2 );
    `
    return db.query(query, [followingId, followedId])
}

export async function unfollowDB(followingId, followedId) {
    const query = `
        DELETE FROM follows WHERE "followingId" = $1 AND "followedId" = $2 RETURNING 'OI';
    `
    return db.query(query, [followingId, followedId])
}
