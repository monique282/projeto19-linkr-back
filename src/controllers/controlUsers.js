// esse arquivo aqui serve para executar todas as funções que eu preciso
// esse arquivo é chamado la em Routes
// esse arquivo aqui é enviado por um post para faser o cadastro


import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import {
    deleteSendSessionsToken, followDB, getRequisitionUser, postRequisitionLogin,
    postRequisitionLoginSend, postRequisitionRegisterEmail,
    postRequisitionRegisterSend, postRequisitionValidateToken, situationFollowDB, unfollowDB
} from '../repositories/repositoryUsers.js';
import db from '../database/database.connection.js';
import { followingStatusDB } from '../repositories/posts.repository.js';

// essa função aqui serve para enviar um post para criar um cadastro
export async function registerPost(req, res) {

    // pegar os dados que a pessoa colocou na tela de cadastro
    const { name, email, image, password } = req.body;

    try {

        // verificando se o email ja esta cadastrado
        const existingUserEmail = await postRequisitionRegisterEmail(email);

        if (existingUserEmail.rows.length > 0) {
            return res.status(409).send({ message: "E-mail já cadastrado. Por favor, utilize outro e-mail." });
        }

        // cripitografas a senha 
        const passwordsafe = bcrypt.hashSync(password, 2);

        let query = 'INSERT INTO users (email, password, name, image) VALUES ($1, $2, $3, $4)';
        const queryParams = [];

        // Verificando os parâmetros enviados pela query são validos

        // verificando se o email é valido
        if (typeof email !== 'undefined' && email !== '') {
            queryParams.push(email);
        } else {
            return res.status(422).send({ message: "Formato de email invalido." });
        };

        // verificando se a senha é valida
        if (typeof password !== 'undefined' && password !== '') {
            queryParams.push(passwordsafe);
        } else {
            return res.status(422).send({ message: "Formato de confirmar senha invalido." });
        };

        // verificando se name é valido
        if (typeof name !== 'undefined' && name !== '') {
            queryParams.push(name);
        } else {
            return res.status(422).send({ message: "Formato de nome invalido." });
        };

        // verificando se o photo é valida
        if (typeof image !== 'undefined' && image !== '') {
            queryParams.push(image);
        } else {
            return res.status(422).send({ message: "Formato de imagem invalido." });
        };

        // enviar os dados pro servidor pra quando o cadastro der certo
        await postRequisitionRegisterSend(query, queryParams);
        return res.sendStatus(201);

    } catch (erro) {
        res.status(500).send(erro.message);
    };
};

// essa função aqui serve pra envia um poste e fazer login
export async function loginPost(req, res) {

    // pegar os dados que a pessoa colocou na tela de cadastro
    const { email, password } = req.body;

    try {

        // verificando se o email ja esta cadastrado
        const emailExistsQuery = await postRequisitionLogin(email);
        if (emailExistsQuery.rows.length === 0) {
            return res.status(401).send({ message: "E-mail não cadastrado. Por favor, utilize um e-mail valido, ou faça o cadastro." });
        }

        // vericiar se a senha esta correta
        const correctPassword = bcrypt.compareSync(password, emailExistsQuery.rows[0].password);
        if (!correctPassword) {
            return res.status(401).send({ message: "Senha incorreta" });
        }

        // gernado o token
        const token = uuid();

        // enviar os dados pro servidor pra quando o cadastro der certo
        await postRequisitionLoginSend(token, emailExistsQuery.rows[0].id);
        return res.status(200).send({ token, userId: emailExistsQuery.rows[0].id, image: emailExistsQuery.rows[0].image });


    } catch (erro) {
        res.status(500).send(erro.message);
    };
};

// função que deleta o usuario da tabela de sessoes
export async function usersSessionslete(req, res) {

    // pegando os dados do token
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "")

    try {

        // validando o token
        const userLogeed = await postRequisitionValidateToken(token);
        if (userLogeed.rows.length === 0) {
            return res.status(401).send({ message: "Usuário não autorizado." });
        };

        // fazendo a requisição para deletar usuario logado da tabela 
        await deleteSendSessionsToken(token);

        // se tudo der certo
        res.sendStatus(204);

    } catch (erro) {
        res.status(500).send(erro.message);
    };
}

// função para realizar a busca no servidor 
export async function performSearchNoServerGet(req, res) {
    // pegando as informação digitadas na barra de pesquisa
    const { name } = req.params;
    const { userId } = res.locals.user;

    try {

        // fazendo a requisição para buscar o usuario na tabela 
        const result = await getRequisitionUser(name, userId);

        //const follows = await followingStatusDB(userId);

        // se tudo der certo
        const usersRequest = result;
    
        res.send(usersRequest);

    } catch (erro) {
        res.status(500).send(erro.message);
    };
}

export async function follow ( req, res ) {
    const { userId: followingId } = res.locals.user;
    const { userId: followedId } = req.body;
    try {

        const result = await situationFollowDB( followingId, followedId );

        if ( result.rowCount === 0 ) {
            await followDB(followingId, followedId);
            return res.sendStatus(200);
        }

        await unfollowDB(followingId, followedId);
        return res.sendStatus(204);

    } catch (err) {
        res.status(500).send(err.message);
    };
}