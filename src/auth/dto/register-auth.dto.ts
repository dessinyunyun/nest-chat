import { IsNotEmpty } from 'class-validator';

export class RegisterAuthDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
