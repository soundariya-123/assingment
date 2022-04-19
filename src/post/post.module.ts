import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '../users/users.repository';
import { PostController } from './post.controller';
import { Post } from './post.entity';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, PostRepository, UsersRepository ])],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
