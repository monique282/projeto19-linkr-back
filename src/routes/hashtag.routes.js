import { Router } from "express";
import { getHashtags, getOneHashtag } from "../controllers/hashtag.controller.js";
import validateAuth from "../middlewares/validateAuth.js";

const hashtagRouter = Router();

hashtagRouter.get("/hashtags", validateAuth, getHashtags);
hashtagRouter.get("/hashtag/:hashtag", validateAuth, getOneHashtag);

export default hashtagRouter;