import { Test } from "@nestjs/testing";
import { plainToInstance } from "class-transformer";
 
import { PostDto } from "./dto/post.dto";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
 
 
const posts  = [{
  title: "google",
  description: "good",
  user:1,
  is_featured: "true"
}]
const ofImportDto = plainToInstance(PostDto, posts)
// const errors = await validate(ofImportDto, { skipMissingProperties: true })
describe('Given posts', () => {
  let postController: PostController;
  let postService: PostService;
    
    beforeEach(async () =>{
         let module = await Test.createTestingModule({
             controllers :[PostController],
             providers:[ PostService, {
                 provide: PostService,
                 useFactory: () =>({
                    AddPost: jest.fn(),
                    GetAllPost: jest.fn(),
                    getPostDetails:jest.fn(),
                    deletePost: jest.fn(),
                    updatePost:jest.fn()
                 })
             }]
         }).compile()

         postController = module.get<PostController>(PostController)
         postService = module.get<PostService>(PostService)
     })   
     it('should be defined', () => {
         expect(postController).toBeDefined();
     }) 
    
    //addPost
    describe('When add Post', ()=> {
        it('should return response', async ()=>{
            const message = 'Success';
            let addPostsSpy = jest.spyOn(postService, 'AddPost').mockResolvedValue(message)
            let response = await postController.AddPost(ofImportDto[1]);
            expect(response).toEqual(message)
            expect(addPostsSpy).toHaveBeenCalled();
            expect(addPostsSpy).toHaveBeenCalledTimes(1)
        } )
    })

    //listOfPosts
    describe('When getAll Post', ()=> {
        it('should return response', async ()=>{

            let getAllPostsSpy = jest.spyOn(postService, 'GetAllPost').mockResolvedValue(ofImportDto)
            let response = await postController.GetAllPost();
            expect(response).toEqual(ofImportDto)
            expect(getAllPostsSpy).toHaveBeenCalled();
            expect(getAllPostsSpy).toHaveBeenCalledTimes(1)
        } )
     })

    //deletePost
    describe('When DeletePost()', ()=> {
        it('should return response', async ()=>{
            let postDetails = 'success';
            let getOnepostSpy = jest.spyOn(postService, 'deletePost').mockResolvedValue(postDetails)
            let response = await postController.deletePost(1);
            expect(response).toEqual(postDetails);
            expect(getOnepostSpy).toHaveBeenCalled()
            expect(getOnepostSpy).toHaveBeenCalledTimes(1)
        } )
    })



    //getPostById
    describe('When Get Post By Id()', ()=> {
        it('should return response', async ()=>{   
          
            let getPostByIdSpy = jest.spyOn(postService, 'getPostDetails').mockResolvedValue(ofImportDto[0])
            let response = await postController.getPostDetails(1);
            expect(response).toEqual(ofImportDto[0])
            expect(getPostByIdSpy).toHaveBeenCalled()
            expect(getPostByIdSpy).toHaveBeenCalledTimes(1)
        } )
    })

    describe('When updateePost()', ()=> {
        it('should return response', async ()=>{
           
            let getOnepostSpy = jest.spyOn(postService, 'updatePost').mockResolvedValue(ofImportDto[0])
            let response = await postController.updatePost(1, ofImportDto[0]);
            expect(response).toEqual(ofImportDto[0]);
            expect(getOnepostSpy).toHaveBeenCalled()
            expect(getOnepostSpy).toHaveBeenCalledTimes(1)
        } )
    })
})

