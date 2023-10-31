import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {CategoryService} from "./category.service";
import {Category} from "@cash-compass/shared-models";

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: Partial<Category>) {
    return this.categoryService.create(createCategoryDto);
  }

  @Post('bulk')
  async createBulk(@Body() createCategoryDtos: Partial<Category>[]) {
    return this.categoryService.createBulk(createCategoryDtos);
  }

  @Get()
  async findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: Partial<Category>) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
