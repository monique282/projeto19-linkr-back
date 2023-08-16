import { db } from '../database/database.connection.js';

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














export async function postRequisitionRegisterCpf(cpf) {
    const existingUserResult = await db.query('SELECT * FROM users WHERE cpf = $1', [cpf]);
    return existingUserResult;
};



export async function postRequisitionLogin(email) {
    const emailExistsQueryResult = await db.query('SELECT * FROM users WHERE email = $1;', [email]);
    return emailExistsQueryResult;
};

export async function postRequisitionLoginSend(name, email, token) {
    const existingUserResultSend = await db.query('INSERT INTO usersLogged (name,email,token) VALUES ($1, $2, $3)', [name, email, token]);
    return existingUserResultSend;
};

export async function getRequisitionUserProducts(idseler) {
    const userProductsResult = await db.query('SELECT * FROM users WHERE email = $1;', [idseler]);
    return userProductsResult;
};
