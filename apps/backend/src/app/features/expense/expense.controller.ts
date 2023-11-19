import {BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, Req} from '@nestjs/common';
import {Request} from 'express';
import {ExpenseService} from "./expense.service";
import {ParseISOPipe} from "./pipes/parse-iso.pipe";
import {Expense} from "./data/expense.entity";
import {User} from "../user/data/user.entity";

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  async create(@Req() request: Request, @Body() createExpenseDto: Partial<Expense>) {
    const user = request.user as User;
    return this.expenseService.create(user.id, createExpenseDto);
  }

  @Post('bulk')
  async createBulk(@Req() request: Request, @Body() createExpenseDto: Partial<Expense[]>) {
    const user = request.user as User;
    return this.expenseService.createBulk(user.id, createExpenseDto);
  }

  @Get()
  async findAll(@Req() request: Request, @Query('skip') skip?: string, @Query('limit') limit?: string) {
    const user = request.user as User;
    const parsedSkip = skip ? parseInt(skip) : undefined;
    const parsedLimit = limit ? parseInt(limit) : undefined;
    return this.expenseService.findAll(user.id, parsedSkip, parsedLimit);
  }

  @Get('byDateRange')
  async findByDateRange(
    @Req() request: Request,
    @Query('startDate', ParseISOPipe) startDate: Date,
    @Query('endDate', ParseISOPipe) endDate: Date
  ) {
    const user = request.user as User;
    if (startDate > endDate) {
      throw new BadRequestException('Validation failed: startDate must be before or equal to endDate');
    }
    return this.expenseService.findByDateRange(user.id, startDate, endDate);
  }

  @Get('earliest')
  async findEarliestDate(@Req() request: Request) {
    const user = request.user as User;
    return this.expenseService.findEarliestDate(user.id);
  }


  @Get(':id')
  async findOne(@Req() request: Request, @Param('id') id: string) {
    const user = request.user as User;
    return this.expenseService.findOne(user.id, Number(id));
  }

  @Put(':id')
  async update(@Req() request: Request, @Param('id') id: string, @Body() updateExpenseDto: Partial<Expense>) {
    const user = request.user as User;
    return this.expenseService.update(user.id, Number(id), updateExpenseDto);
  }

  @Delete(':id')
  async remove(@Req() request: Request, @Param('id') id: string) {
    const user = request.user as User;
    return this.expenseService.remove(user.id, Number(id));
  }
}
