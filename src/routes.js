import { Router } from "express";
import { helloWorld } from "./controllers/helloWorld.js";

const router = Router();

router.get("/", helloWorld);

export default router;