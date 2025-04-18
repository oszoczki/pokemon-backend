import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from './pokemon.entity';
import { User } from '../users/user.entity';

@Injectable()
export class PokemonsService {
  constructor(
    @InjectRepository(Pokemon)
    private pokemonsRepository: Repository<Pokemon>,
  ) {}

  findAll(userId: number): Promise<Pokemon[]> {
    return this.pokemonsRepository.find({ where: { userId } });
  }

  async findOne(id: number, userId: number): Promise<Pokemon> {
    const pokemon = await this.pokemonsRepository.findOne({ where: { id, userId } });
    if (!pokemon) {
      throw new NotFoundException(`Pokemon with ID ${id} not found`);
    }
    return pokemon;
  }

  create(pokemon: Partial<Pokemon>, userId: number): Promise<Pokemon> {
    return this.pokemonsRepository.save({ ...pokemon, userId });
  }

  async update(id: number, pokemon: Partial<Pokemon>, userId: number): Promise<Pokemon> {
    await this.findOne(id, userId); // This will throw NotFoundException if pokemon doesn't exist
    await this.pokemonsRepository.update({ id, userId }, pokemon);
    return this.findOne(id, userId);
  }

  async remove(id: number, userId: number): Promise<void> {
    await this.findOne(id, userId); // This will throw NotFoundException if pokemon doesn't exist
    await this.pokemonsRepository.delete({ id, userId });
  }
} 