import { User } from "../Models/User.js";
import {Assignment} from "../Models/Assignment.js";
import bcrypt from "bcrypt";
import { parseCSV } from "../Scripts/userScript.js";

export const bootstrap = async () => {
  await User.sync();
  await Assignment.sync();
  try {
    parseCSV(async (data) => {
      for (const row of data) {
        try {
          const existingUser = await User.findOne({
            where: { email: row.email },
          });
          if (!existingUser) {
            const hashedPassword = await bcrypt.hash(row.password, 10);
            await User.create({
              first_name: row.first_name,
              last_name: row.last_name,
              email: row.email,
              password: hashedPassword,
            });
            
          } else {
            
          }
        } catch (error) {
          console.error(`Error creating user for email ${row.email}:, error`);
        }
      }
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

export const findUser = async (username)=>{
  const email =username;
  let user = await User.findOne({where:{email}})
  console.log(user);
  return user;
}