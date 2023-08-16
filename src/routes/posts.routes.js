import { Router } from "express";
import validateAuth from "../middlewares/validateAuth.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { postSchema } from "../schemas/main.schemas.js";
import { newPost } from "../controllers/posts.controller.js";

const postsRouter = Router();

postsRouter.post("/new-post", validateAuth, validateSchema(postSchema), newPost);

export default postsRouter;