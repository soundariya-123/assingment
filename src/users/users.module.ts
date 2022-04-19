import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStratagy } from './jwt/jwt.stratagy';
import { UsersController } from './users.controller';
import { Users } from './users.entity';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports:[ PassportModule.register({ defaultStrategy: 'jwt'}),
  JwtModule.registerAsync({
    useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
            expiresIn: '1d'
        }
    })
}), TypeOrmModule.forFeature([Users, UsersRepository])],
  exports: [JwtStratagy, PassportModule],
  controllers: [UsersController],
  providers: [UsersService, JwtStratagy]
})
export class UsersModule {}
