import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {CategoryDocument} from "./category.schema";
import {Category} from "@cash-compass/shared-models";

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<CategoryDocument>,
  ) {
  }

  private transform(doc: CategoryDocument): Category {
    return {
      id: doc._id.toString(),
      name: doc.name,
      color: doc.color,
      emoji: doc.emoji
    };
  }

  async create(createCategoryDto: Partial<Category>): Promise<Category> {
    const createdCategory = new this.categoryModel(createCategoryDto);
    const saved = await createdCategory.save();
    return this.transform(saved);
  }

  async createBulk(createCategoryDtos: Partial<Category>[]): Promise<Category[]> {
    const createdCategories: Category[] = [];

    for (const dto of createCategoryDtos) {
      const createdCategory = await this.create(dto);
      createdCategories.push(createdCategory);
    }

    return createdCategories;
  }

  async findAll(): Promise<Category[]> {
    const found = await this.categoryModel.find().exec();
    return found.map(this.transform);
  }

  async findOne(id: string): Promise<Category> {
    const found = await this.categoryModel.findById(id).exec();
    if (!found) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return this.transform(found);
  }

  async update(id: string, updateCategoryDto: Partial<Category>): Promise<Category> {
    const updated = await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true }).exec();
    return this.transform(updated);
  }

  async remove(id: string): Promise<Category> {
    const deleted = await this.categoryModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return this.transform(deleted);
  }
}
