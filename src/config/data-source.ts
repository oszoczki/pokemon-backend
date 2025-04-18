import { DataSource } from 'typeorm';
import { User } from '../users/user.entity';
import { Pokemon } from '../pokemons/pokemon.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'pokemon',
  entities: [User, Pokemon],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: false,
}); 