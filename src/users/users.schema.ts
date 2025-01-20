import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  email: number;

  @Prop()
  password: string;

  @Prop()
  gender: boolean;

  @Prop()
  age: number;
}

export const UserSchema = SchemaFactory.createForClass(User);