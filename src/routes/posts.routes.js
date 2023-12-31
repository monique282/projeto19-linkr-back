
import { Router } from "express";
import { editPostById, getPosts, getPostsById, getPostsByIdScroll, getPostsScroll, likePost, newPost, newRepost, postDelete } from "../controllers/posts.controller.js";
import validateAuth from "../middlewares/validateAuth.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { likeSchema, postSchema } from "../schemas/main.schemas.js";

const postsRouter = Router();

postsRouter.post("/new-post", validateAuth, validateSchema(postSchema), newPost);
postsRouter.post("/like", validateAuth, validateSchema(likeSchema), likePost);
postsRouter.post("/repost/:id", validateAuth, newRepost)
postsRouter.get("/timeline", validateAuth, getPosts)
postsRouter.get("/timelineScroll", validateAuth, getPostsScroll)
postsRouter.get("/user/:id", validateAuth, getPostsById )
postsRouter.get("/userScroll/:id", validateAuth, getPostsByIdScroll )
postsRouter.delete("/postDelete/:id", postDelete);
postsRouter.patch("/edit/:id", editPostById)

export default postsRouter;