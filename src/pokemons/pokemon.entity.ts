import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('pokemons')
export class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  weight: number;

  @Column('decimal', { precision: 10, scale: 2 })
  height: number;

  @Column('json')
  types: any;

  @Column('json')
  abilities: any;

  @Column()
  imageUrl: string;

  @Column()
  userId: number;

  @ManyToOne(() => User, user => user.pokemons)
  @JoinColumn({ name: 'userId' })
  user: User;
} 