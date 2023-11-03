import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, model} from 'mongoose';
import * as bcrypt from 'bcrypt';
import {User} from "./user.model";

type OmitId<T> = Omit<T, 'id'>;

@Schema()
export class UserDocument extends Document implements OmitId<User> {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);

export default model('User', UserSchema);

UserSchema.pre<UserDocument>('save', async function(next: (err?: Error) => void) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 18);
  }
  next();
});
