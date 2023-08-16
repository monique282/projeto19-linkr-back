import { Router } from "express";
import { postSchema } from "../schemas/main.schemas.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import validateAuth from "../middlewares/validateAuth.js";
import { getAllItems, newPost } from "../controllers/home.controller.js";

const homeRouter = Router();

homeRouter.get("/home", getAllItems);

homeRouter.post("/new-post", validateAuth, validateSchema(postSchema), newPost);

export default homeRouter;
