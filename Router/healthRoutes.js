import express from "express";
import mysql from 'mysql2';
const app = express();

app.use(express.json());


app.use((req, res, next) => {
  if (req.method !== 'GET') {

    res.setHeader('Cache-Control', 'no-cache','no-store','must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    return res.status(503).json();
  }
  next();
});

app.get('/' , async (req,res) => {
    res.setHeader('Cache-Control', 'no-cache','no-store','must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    // res.json({message:'Route Protected!'})
    console.log({host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,});
    let isHealthy =false
    var connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
      
    });  
  
  if (Object.keys(req.body).length !== 0) {
    
    res.status(400).json();
    return;
  }
  
  if (Object.keys(req.query).length !== 0) {
    
    res.status(400).json();
  return;
  }
  
      connection.connect(function(err) {
          if (err) {
              isHealthy = false
          }else{
              isHealthy = true
          }
         console.log("Connected!");
        
          if(isHealthy){  
            
            res.setHeader('Cache-Control', 'no-cache','no-store','must-revalidate');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('X-Content-Type-Options', 'nosniff');
  
            res.status(200).json();
            
          }
          else{  
            console.log("Connection Interrupted!")  
              
            res.status(503).json();
            
          }
        });
  });

  export default app;