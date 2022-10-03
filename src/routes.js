import { Router } from "express";
import helloWorld from "./controllers/helloWorld.js";
import categoryList from "./controllers/categoryList.js";
import registerCategory from "./controllers/registerCategory.js";
import registerGame from "./controllers/registerGame.js";
import gameList from "./controllers/gameList.js";
import customersList from "./controllers/customersList.js";
import theCustomer from "./controllers/theCustomer.js";
import newCustomer from "./controllers/newCustomer.js";
import updateCustomer from "./controllers/updateCustomer.js";
import rentGame from "./controllers/rentGame.js";
import rentalList from "./controllers/rentalList.js";
import returnGame from "./controllers/returnGame.js";

const router = Router();

router.get("/", helloWorld);
router.get("/categories", categoryList);
router.post("/categories", registerCategory);
router.get("/games", gameList);
router.post("/games", registerGame);
router.get("/customers", customersList);
router.get("/customers/:id", theCustomer);
router.post("/customers", newCustomer);
router.put("/customers/:id", updateCustomer);
router.get("/rentals", rentalList);
router.post("/rentals", rentGame);
router.post("/rentals/:id/return", returnGame);

export default router;