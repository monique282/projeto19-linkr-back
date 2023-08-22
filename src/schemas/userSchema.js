import joi from "joi";

export const registerTable = joi.object({

    email: joi.string().email().required(),
    password: joi.string().min(3).required(),
    name: joi.string().min(1).required(),
    image: joi.string().uri().required()
});

export const loginTable = joi.object({

    email: joi.string().email().required(),
    password: joi.string().min(3).required()
});

export const followSchema = joi.object({
    userId: joi.number().integer().required()
})