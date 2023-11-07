import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Between, In, Repository} from 'typeorm';
import { Expense } from './expense.entity';

@Injectable()
export class ExpenseService {
	constructor(
		@InjectRepository(Expense) private readonly expenseRepository: Repository<Expense>
	) {}

	async create(createExpenseDto: Partial<Expense>): Promise<Expense> {
		const expense = this.expenseRepository.create(createExpenseDto);
		await this.expenseRepository.save(expense);
		return this.expenseRepository.findOne({
      where: {
        id: expense.id
      },
			relations: ['category']
    });
	}

	async createBulk(createExpenseDtos: Partial<Expense>[]): Promise<Expense[]> {
		const createdExpenses = await this.expenseRepository.save(createExpenseDtos);
		const ids = createdExpenses.map(e => e.id);
		return this.expenseRepository.find({
			where: {
				id: In(ids)
			},
			relations: ['category']
		});
	}

  async findAll(skip?: number, limit?: number): Promise<Expense[]> {
    // If no skip and limit are defined, do not apply pagination
    if (skip === undefined && limit === undefined) {
      return this.expenseRepository.find({
        relations: ['category'],
        order: {
          date: 'DESC',
          createdAt: 'DESC'
        }
      });
    }

    // Apply pagination if skip or limit is provided
    return this.expenseRepository.find({
      relations: ['category'],
      order: {
        date: 'DESC',
        createdAt: 'DESC'
      },
      skip: skip,
      take: limit
    });
  }

	async findByDateRange(startDate: Date, endDate: Date): Promise<Expense[]> {
		return this.expenseRepository.find({
			relations: ['category'],
			where: {
				date: Between(startDate, endDate),
			},
			order: {
				date: 'DESC',
				createdAt: 'DESC'
			}
		});
	}

	async findEarliestDate(): Promise<Date> {
		const expense = await this.expenseRepository.findOne({
			order: {
				date: 'ASC'
			}
		});
		return expense ? expense.date : null;
	}

	async findOne(id: number): Promise<Expense> {
		const expense = await this.expenseRepository.findOne({
			where: { id },
			relations: ['category']
		});
		if (!expense) {
			throw new NotFoundException(`Expense with id ${id} not found`);
		}
		return expense;
	}

	async update(id: number, updateExpenseDto: Partial<Expense>): Promise<Expense> {
		await this.expenseRepository.update(id, updateExpenseDto);
		const updatedExpense = await this.expenseRepository.findOne({
			where: {id },
			relations: ['category']
		});
		if (!updatedExpense) {
			throw new NotFoundException(`Expense with id ${id} not found`);
		}
		return updatedExpense;
	}

	async remove(id: number): Promise<Expense> {
		const expense = await this.findOne(id);
		await this.expenseRepository.delete(id);
		return expense;
	}
}
