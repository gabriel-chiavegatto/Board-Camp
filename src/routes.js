import { Router } from "express";
import helloWorld from "./controllers/helloWorld.js";
import categoryList from "./controllers/categoryList.js";
import registerCategory from "./controllers/registerCategory.js";
import registerGame from "./controllers/registerGame.js";
import gameList from "./controllers/gameList.js";

const router = Router();

router.get("/", helloWorld);
router.get("/categories", categoryList);
router.post("/categories", registerCategory);
router.get("/games", gameList);
router.post("/games", registerGame);

export default router;