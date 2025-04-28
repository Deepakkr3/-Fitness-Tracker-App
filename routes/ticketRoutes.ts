import { Router } from "express";
import {
  createTicketController,
  getAllTicketsController,
  getTicketByIdController,
  getTicketByUserIdController,
  updateTicketController
} from "../controllers/ticketController";



const router = Router();

router.get("/getAllTickets", getAllTicketsController);
router.post("/createTicket", createTicketController);
router.get("/getTicketByTicketId/:ticketId", getTicketByIdController);
router.put("/updatedTicketByTicketId/:ticketId", updateTicketController);
router.get("/getTicketByUserId/:userId", getTicketByUserIdController);
// router.get("/tickets-active", getAllActiveTickets);



export default router;
