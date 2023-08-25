import { Router } from "express";
import { getHashtags, getLikesByHashtag, getOneHashtag, getOneHashtagScroll } from "../controllers/hashtag.controller.js";
import validateAuth from "../middlewares/validateAuth.js";

const hashtagRouter = Router();

hashtagRouter.get("/hashtags", validateAuth, getHashtags);
hashtagRouter.get("/hashtagScroll/:hashtag", validateAuth, getOneHashtagScroll);
hashtagRouter.get("/hashtag/:hashtag", validateAuth, getOneHashtag);
hashtagRouter.get("/hashtags/likes/:hashtag", validateAuth, getLikesByHashtag);

export default hashtagRouter;