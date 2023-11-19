import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Between, In, Repository} from 'typeorm';
import { Expense } from './data/expense.entity';
import {User} from "../user/data/user.entity";

@Injectable()
export class ExpenseService {
	constructor(
		@InjectRepository(Expense) private readonly expenseRepository: Repository<Expense>
	) {}

  async create(userId: string, createExpenseDto: Partial<Expense>): Promise<Expense> {
    createExpenseDto.user = { id: userId } as User;
    const expense = this.expenseRepository.create(createExpenseDto);
    await this.expenseRepository.save(expense);
    return this.expenseRepository.findOne({
      where: { id: expense.id },
      relations: ['category']
    });
  }

  async createBulk(userId: string, createExpenseDtos: Partial<Expense>[]): Promise<Expense[]> {
    const expenses = createExpenseDtos.map(dto => ({
      ...dto,
      user: { id: userId } as User
    }));
    const createdExpenses = await this.expenseRepository.save(expenses);
    const ids = createdExpenses.map(e => e.id);
    return this.expenseRepository.find({
      where: { id: In(ids) },
      relations: ['category']
    });
  }

  async findAll(userId: string, skip?: number, limit?: number): Promise<Expense[]> {
    const query = this.expenseRepository.createQueryBuilder('expense')
      .where('expense.userId = :userId', { userId });

    if (skip !== undefined) {
      query.skip(skip);
    }

    if (limit !== undefined) {
      query.take(limit);
    }

    query.orderBy('expense.date', 'DESC')
      .addOrderBy('expense.createdAt', 'DESC')
      .leftJoinAndSelect('expense.category', 'category');

    return query.getMany();
  }

  async findByDateRange(userId: string, startDate: Date, endDate: Date): Promise<Expense[]> {
    return this.expenseRepository.find({
      relations: ['category'],
      where: {
        user: { id: userId },
        date: Between(startDate, endDate),
      },
      order: {
        date: 'DESC',
        createdAt: 'DESC'
      }
    });
  }

  async findEarliestDate(userId: string): Promise<Date> {
    const expense = await this.expenseRepository.findOne({
      where: { user: { id: userId } },
      order: { date: 'ASC' }
    });
    return expense ? expense.date : null;
  }

  async findOne(userId: string, expenseId: number): Promise<Expense> {
    const expense = await this.expenseRepository.findOne({
      where: { id: expenseId, user: { id: userId } },
      relations: ['category']
    });

    if (!expense) {
      throw new NotFoundException(`Expense with id ${expenseId} not found for this user`);
    }

    return expense;
  }

  async update(userId: string, id: number, updateExpenseDto: Partial<Expense>): Promise<Expense> {
    const existingExpense = await this.expenseRepository.findOne({ where: { id, user: { id: userId } } });
    if (!existingExpense) {
      throw new NotFoundException(`Expense with id ${id} not found for this user`);
    }
    await this.expenseRepository.update(id, updateExpenseDto);
    return existingExpense;
  }


  async remove(userId: string, id: number): Promise<Expense> {
    const expense = await this.findOne(userId, id);
    await this.expenseRepository.delete(id);
    return expense;
  }

}
