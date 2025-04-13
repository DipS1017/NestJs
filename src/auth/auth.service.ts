import { Injectable } from '@nestjs/common';
import { BadRequestError } from 'src/common/errors';
import bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { LoginDto } from './dto/login.dto';
import { Prisma, Users } from '@prisma/client';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateUser(loginDTO: LoginDto): Promise<Users> {
    const { emailOrUsername, password } = loginDTO;
    try {
      const user = await this.prisma.users.findFirst({
        where: { OR: [{ email: emailOrUsername }, { name: emailOrUsername }] },
      });

      if (!user || !user.password) {
        throw new BadRequestError('Invalid credentials');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new BadRequestError('Invalid credentials');
      }

      return user;
    } catch (error: unknown) {
      if (!(error instanceof BadRequestError)) {
        throw new BadRequestError('Authentication failed');
      }
      throw error;
    }
  }

  async registerUser(createUserDto: CreateUserDto): Promise<Users> {
    const { name, email, password } = createUserDto;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await this.prisma.users.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      return newUser;
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestError('Account with this email already exists');
      }

      throw error;
    }
  }
}
