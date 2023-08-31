import { IsNotEmpty, IsArray } from 'class-validator';

export class RoomDto {
  @IsNotEmpty()
  @IsArray()
  members: Array<string>;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  _id: string;
}
