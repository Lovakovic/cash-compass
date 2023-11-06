import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Expense} from "../expense/expense.entity";

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column()
  emoji: string;

  @OneToMany(() => Expense, expense => expense.category)
  expenses: Expense[]
}
