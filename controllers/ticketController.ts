import { Request, Response } from "express";
import url from "url";
import { z } from "zod";
import { schemaForGetMsgByTicketIdSchema } from "../schemas/responseSchema";
import { createTicketSchema, updateTicketSchema } from "../schemas/ticketValidation";
import * as TicketService from "../services/ticketService";
import { ServiceError } from "../utils/ServiceError";



export const createTicketController = async (req: Request, res: Response):Promise<any> => {
  const validationResult = createTicketSchema.safeParse(req.body);
  if (!validationResult.success) {
    return res.status(400).json({ "success": false, "message": "unprocessable entity", errors: validationResult.error });
  }
  try {
    const { orderId, orderName } = req.body;
    if (orderId || orderName) {
      req.body.priority = "high";
    }
    const ticket = await TicketService.createTicket(req.body);
    res.status(201).json(ticket);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
    } else {
      res.status(500).json({ error: error });
    }
  }
};




export const getAllTicketsController = async (req: Request, res: Response):Promise<any> => {
  console.log("getAllTicketsController");
  try {
    let tickets = await TicketService.getAllTicketService();
    if (!tickets || tickets.length === 0) {
      return res.status(404).json({ message: "No tickets found" });
    }

    const proxyBasePath: string | undefined = req.get("x-base-url");
    let pathName: string;
    if (proxyBasePath) {
      pathName = proxyBasePath;
    } else {
      pathName = ``;
    }

    const responseUrl = url.format({ protocol: req.protocol, host: req.get("host") })
    const responceUrlFinal = responseUrl + pathName

    if (tickets.length > 0) {
      const updatedTickets = tickets.map((eachTicket:any) => {
        const { messages, ...restTicket } = eachTicket.toObject()

        const modifiedMessage = eachTicket.messages.map((message: any) => {
          const { newFileName, ...restMessage } = message.toObject()
          const modifiedUrl = message.newFileName ? responceUrlFinal + message.newFileName : '';

          const msgData = {
            newFileName: modifiedUrl,
            ...restMessage
          };
          return msgData;
        });


        const data = {
          messages: modifiedMessage,
          ...restTicket
        };
        return data;
      })
      res.status(200).json({
        success: true,
        message: "Tickets fetched successfully",
        data: updatedTickets,
      })
    } else {
      res.status(200).json({
        success: true,
        message: "No tickets found",
        data: [],
      })
    }
  } catch (error: any) {
    if (error instanceof ServiceError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message+"jkbib"
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Internal server error1',
      });
    }
  }
};



export const getTicketByIdController = async (req: Request<{ ticketId: string }, {}, {}>, res: Response):Promise<any> => {
  const parsedResult = schemaForGetMsgByTicketIdSchema.safeParse(req.params)
  if (!parsedResult.success) {
    return res.status(422).json({
      success: false,
      message: "Unprocessable Entity",
      errors: parsedResult.error.errors,
    });
  }
  try {
    const ticket = await TicketService.getTicketByIdService(parsedResult.data.ticketId);

    const proxyBasePath: string | undefined = req.get("x-base-url");
    let pathName: string;
    if (proxyBasePath) {
      pathName = proxyBasePath;
    } else {
      pathName = ``;
    }

    const responseUrl = url.format({ protocol: req.protocol, host: req.get("host") })
    const responceUrlFinal = responseUrl + pathName

    const modifiedData = {
      ...ticket.toObject()
    }

    if (modifiedData.messages && modifiedData.messages.length > 0) {
      modifiedData.messages.map((message: any) => {
        const modifiedUrl = message.newFileName ? responceUrlFinal + message.newFileName : '';
        message.newFileName = modifiedUrl;
      });

      return res.status(200).json({
        success: true,
        message: "Ticket fetched successfully",
        data: modifiedData,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Ticket fetched successfully",
        data: ticket,
      })
    }
  } catch (error: any) {
    if (error instanceof ServiceError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
};




export const updateTicketController = async (req: Request<{ ticketId: string }, {}, {}>, res: Response):Promise<any> => {
  if (!req.params.ticketId) {
    return res.status(400).json({ message: "Ticket ID is required" });
  }
  const parsedResult = updateTicketSchema.safeParse(req.body);
  if (!parsedResult.success) {
    return res.status(422).json({
      success: false,
      message: "Unprocessable Entity",
      errors: parsedResult.error.errors,
    })
  }
  try {
    const ticket = await TicketService.updateTicket(req.params.ticketId, req.body);
    res.status(200).json({
      success: true,
      message: "Ticket updated successfully",
      data: ticket,
    })
  } catch (error: any) {
    if (error instanceof ServiceError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
};



export const getTicketByUserIdController = async (req: Request, res: Response):Promise<any> => {
  const { userId } = req.params;
  try {
    const tickets = await TicketService.getTicketByUserId(userId);
    if (!tickets || tickets.length === 0) {
      return res.status(404).json({ message: "No tickets found for this user" });
    }

    const proxyBasePath: string | undefined = req.get("x-base-url");
    let pathName: string;
    if (proxyBasePath) {
      pathName = proxyBasePath;
    } else {
      pathName = ``;
    }

    const responseUrl = url.format({ protocol: req.protocol, host: req.get("host") })
    const responceUrlFinal = responseUrl + pathName

    if (tickets.length > 0) {
      const updatedTickets = tickets.map((eachTicket: any) => {
        const { messages, ...restTicket } = eachTicket.toObject()

        const modifiedMessage = eachTicket.messages.map((message: any) => {
          const { newFileName, ...restMessage } = message.toObject()
          const modifiedUrl = message.newFileName ? responceUrlFinal + message.newFileName : '';

          const msgData = {
            newFileName: modifiedUrl,
            ...restMessage
          };
          return msgData;
        });


        const data = {
          messages: modifiedMessage,
          ...restTicket
        };
        return data;
      })
      res.status(200).json({
        success: true,
        message: "Tickets fetched successfully",
        data: updatedTickets,
      })
    } else {
      res.status(200).json({
        success: true,
        message: "No tickets found",
        data: [],
      })
    }
  } catch (error: any) {
    if (error instanceof ServiceError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
};


export const getAllActiveTickets = async (req: Request, res: Response) => {
  try {
    const activeTickets = await TicketService.getAllActiveTickets();
    if (!activeTickets || activeTickets.length === 0) {
      return res.status(404).json({ message: "No active tickets found" });
    }
    return res.json({ length: activeTickets.length, activeTickets });
  } catch (error: any) {
    if (error instanceof ServiceError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
};
