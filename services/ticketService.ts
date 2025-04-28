/***
 * this file contains all business logic related to tickets
 * @author: {Deepak Kumar} <deepak.kumar@suhora.com>
 */
import Ticket, { ITicket } from "../model/Ticket";
import { ServiceError } from "../utils/ServiceError";

/***
 * this function is used to get all tickets based on user id
 */
export const getTicketByUserId = async (userId: String): Promise<any> => {
  const tickets = await Ticket.find({ userId }).populate("messages").sort({ createdAt: -1 });
  return tickets;
};
/**
 * this function is used to create a ticket
 */
export const createTicket = async (data: ITicket) => {
  const ticketresponce = await Ticket.create(data);
  const numberOfTicket = await Ticket.find().countDocuments();

  return ticketresponce;
};
/**
 * @returns all active tickets
 */
export const getAllActiveTickets = async () => {
  const tickets = await Ticket.find({ status: { $ne: "closed" } })
    .populate("messages")
    .sort({ createdAt: -1 });
  // console.log("Active tickets", tickets, "+++++");

  if (tickets.length == 0 || tickets == null) {
    return [];
  }
  return tickets;
};
/**
 * @returns all tickets
 */
export const getAllTicketService = async () => {
  console.log("getAllTicketService");
  const tickets = await Ticket.find().populate("messages").sort({ createdAt: -1 });
  console.log("All tickets", tickets, "+++++");
  if (tickets.length == 0) {
    return [];
  }
  else {
    return tickets;
  }
};



/**
 * @param ticket id
 * @returns ticket
 */
export const getTicketByIdService = async (ticketId: string): Promise<any> => {

  const savedTicket = await Ticket.findById(ticketId).populate("messages").sort({ createdAt: -1 });
  if (!savedTicket) {
    throw new ServiceError("Ticket with id " + savedTicket + " not found", 404);
  }
  return savedTicket;
};


export const updateTicket = async (ticketId: string, data: Partial<ITicket>) => {
  const findTicketById = await getTicketByIdService(ticketId);
  if (!findTicketById) {
    throw new ServiceError("Ticket not found", 404);
  }
  if (findTicketById.status === "closed") {
    throw new ServiceError("Cannot update a closed ticket", 403);
  }

  return await Ticket.findByIdAndUpdate(ticketId, data, { new: true });
};
