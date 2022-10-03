import { Router } from "express";
import helloWorld from "./controllers/helloWorld.js";
import listCategories from "./controllers/listCategories.js";
import newCategory from "./controllers/newCategory.js";

const router = Router();

router.get("/", helloWorld);
router.get("/categories", listCategories);
router.post("/categories", newCategory);

export default router;