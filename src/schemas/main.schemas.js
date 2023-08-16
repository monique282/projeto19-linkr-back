import Joi from "joi"

export const postSchema = Joi.object({
  photo: Joi.string().uri({ scheme: ['http', 'https'] }).required(),
  content: Joi.string().required()
})
