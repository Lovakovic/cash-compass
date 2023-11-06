import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: Partial<Category>): Promise<Category> {
    const createdCategory = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(createdCategory);
  }

  async createBulk(createCategoryDtos: Partial<Category>[]): Promise<Category[]> {
    const createdCategories = this.categoryRepository.create(createCategoryDtos);
    return await this.categoryRepository.save(createdCategories);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async findOne(id: string): Promise<Category> {
    const found = await this.categoryRepository.findOne({ where: { id: Number(id) }});
    if (!found) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return found;
  }

  async update(id: string, updateCategoryDto: Partial<Category>): Promise<Category> {
    await this.categoryRepository.update(id, updateCategoryDto);
    const updated = await this.categoryRepository.findOne({ where: { id: Number(id) }});
    if (!updated) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.categoryRepository.delete(id);
    if (deleted.affected === 0) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
  }
}
