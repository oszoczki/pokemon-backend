import { DataSource } from 'typeorm';
import { Pokemon } from '../pokemons/pokemon.entity';
import { User } from '../users/user.entity';

export class PokemonsSeeder {
  public static async run(dataSource: DataSource): Promise<void> {
    const pokemonRepository = dataSource.getRepository(Pokemon);
    const userRepository = dataSource.getRepository(User);

    // Get or create a default user
    let user = await userRepository.findOne({ where: { email: 'admin@example.com' } });
    if (!user) {
      user = userRepository.create({
        email: 'admin@example.com',
        password: 'admin123', // Note: In production, this should be hashed
      });
      await userRepository.save(user);
    }

    const pokemons = [
      {
        name: 'Pikachu',
        weight: 6.0,
        height: 0.4,
        types: ['electric'],
        abilities: ['static', 'lightning-rod'],
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
        userId: user.id,
      },
      {
        name: 'Charizard',
        weight: 90.5,
        height: 1.7,
        types: ['fire', 'flying'],
        abilities: ['blaze', 'solar-power'],
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
        userId: user.id,
      },
      {
        name: 'Bulbasaur',
        weight: 6.9,
        height: 0.7,
        types: ['grass', 'poison'],
        abilities: ['overgrow', 'chlorophyll'],
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        userId: user.id,
      },
      {
        name: 'Squirtle',
        weight: 9.0,
        height: 0.5,
        types: ['water'],
        abilities: ['torrent', 'rain-dish'],
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
        userId: user.id,
      },
      {
        name: 'Mewtwo',
        weight: 122.0,
        height: 2.0,
        types: ['psychic'],
        abilities: ['pressure', 'unnerve'],
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png',
        userId: user.id,
      },
      {
        name: 'Eevee',
        weight: 6.5,
        height: 0.3,
        types: ['normal'],
        abilities: ['run-away', 'adaptability'],
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png',
        userId: user.id,
      },
      {
        name: 'Gengar',
        weight: 40.5,
        height: 1.5,
        types: ['ghost', 'poison'],
        abilities: ['cursed-body'],
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png',
        userId: user.id,
      },
      {
        name: 'Dragonite',
        weight: 210.0,
        height: 2.2,
        types: ['dragon', 'flying'],
        abilities: ['inner-focus', 'multiscale'],
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png',
        userId: user.id,
      },
      {
        name: 'Snorlax',
        weight: 460.0,
        height: 2.1,
        types: ['normal'],
        abilities: ['immunity', 'thick-fat'],
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png',
        userId: user.id,
      },
      {
        name: 'Lapras',
        weight: 220.0,
        height: 2.5,
        types: ['water', 'ice'],
        abilities: ['water-absorb', 'shell-armor'],
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/131.png',
        userId: user.id,
      },
      {
        name: 'Alakazam',
        weight: 48.0,
        height: 1.5,
        types: ['psychic'],
        abilities: ['synchronize', 'inner-focus'],
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/65.png',
        userId: user.id,
      },
    ];

    for (const pokemonData of pokemons) {
      const existingPokemon = await pokemonRepository.findOne({
        where: { name: pokemonData.name },
      });

      if (!existingPokemon) {
        const pokemon = pokemonRepository.create(pokemonData);
        await pokemonRepository.save(pokemon);
        console.log(`Created Pokemon: ${pokemon.name}`);
      }
    }
  }
} 