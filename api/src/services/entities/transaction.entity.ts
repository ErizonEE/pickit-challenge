import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Entity, ManyToMany, JoinTable } from "typeorm";
import { Service } from "./service.entity";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "varchar" })
  readonly carId: string;
  
  @Column({ type: "varchar", nullable: true })
  car: string;

  @Column({ type: "varchar", nullable: true })
  ownerId: string;

  @Column({ type: "varchar", nullable: true })
  ownerName: string;

  @Column({ type: "decimal", default: 0 })
  total: number;

  @Column({ type: "decimal", nullable: true })
  readonly discount: number;

  @CreateDateColumn()
  readonly createAt: Date;

  @UpdateDateColumn()
  readonly updateAt: Date;

  @ManyToMany(() => Service)
  @JoinTable()
  services: Service[];
}
