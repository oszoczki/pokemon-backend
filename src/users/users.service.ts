import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Ellenőrizzük, hogy létezik-e már ilyen email
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email }
    });

    if (existingUser) {
      throw new Error('A felhasználó már létezik ezzel az email címmel');
    }

    const user = this.usersRepository.create({
      email: createUserDto.email,
      password: createUserDto.password,
    });

    return await this.usersRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({
      where: { email }
    });
  }

  async login(loginDto: LoginDto): Promise<{ user: Omit<User, 'password'> }> {
    const user = await this.findByEmail(loginDto.email);
    
    if (!user) {
      throw new UnauthorizedException('Hibás email cím vagy jelszó');
    }

    if (user.password !== loginDto.password) {
      throw new UnauthorizedException('Hibás email cím vagy jelszó');
    }

    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword };
  }
} 