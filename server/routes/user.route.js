import { Router } from "express";
const router = Router();

import * as controller from "../controllers/userControler.js";

router.route("/register").post(controller.register);

export default router;
