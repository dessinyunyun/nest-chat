import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { Document, ObjectId } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ versionKey: false, timestamps: true })
export class Message {
  @Prop({ ref: 'RoomChat', type: SchemaTypes.ObjectId })
  roomChat_id: ObjectId;

  @Prop({ ref: 'Users', type: SchemaTypes.ObjectId })
  sender_id: ObjectId;

  @Prop()
  message: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
