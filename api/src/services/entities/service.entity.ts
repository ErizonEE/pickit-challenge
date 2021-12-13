import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Entity, ManyToMany } from "typeorm";
import { Transaction } from "./transaction.entity";

@Entity()
export class Service {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "varchar", unique: true })
  readonly name: string;

  @Column({ type: "int" })
  readonly cost: number;

  @CreateDateColumn()
  readonly createAt: Date;

  @UpdateDateColumn()
  readonly updateAt: Date;

  @ManyToMany(() => Transaction)
  transactions: Transaction[];
}