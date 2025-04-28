import { z } from 'zod';



const MessageSchema = z.object({
    _id: z.string(),
    ticketId: z.string(),
    userId: z.string(),
    message: z.string().nullable().optional(),
    createdAt: z.string(), // You can also use z.date() if you're expecting a Date object
    __v: z.number(),
  });
  
  // Define the schema for the Ticket object
  export const TicketSchema = z.object({
    _id: z.string(),
    title: z.string(),
    description: z.string(),
    status: z.string(),
    userId: z.string(),
    priority: z.string(),
    userName: z.string(),
    orderId: z.string(),
    messages: z.array(MessageSchema).optional().default([]),
  });


  export type ITicketSchema = z.infer<typeof TicketSchema>;




  export const uploadFileQuerySchema = z.object({
    ticketId: z.string().uuid(),
    userId: z.string().uuid(),
    userName: z.string().optional(),
  });
  
  export type IUploadFileQuery = z.infer<typeof uploadFileQuerySchema>;


  export const schemaForGetMsgByTicketIdSchema = z.object({
    ticketId: z.string().uuid(),
  })