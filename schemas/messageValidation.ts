/***
 * for validation of message creation
 * @author: {Deepak Kumar} <deepak.kumar@suhora.com>
 */
import { string, z } from "zod";







// Message creation schema
export const createMessageSchema = z.object({
  ticketId: z.string().uuid().min(1, "Ticket ID is required"), 
  userId: z.string().min(1, "User id required"),
  message: string().min(1).max(600,"Max 600 characters allowed.").optional(),
  createdAt: z.date().optional(),
});


export type ICreateMessageSchema = z.infer<typeof createMessageSchema>



