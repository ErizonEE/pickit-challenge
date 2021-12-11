import { PrimaryGeneratedColumn, Column, Entity, Unique } from 'typeorm';

@Entity()
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'varchar', length: 255})
  brand: string;

  @Column({type: 'varchar', length: 255})
  model: string;

  @Column({type: 'int'})
  year: number;
  
  @Column({type: 'varchar', length: 10, unique: true})
  patent: string;

  @Column({type: 'varchar', length: 255})
  color: string;
}
