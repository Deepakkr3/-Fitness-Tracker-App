import { Router } from "express";
import { createMessageController, getMessagesByTicketIdController, uploadFileToRespectedTicketIdController } from "../controllers/messageController";



const router = Router();

router.post("/createMessage", createMessageController);
router.get("/getAllMessagesByTicketId/:ticketId", getMessagesByTicketIdController);
router.patch("/uploadImageFile", uploadFileToRespectedTicketIdController)

export default router;