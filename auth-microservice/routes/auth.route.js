import { Router } from "express";
import {
  signup,
  login,
  getUserdetails,
  updateUserdetails,
  deleteUserdetails,
  listAllUsers,
} from "../controllers/user.controller";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/user/:id", getUserdetails);
router.patch("/user/:id", updateUserdetails);
router.delete("/user/:id", deleteUserdetails);
router.get("/all-users", listAllUsers);

export default router;
