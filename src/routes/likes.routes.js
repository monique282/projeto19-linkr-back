import { Router } from "express";
import { getLikes, getLikesByUser } from "../controllers/likes.controllers.js";
import validateAuth from "../middlewares/validateAuth.js";

const likeRouter = Router();

likeRouter.get("/likes", validateAuth, getLikes);
likeRouter.get("/likes/:id", validateAuth, getLikesByUser);

export default likeRouter;