import conf from '../conf/conf.js';

import {ID, Client, Account} from 'appwrite';

export class AuthService{
  client = new Client()
  account;
  
  constructor(){
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId)
    this.account = new Account(this.client)
  }

  async createAccount({email,password,name}){
    try{
      const userAccount = await this.account.create(ID.unique(),email,password,name)

      if (userAccount) {
        return this.login({email,password});
      }else{
        return userAccount;
      }
    }catch(error){
      console.log('error occured creating account ', error)
    }
  }

  async login({email,password}){
    try{
      return await this.account.createEmailPasswordSession(email,password);
    }catch(error){
      console.log('error ocurred logging in',error)
    }
  }

  async getCurrentUser(){
    try{
      const user = await this.account.get();
      if (user) {
        return user;
      }else{
        return null;
      }
    }catch(error){
      console.log('error occrued getting user ',error)
    }
  }

  async logout(){
    try{
      await this.account.deleteSessions();
    }catch(error){
      console.log('error logging out ',error)
    }
  }
}
const authService = new AuthService();
export default authService;