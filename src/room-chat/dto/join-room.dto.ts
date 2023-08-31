import { IsNotEmpty, IsArray } from 'class-validator';
import { Document, ObjectId, SchemaTypes } from 'mongoose';

export class JoinRoomDto {
  @IsNotEmpty()
  newMember: ObjectId;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  room_id: string;
}
