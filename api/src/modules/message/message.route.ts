import express from "express";
import authorize from "../../middleware/auth.middleware";
import messageController from "./message.controller";

const router = express.Router();

router.use(authorize());

router.post("/send-message/:userId", messageController.sendMessage);
router.get("/get-contacts", messageController.getContacts);
router.get("/:userId", messageController.getMessagesByUserId);

export default router;
