import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {Category} from "@cash-compass/shared-models";

type OmitId<T> = Omit<T, 'id'>;

@Schema()
export class CategoryDocument extends Document implements OmitId<Category> {
  @Prop()
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(CategoryDocument);
