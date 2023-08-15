import cors from "cors";
import express, { json } from "express";
import router from "./routes/index.routes.js";

const app = express();

app.use(cors());
app.use(json());
app.use(router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
