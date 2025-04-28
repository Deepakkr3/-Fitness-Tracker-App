



export interface IMessage {
    _id: string;
    ticketId: string;
    userId: string;
    message: string | null; // Optional and nullable
    createdAt: string;
    __v: number;
  }
  
  export interface ITicketInterface {
    _id: string;
    title: string;
    description: string;
    status: string;
    userId: string;
    priority: string;
    userName: string;
    orderId: string;
    messages: IMessage[]; // Array of Message objects
  }



  