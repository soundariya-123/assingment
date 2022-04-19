import { HttpException,   InternalServerErrorException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { plainToInstance } from "class-transformer";
import { UsersRepository } from "../users/users.repository";
import { UsersService } from "../users/users.service";
import { PostDto } from "./dto/post.dto";
import { PostRepository } from "./post.repository";
import { PostService } from "./post.service";
 


const posts = [{
    id: 1,
    title: "google",
    description: "good",
    user:1,
    is_featured: "true"
  }]
const ofImportDto = plainToInstance( PostDto, posts)
 
describe('PostService', () => {
    let postService : PostService; 
    let postRepo, userRepo, userService;
    beforeEach(async () => {

   
        let module: TestingModule = await Test.createTestingModule({
            providers: [PostService,   {
                provide: PostRepository, 
                useFactory: () => ({
                    save:jest.fn(),
                    find:jest.fn(),
                    findOne:jest.fn(),
                    delete:jest.fn(),
                    update:jest.fn(),
                    
                })

            },
            UsersService, {
                provide: UsersRepository,
                useFactory: () => ({
                    findOne:jest.fn()
                })
            },
            {
                provide: JwtService,
                useFactory: () => {
                    sign: jest.fn()
                }

            }
        ]
        }).compile();

        postService = module.get<PostService>(PostService);
        userService = module.get<UsersService>(UsersService);
        postRepo = module.get<PostRepository>(PostRepository);
        userRepo = module.get<UsersRepository>(UsersRepository);
    })
    it("should be defined", ()=> {
        expect(postService).toBeDefined()
    })

    //addPost
    describe("When addPost", () => {
        describe('AND Success', () => {
            it('should return response', async () => {
                const user = {
                        id: 1,
                        name: "kjh",
                        password: "",
                        display_name: "pro"
                      }
                let userSpy = jest.spyOn(userRepo, 'findOne').mockResolvedValue(user);

                let findOneSpy = jest.spyOn(postRepo, 'save').mockResolvedValue(ofImportDto[0]);
                let response = await  postService.AddPost(ofImportDto[0]);
                expect(response).toEqual( `Post added successfully by this ${ofImportDto[0].id}`);
                expect(findOneSpy).toHaveBeenCalledTimes(1)
                expect(userSpy).toHaveBeenCalledTimes(1)
              
            })
        })

        // describe('User Not added', () => {
        //     it('should return error', async () => {
        //         const user = {
        //             id: 1,
        //             name: "kjh",
        //             password: "",
        //             display_name: "pro"
        //           }
        //         let findOneSpy = jest.spyOn(userRepo, 'findOne').mockRejectedValue(new InternalServerErrorException);  
        //         await expect(postService.AddPost(ofImportDto[0])).rejects.toThrow(new InternalServerErrorException);
        //         expect(findOneSpy).toHaveBeenCalledWith(user)

        //     })

        // })

        describe('AND failed', () => {
            it('should return error', async () => {
                let findOneSpy = jest.spyOn(userRepo, 'findOne').mockRejectedValue(new Error('Post not added'));  
                await expect(postService.AddPost(ofImportDto[0])).rejects.toThrow(HttpException);
                expect(findOneSpy).toHaveBeenCalledTimes(1)

            })

        })
    })

    // List all posts
    describe("When listPosts()", () => {
        describe('AND Success', () => {
            it('should return response', async () => {
             
                let findOneSpy = jest.spyOn(postRepo, 'find').mockResolvedValue(ofImportDto);
                let response = await  postService.GetAllPost();
                expect(response).toEqual(ofImportDto);
                expect(findOneSpy).toHaveBeenCalled()
              
            })

        })

        describe('AND failed', () => {
            it('should return error', async () => {
                let findOneSpy = jest.spyOn(postRepo, 'find').mockRejectedValue(new Error('Hotel not found'));  
                await expect(postService.GetAllPost()).rejects.toThrow(HttpException);
                expect(findOneSpy).toHaveBeenCalled()

            })

        })
    })

    //Delete post
    describe("When deletePost", () => {
        describe('AND Success', () => {
            it('should return response', async () => {
                const message = `Deleted successfully by this id ${ofImportDto[0].id}`;

                const delpost = { generatedMaps: [], raw: [], affected: 1 };

                const findOneSpy = jest.spyOn(postRepo, 'delete').mockResolvedValue(delpost);
                let response = await  postService.deletePost(1);
                expect(response).toEqual(message);
                expect(findOneSpy).toHaveBeenCalled()
            })
        })

        describe('AND failed', () => {
            it('should return error', async () => {
                const findOneSpy = jest.spyOn(postRepo, 'delete').mockRejectedValue( Error('Not deleted'));  

                await expect(postService.deletePost(1)).rejects.toThrow(HttpException);
                expect(findOneSpy).toHaveBeenCalled()
                expect(findOneSpy).toHaveBeenCalledTimes(1)
            })
        })
    })

    //getPostBy id
    describe("When getPostByid", () => {
        describe('AND Success', () => {
            it('should return response', async () => {
                const findOneSpy = jest.spyOn(postRepo, 'findOne').mockResolvedValue(ofImportDto[0]);
                let response = await  postService.getPostDetails(1);

                expect(response).toEqual(ofImportDto[0]);
                expect(findOneSpy).toHaveBeenCalledTimes(1)
            })
        })

        describe('AND failed', () => {
            it('should return error', async () => {
                const findOneSpy = jest.spyOn(postRepo, 'findOne').mockRejectedValue(new Error('Hotel not found'));  

                await expect(postService.getPostDetails(1)).rejects.toThrow(HttpException);
                expect(findOneSpy).toHaveBeenCalled()
                 
            })
        })
    })

    //update post
    describe("When updatePost", () => {
        describe('AND Success', () => {
            it('should call updateNote method with expected params', async () => {
                const updatepost = { generatedMaps: [], raw: [], affected: 1 };
                const findOneSpy = jest.spyOn(postRepo, 'update').mockResolvedValue(updatepost);
                const noteId = 1;
                const dto = new PostDto();
                await postService.updatePost(noteId, dto);
                expect(findOneSpy).toHaveBeenCalledTimes(1);
        });
            
        })

        describe('AND failed', () => {
            it('should return error', async () => {
                const noteId = 1;
                const dto = new PostDto();
                const findOneSpy = jest.spyOn(postRepo, 'update').mockRejectedValue(new Error('Not updated'));  
                await expect(postService.updatePost(noteId, dto)).rejects.toThrow(HttpException);
                expect(findOneSpy).toHaveBeenCalled()
                 
            })
        })
    })
})

 
