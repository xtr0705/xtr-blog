import conf from "../conf/conf";

import {Client, Databases, Storage, ID} from "appwrite";

export class Service{
  client = new Client();
  databases;
  storage;

  constructor(){
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases= new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({title,userId, content, featuredImage, name}){
    try{
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        {
          title,
          featuredImage,
          content,
          userId,
          name
        }
      )
    }catch(error){
      console.log('error occured while creating post',error);
    }
  }

  async deletePost({slug}){
    try{
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      )
      return true
    }catch(error){
      console.log('error occured while deleting the post ',error)
      return false;
    }
  }

  async getPost({slug}){
    try{
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      )
      
    }catch(error){
      console.log('Error occured while opening post : ',error)
    }
  }

  async getPosts(queries){
    try{
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      )
    }catch(error){
      console.log('error occured while getting all posts : ',error)
    }
  }

  async createFile({file,fileId = ID.unique()}){
    try{
      return await this.storage.createFile(
        conf.appwriteBucketId,
        fileId,
        file,
      )

    }catch(error){
      console.log('error occured while creating file : ',error)
    }
  }

  async deleteFile(fileId){
    try{
      await this.storage.deleteFile(
        conf.appwriteBucketId,
        fileId
      )
      return true;
    }catch(error){
      console.log('error occured while deleting image : ',error);
      return false;
    }
  }

  getFileView(fileId){
    try{
      return this.storage.getFileView(
        conf.appwriteBucketId,
        fileId
      ).toString()
    }catch(error){
      console.log('error fetching thumbnail : ',error);
    }
  }

  
}
const appwriteService = new Service();
export default appwriteService;