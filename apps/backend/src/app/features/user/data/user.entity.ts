import {BaseEntity, BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import * as bcrypt from 'bcryptjs';
import {Expense} from "../../expense/data/expense.entity";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => Expense, expense => expense.user)
  expenses: Expense[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 14);
  }
}
