import { z } from "zod";
export const createTicketSchema = z.object({
  title: z.string().min(2, "title should be greater than 5 characters"),
  description: z.string().min(10, "description should be greater than 10 characters").max(600, "Description should be less than 600 characters"),
  status: z.enum(["open", "closed"]).optional().default("open"),
  userId: z.string().min(1, "User ID is required"), 
  createdAt: z.date().optional(),
  messages: z.array(z.any().optional()).optional(), 
  priority:z.string().optional(),
  orderId:z.string().optional(),
  orderName:z.string().optional(),
});

//Ticket update schema (for updating status or messages)
export const updateTicketSchema = z.object({
  status: z.enum(["open", "closed"]),
  messages: z.array(z.string().optional()).optional(), 
});


export type IUpdateTicketStatusSchema = z.infer<typeof createTicketSchema>;