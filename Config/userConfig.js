import { Sequelize, DataTypes } from 'sequelize';
import {bootstrap} from "../Services/userService.js";
import 'dotenv/config.js'
export const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT, 
  host: process.env.MYSQL_HOST,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port:process.env.PORT
  ,
});

sequelize.authenticate().then(async ()=>{
  await bootstrap();
}).catch((error)=>{
  console.log("There was an error while setting up the db",error);
})


 //sequelize.sync({force:false});
export { DataTypes };








