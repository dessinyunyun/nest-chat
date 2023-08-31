import { IsNotEmpty, IsArray } from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  @IsArray()
  members: Array<string>;

  @IsNotEmpty()
  name: string;
}
