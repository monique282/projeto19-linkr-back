import Joi from "joi"

export const postSchema = Joi.object({
  url: Joi.string().uri({ scheme: ['http', 'https'] }).required(),
  content: Joi.string()
})
