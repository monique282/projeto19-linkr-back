import Joi from "joi"

export const postSchema = Joi.object({
  url: Joi.string().uri({ scheme: ['http', 'https'] }).required(),
  content: Joi.string(),
  hashtags: Joi.any()
})

export const likeSchema = Joi.object({
  postId: Joi.number().integer().required(),
  userId: Joi.number().integer().required(),
  isLiked: Joi.boolean().required()
})
