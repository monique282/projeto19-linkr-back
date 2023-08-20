import { Router } from "express";
import validateAuth from "../middlewares/validateAuth.js";
import { getLikes } from "../controllers/likes.controllers.js";

const likeRouter = Router();

likeRouter.get("/likes", validateAuth, getLikes);

export default likeRouter;