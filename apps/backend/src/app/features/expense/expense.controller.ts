import {BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {ExpenseService} from "./expense.service";
import {ParseISOPipe} from "./pipes/parse-iso.pipe";
import {Expense} from "./expense.entity";

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  async create(@Body() createExpenseDto: Partial<Expense>) {
    return this.expenseService.create(createExpenseDto);
  }

  @Post('bulk')
  async createBulk(@Body() createExpenseDtos: Partial<Expense>[]) {
    return this.expenseService.createBulk(createExpenseDtos);
  }

  @Get()
  async findAll(@Query('skip') skip: string, @Query('limit') limit: string) {
    return this.expenseService.findAll(parseInt(skip), parseInt(limit));
  }

  @Get('byDateRange')
  async findByDateRange(
    @Query('startDate', ParseISOPipe) startDate: Date,
    @Query('endDate', ParseISOPipe) endDate: Date
  ) {
    if (startDate > endDate) {
      throw new BadRequestException('Validation failed: startDate must be before or equal to endDate');
    }
    return this.expenseService.findByDateRange(startDate, endDate);
  }

  @Get('earliest')
  async findEarliestDate() {
    return this.expenseService.findEarliestDate();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.expenseService.findOne(Number(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateExpenseDto: Partial<Expense>) {
    return this.expenseService.update(Number(id), updateExpenseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.expenseService.remove(Number(id));
  }
}
