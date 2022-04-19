import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { PostDto } from './dto/post.dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
 
    constructor(private postRepo: PostRepository,
                private userRepo: UsersRepository) {}

    async AddPost(post: PostDto): Promise<string> {
        try {
            let user = await this.userRepo.findOne(post.user);
            if(user) {
                let postVal = await this.postRepo.save(post)
                if(postVal) {
                    const msg:string = `Post added successfully by this ${postVal.id}`;
                    return msg;
                }
            } else {
                throw new InternalServerErrorException('Post not added')
            }
        } catch(err) {
            throw new  HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async GetAllPost(): Promise<PostDto[]> {
        let response:PostDto[]
        try{
            response = await this.postRepo.find({order:  { id: "ASC"},  take: 10 });
            if(response.length > 0) {
                return response;
            } else {
                const msg:string = 'Post not found';
                throw new NotFoundException(msg)
            }
        } catch(err) {
            throw new  HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
   
    async getPostDetails(id: number): Promise<PostDto> {
        try{
            let response = await this.postRepo.findOne({where: {id} });
            if(response) {
                return response;
            } else {
                const msg:string = 'Post not found';
                throw new NotFoundException(msg)
            }
        } catch(err) {
            throw new  HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
   
    async deletePost(id: number): Promise<string> {
        let response ;
        try {
           response = await this.postRepo.delete(id);
           
           if(response.affected > 0 ) {
                const msg:string = `Deleted successfully by this id ${id}`;
                return msg;
           } else {
                throw new HttpException('Not deleted', HttpStatus.INTERNAL_SERVER_ERROR);
           }
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.NOT_MODIFIED);
        }
    }

    async updatePost(id: number, post: PostDto): Promise<PostDto> {
        try {
            let response = await this.postRepo.update({id}, post);
            
            if(response.affected > 0 ) {
                let val = await this.postRepo.findOne({ id });
                 return val ;
            } else {
                 throw new HttpException('Not updated', HttpStatus.INTERNAL_SERVER_ERROR);
            }
         } catch (err) {
             throw new HttpException(err.message, HttpStatus.NOT_MODIFIED);
         }
    }
  
 
}
