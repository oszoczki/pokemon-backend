import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { Pokemon } from './pokemon.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../users/user.entity';
import { GetUser } from '../auth/decorators/user.decorator';

@Controller('pokemons')
@UseGuards(JwtAuthGuard)
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Get()
  findAll(@GetUser() user: User): Promise<Pokemon[]> {
    return this.pokemonsService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: User): Promise<Pokemon> {
    return this.pokemonsService.findOne(+id, user.id);
  }

  @Post()
  create(@Body() pokemon: Partial<Pokemon>, @GetUser() user: User): Promise<Pokemon> {
    return this.pokemonsService.create(pokemon, user.id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() pokemon: Partial<Pokemon>,
    @GetUser() user: User,
  ): Promise<Pokemon> {
    return this.pokemonsService.update(+id, pokemon, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.pokemonsService.remove(+id, user.id);
  }
} 