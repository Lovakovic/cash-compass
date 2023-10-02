export interface Expense {
  id: string;
  name: string;
  amount: number;
  date: Date;
  category: Category;
  addedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  emoji: string;
}
