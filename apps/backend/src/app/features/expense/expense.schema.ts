import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {Category} from "@cash-compass/shared-models";

@Schema({
  timestamps: true
})
export class ExpenseDocument extends Document {
  @Prop()
  name: string;

  @Prop()
  amount: number;

  @Prop()
  date: Date;

  @Prop({ type: Types.ObjectId, ref: 'Category' })
  category: Category;

  @Prop()
  createdAt: Date;
}

export const ExpenseSchema = SchemaFactory.createForClass(ExpenseDocument);
