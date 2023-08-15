import { Router } from "express";
import { getHashtags } from "../controllers/hashtag.controller.js";
import validateAuth from "../middlewares/validateAuth.js";

const hashtagRouter = Router();

hashtagRouter.get("/hashtags", validateAuth, getHashtags);

export default hashtagRouter;