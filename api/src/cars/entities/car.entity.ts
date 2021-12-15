import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Car {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({type: 'varchar', length: 255})
  readonly brand: string;

  @Column({type: 'varchar', length: 255})
  readonly model: string;

  @Column({type: 'int'})
  readonly year: number;
  
  @Column({type: 'varchar', length: 10, unique: true})
  readonly patent: string;

  @Column({type: 'varchar', length: 255})
  readonly color: string;

  @Column({ type: 'varchar' })
  readonly ownerId: string;

  @Column({ type: 'varchar', nullable: true })
  ownerName: string;

  @CreateDateColumn()
  readonly createAt: Date;

  @UpdateDateColumn()
  readonly updateAt: Date;
}
