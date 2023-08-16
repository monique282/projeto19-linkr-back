import { Router } from "express";
import { getAllItems,} from "../controllers/home.controller.js";

const homeRouter = Router();

homeRouter.get("/home", getAllItems);

export default homeRouter;
