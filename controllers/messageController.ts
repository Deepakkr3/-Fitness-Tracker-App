import { Request, Response } from "express";
import { createMessageSchema, ICreateMessageSchema } from "../schemas/messageValidation";
import { schemaForGetMsgByTicketIdSchema, uploadFileQuerySchema } from "../schemas/responseSchema";
import * as MessageService from "../services/messageService";
import { ServiceError } from "../utils/ServiceError";
import { uploadImage } from "../utils/uploadImage";




export const createMessageController = async (req: Request<{}, {}, ICreateMessageSchema>, res: Response) :Promise<any>=> {
  const parsedResult = createMessageSchema.safeParse(req.body);
  if (!parsedResult.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid request",
      errors: parsedResult.error.errors,
    }); 
  }
  try {
    const message = await MessageService.createMessageService(req.body);
    res.status(201).json({
      success: true,
      message: "Message created successfully",
      data: message,
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



export const getMessagesByTicketIdController = async (req: Request<{ ticketId: string }, {}, {}>, res: Response): Promise<void> => {
  const parsedResult = schemaForGetMsgByTicketIdSchema.safeParse(req.params)
  if (!parsedResult.success) {
    res.status(422).json({
      success: false,
      message: "Unprocessable Entity",
      errors: parsedResult.error.errors,
    });
    return;
  }

  try {
    const messages = await MessageService.getMessagesByTicketId(req.params.ticketId);

    const protocol = req.protocol
    const host = req.get('host')
    let proxyBasePath: string | undefined = req.get('x-base-url')
    if (proxyBasePath) {
      proxyBasePath = '/' + proxyBasePath.replace(/^\/|\/$/g, '');
    } else {
      proxyBasePath = ''
    }

    if (messages.length > 0) {
      const midifiedMessage = messages.map((eachMessage) => {
        const { newFileName, ...restField } = eachMessage.toObject()
        const fullImageUrl = eachMessage.newFileName ? `${protocol}://${host}${proxyBasePath}${eachMessage.newFileName}` : ''
        const data = {
          newFileName: fullImageUrl,
          ...restField
        }
        return data
      })
      res.status(200).json({
        success: true,
        message: "Messages fetched successfully",
        data: midifiedMessage,
      })
    } else {
      res.status(200).json({
        success: true,
        message: "No messages found for this ticket",
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



export const uploadFileToRespectedTicketIdController = async (req: Request<{}, {}, {}, { ticketId: string, userId: string ,userName:string}>, res: Response):Promise<any> => {
   console.log("my query is",req.query)
  const parsedResult = uploadFileQuerySchema.safeParse(req.query)
  if (!parsedResult.success) {
    return res.status(422).json({
      success: false,
      message: "Unprocessable Entity",
      errors: parsedResult.error.errors,
    });
  }

  const upload = uploadImage('ticketPics');
  upload(req, res, async (err: any) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Profile picture is required',
      });
    }

    // if (!req.file) {
    //   return res.status(400).json({ error: "No file uploaded" });
    // }

    try {
      const fileName = `/files/ticketPics/${req.file.filename}`;

      const messageData = {
        ticketId: parsedResult.data.ticketId,
        message: "",
        newFileName: fileName,
        userId: parsedResult.data.userId,
        userName:parsedResult.data.userName,
        
      }

      console.log("my message data is",messageData)
      const savedReco = await MessageService.createFileMessageService(messageData)
      const protocol = req.protocol;
      const host = req.get('host');
      let proxyBasePath: string | undefined = req.get("x-base-url");
      if (proxyBasePath) {
        proxyBasePath = '/' + proxyBasePath.replace(/^\/|\/$/g, '');
      } else {
        proxyBasePath = '';
      }

      const fullImageUrl = `${protocol}://${host}${proxyBasePath}${savedReco.newFileName}`;

      const { newFileName, ...restObject } = savedReco.toObject();

      const updatedReco = {
        newFileName: fullImageUrl,
        ...restObject,
      };
     

      return res.status(201).json({
        success: true,
        message: "File uploaded successfully",
        data: updatedReco,
      });
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
  });
};