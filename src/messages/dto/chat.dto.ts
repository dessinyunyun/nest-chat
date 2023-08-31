import { IsNotEmpty, IsArray } from 'class-validator';

export class ChatDto {
  @IsNotEmpty()
  roomChat_id: Array<string>;

  @IsNotEmpty()
  sender_id: string;

  @IsNotEmpty()
    message: string;
}
