// esse arquivo aqui serve para executar todas as funções que eu preciso
// esse arquivo é chamado la em Routes
// esse arquivo aqui é enviado por um post para faser o cadastro


import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import {
    postRequisitionRegisterEmail, postRequisitionRegisterSend,
    postRequisitionLogin, postRequisitionLoginSend
} from '../repositories/repositoryUsers.js';



// essa função aqui serve para enviar um post para criar um cadastro
export async function registerPost(req, res) {

    // pegar os dados que a pessoa colocou na tela de cadastro
    const { name, email, photo, password } = req.body;

    try {

        // verificando se o email ja esta cadastrado
        const existingUserEmail = await postRequisitionRegisterEmail(email);

        if (existingUserEmail.rows.length > 0) {
            return res.status(409).send({ message: "E-mail já cadastrado. Por favor, utilize outro e-mail." });
        }

        // cripitografas a senha 
        const passwordsafe = bcrypt.hashSync(password, 2);

        let query = 'INSERT INTO users (email, password, name, photo) VALUES ($1, $2, $3, $4,) ';
        const queryParams = [];

        // Verificando os parâmetros enviados pela query são validos
        // verificando se name é valido
        if (typeof name !== 'undefined' && name !== '') {
            queryParams.push(name);
        } else {
            return res.status(422).send({ message: "Formato de nome invalido." });
        };

        // verificando se o email é valido
        if (typeof email !== 'undefined' && email !== '') {
            queryParams.push(email);
        } else {
            return res.status(422).send({ message: "Formato de email invalido." });
        };


        // verificando se o photo é valida
        if (typeof photo !== 'undefined' && photo !== '') {
            queryParams.push(photo);
        } else {
            return res.status(422).send({ message: "Formato de senha invalido." });
        };

        // verificando se a senha é valida
        if (typeof password !== 'undefined' && password !== '') {
            queryParams.push(passwordsafe);
        } else {
            return res.status(422).send({ message: "Formato de confirmar senha invalido." });
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
        await postRequisitionLoginSend(emailExistsQuery.rows[0].name, email, token);
        return res.status(200).send({ name: emailExistsQuery.rows[0].name, token });


    } catch (erro) {
        res.status(500).send(erro.message);
    };
};


