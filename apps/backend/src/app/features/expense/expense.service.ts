import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {ExpenseDocument} from "./expense.schema";
import mongoose from "mongoose";
import {Expense} from "@cash-compass/shared-models";

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel('Expense') private readonly expenseModel: mongoose.Model<ExpenseDocument>
  ) {
  }

  private transform(doc: ExpenseDocument): Expense {
    return {
      id: doc._id.toString(),
      name: doc.name,
      amount: doc.amount,
      date: doc.date,
      category: doc.category,
      addedAt: doc.createdAt
    };
  }

  async create(createExpenseDto: Partial<Expense>): Promise<Expense> {
    const createdExpense = new this.expenseModel(createExpenseDto);
    const saved = await createdExpense.save();
    return this.transform(saved);
  }

  async createBulk(createExpenseDtos: Partial<Expense>[]): Promise<Expense[]> {
    const createdExpenses: Expense[] = [];

    for (const dto of createExpenseDtos) {
      const createdExpense = await this.create(dto);
      createdExpenses.push(createdExpense);
    }

    return createdExpenses;
  }

  async findAll(skip = 0, limit = 5): Promise<Expense[]> {
    const found = await this.expenseModel.find()
      .sort({ date: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
    return found.map(this.transform);
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Expense[]> {
    const found = await this.expenseModel.find({
      date: {
        $gte: startDate,
        $lt: endDate,
      },
    })
      .sort({ date: -1, createdAt: -1 })
      .exec();

    return found.map(this.transform);
  }

  async findEarliestDate(): Promise<Date> {
    const expense = await this.expenseModel.findOne().sort({ date: 1 }).limit(1);
    return expense ? expense.date : null;
  }

  async findOne(id: string): Promise<Expense> {
    const found = await this.expenseModel.findById(id).exec();
    if (!found) {
      throw new NotFoundException(`Expense with id ${id} not found`);
    }
    return this.transform(found);
  }

  async update(id: string, updateExpenseDto: Partial<Expense>): Promise<Expense> {
    const updated = await this.expenseModel.findByIdAndUpdate(id, updateExpenseDto, { new: true }).exec();
    return this.transform(updated);
  }

  async remove(id: string): Promise<Expense> {
    const deleted = await this.expenseModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Expense with id ${id} not found`);
    }
    return this.transform(deleted);
  }
}
