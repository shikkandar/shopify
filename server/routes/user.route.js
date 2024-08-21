import { Router } from "express";
const router = Router();

import * as controller from "../controllers/userControler.js";

router.route("/register").post(controller.register);
router.route("/login").post(controller.login);

router.route("/user/:userId").get(controller.getUsers);

export default router;
