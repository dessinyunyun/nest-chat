import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Users {
  @Prop()
  username: string;

  @Prop()
  password: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
