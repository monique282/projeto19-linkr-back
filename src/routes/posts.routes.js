import { Router } from "express";
import validateAuth from "../middlewares/validateAuth.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { likeSchema, postSchema } from "../schemas/main.schemas.js";
import { getPosts, likePost, newPost } from "../controllers/posts.controller.js";

const postsRouter = Router();

postsRouter.post("/new-post", validateAuth, validateSchema(postSchema), newPost);
postsRouter.post("/like", validateAuth, validateSchema(likeSchema), likePost);
postsRouter.get("/timeline", validateAuth, getPosts)

export default postsRouter;