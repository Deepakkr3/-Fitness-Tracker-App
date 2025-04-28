import mongoose, { Document, Schema } from "mongoose";

// export interface IMessage extends Document {
//   ticketId: mongoose.Schema.Types.ObjectId;
//   userId?: string; // Added userId to track which user sent the message
//   message: string;
//   createdAt: Date;
//   fileUrl?: string;
// }

// const MessageSchema: Schema = new Schema({
//   ticketId: { type: mongoose.Schema.Types.ObjectId, ref: "Ticket" },
//   userId: { type: String },
//   message: { type: String },
//   createdAt: { type: Date, default: Date.now },
//   fileUrl: String,
// });

// export default mongoose.model<IMessage>("Message", MessageSchema);


import { v4 as uuidv4 } from 'uuid';

export interface IMessage extends Document {
  ticketId: string;
  userId?: string;
  message: string;
  createdAt: Date;
  newFileName?: string;
  userName?: string;
}

const MessageSchema: Schema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    ticketId: { type: String, required: true },
    userId: { type: String, required: false },
    message: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    newFileName: { type: String, required: false },
    userName: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.model<IMessage>('Message', MessageSchema);