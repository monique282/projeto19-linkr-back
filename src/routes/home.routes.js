import { Router } from "express";

const homeRouter = Router();

homeRouter.get("/home", getAllItems);

export default homeRouter;
