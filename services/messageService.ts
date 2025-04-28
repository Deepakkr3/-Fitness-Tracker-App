/***
 * this file contains all business logic related to messages
 * @author: {Deepak Kumar} <deepak.kumar@suhora.com>
 */

import Message from "../model/Message";
import Ticket from "../model/Ticket";
import { ServiceError } from "../utils/ServiceError";



export const createMessageService = async (data: { ticketId: string; message?: string; fileUrl?: string; userId?: string; }) => {
  const ticket = await Ticket.findById(data.ticketId);
  if (!ticket) {
    throw new ServiceError("Ticket with id " + data.ticketId + " not found", 404);
  }
  if (ticket.status === 'closed') {
    throw new ServiceError("Cannot add message to a closed ticket", 403);
  }
  const message = await Message.create(data);
  await Ticket.findByIdAndUpdate(data.ticketId, {
    $push: { messages: message._id },
  });
  return message;
};


export const createFileMessageService = async (data: { ticketId: string; message?: string; newFileName?: string; userId?: string;userName?: string; }) => {
  console.log("data is",data)
  const ticket = await Ticket.findById(data.ticketId);
  if (!ticket) {
    throw new ServiceError("Ticket with id " + data.ticketId + " not found", 404);
  }

  if (ticket.status === 'closed') {
    throw new ServiceError("Cannot add message to a closed ticket", 403);
  }
  
  const message = await Message.create(data);

  await Ticket.findByIdAndUpdate(data.ticketId, {
    $push: { messages: message._id },
  });
  return message;
};



export const getMessagesByTicketId = async (ticketId: string) => {
  const ticket = await Ticket.findById(ticketId);
  if (!ticket) {
    throw new ServiceError("Ticket with id " + ticketId + " not found", 404);
  }
  return await Message.find({ ticketId }).sort({ createdAt: 1 });
};
