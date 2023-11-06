import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Category} from "../category/category.entity";

@Entity()
export class Expense extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  date: Date;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}

export interface FilterCriteria {
  searchTerm?: string;
  sortOrder?: 'cheapest' | 'most-expensive' | 'newest' | 'oldest';
  filterCategory?: string;
  startDate?: Date;
  endDate?: Date;
  skip?: number;
  limit?: number;
}
