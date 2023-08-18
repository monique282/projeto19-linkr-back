import db from "../database/database.connection.js"

// verificando se o email ja esta cadastrado
export async function postRequisitionRegisterEmail(email) {
    const existingUserResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);
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
    const existingUserResultSend = await db.query('INSERT INTO sessions (token, "userId") VALUES ($1, $2)', [token, userId]);
    return existingUserResultSend;
};

