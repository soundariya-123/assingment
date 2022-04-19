import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../users/guards/jwt-auth.guard';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';

// @UseGuards(JwtAuthGuard) 
@Controller('post')
export class PostController {

    constructor(private postService: PostService) {}

    @Post()
    AddPost(@Body() post:PostDto):Promise<string>{
        return this.postService.AddPost(post);
    }

    @Get()
    GetAllPost():Promise<PostDto[]>{
        return this.postService.GetAllPost()
    }

    @Get(':id')
    getPostDetails(@Param('id') id:number): Promise<PostDto> {
        return this.postService.getPostDetails(id);
    }

    @Delete(':id')
    deletePost(@Param('id') id:number): Promise<string> {
        return this.postService.deletePost(id);
    }

    
    @Patch(':id')
    updatePost(@Param('id') id:number,  @Body() post: PostDto): Promise<PostDto> {
        return this.postService.updatePost(id, post);
    }
}
