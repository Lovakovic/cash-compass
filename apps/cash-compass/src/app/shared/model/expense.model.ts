import {Category} from "./category.model";

export interface Expense {
  id: string;
  name: string;
  amount: number;
  date: Date;
  category: Category;
  addedAt: Date;
}
