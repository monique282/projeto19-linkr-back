
import { Router } from "express";
import { editPostById, getPosts, getPostsById, likePost, newPost, newRepost, postDelete } from "../controllers/posts.controller.js";
import validateAuth from "../middlewares/validateAuth.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { likeSchema, postSchema } from "../schemas/main.schemas.js";

const postsRouter = Router();

postsRouter.post("/new-post", validateAuth, validateSchema(postSchema), newPost);
postsRouter.post("/like", validateAuth, validateSchema(likeSchema), likePost);
postsRouter.post("/repost/:id", validateAuth, newRepost)
postsRouter.get("/timeline", validateAuth, getPosts)
postsRouter.get("/user/:id", validateAuth, getPostsById )
postsRouter.delete("/postDelete/:id", postDelete);
postsRouter.patch("/edit/:id", editPostById)

export default postsRouter;