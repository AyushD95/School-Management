import { Router } from "express";
import { addSchool, listSchool } from "../controller/schoolController.js";

const router = Router();

router.post("/addSchool", addSchool);

router.get("/listSchools", listSchool);

export default router;
