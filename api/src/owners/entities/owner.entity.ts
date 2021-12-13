import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Owner {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({type: "varchar", length: 255})
  readonly lastName: string;

  @Column({type: "varchar", length: 255})
  readonly name: string;

  @Column({type:"int", unique: true, nullable: true})
  readonly documentNumber: number;

  @Column({ type: "int", default: 0 })
  totalCars: number;

  @Column({ type: "int", default: 0 })
  totalTransactions: number;
}
