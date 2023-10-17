import { Buffer } from 'buffer'
import bcrypt from 'bcrypt'
import {findUser} from './userService.js'



export const Credentials = (req)=>{
    
    const token = req.header('Authorization');
    const originalCred = Buffer.from(token.substring(6),'base64').toString('utf-8')
    const arr= originalCred.split(':');
    return arr;

}
export async function Check(req,res,next){
    

    const token = req.header('Authorization');

    if(!token){
        return res.status(401).json("")
    }
    const originalCred = Buffer.from(token.substring(6),'base64').toString('utf-8')
    const token_split= originalCred.split(':');


 
 
     const username=token_split[0];
     const pass=token_split[1];  
     
     const user= await findUser(username);
     if(!user){
         return res.status(401).json("")
     }
     const passCheck = await bcrypt.compare(pass,user.password)
     if(!passCheck){
         return res.status(401).json("")
     }
     
    req.authUser=user;
     next();
 }