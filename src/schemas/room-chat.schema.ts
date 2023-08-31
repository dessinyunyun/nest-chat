import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';

export type RoomChatDocument = RoomChat & Document;

@Schema({
  timestamps: true,
})
export class RoomChat {
  @Prop()
  name: string;

  @Prop({ ref: 'Users', type: [SchemaTypes.ObjectId] })
  members: [ObjectId];
}

export const RoomChatSchema = SchemaFactory.createForClass(RoomChat);
