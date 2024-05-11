import { Router } from "express";
import {
  signupUser,
  loginUser,
  getUserdetails,
  updateUserdetails,
  deleteUserdetails,
  listAllUsers,
} from "../controllers/user.controller";

const router = Router();

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.get("/profile/:id", getUserdetails);
router.patch("/profile/:id", updateUserdetails);
router.delete("/profile/:id", deleteUserdetails);
router.get("/admincp", listAllUsers);

export default router;
