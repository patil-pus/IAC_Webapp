import Express from 'express';
import userRouter from './Router/userRoutes.js';
import assignmentRoutes from './Router/assignmentRoutes.js';
import { bootstrap } from './Services/userService.js';
import healthRoutes from './Router/healthRoutes.js'
import { sequelize } from './Config/userConfig.js';

const app = Express();
const PORT = 3000;

app.use(Express.json());

//use to check if the database is ready
app.use(async (req,res,next)=>{

  try {
    await sequelize.authenticate();
    console.log("this is where the bootstrap would run")
  } catch (error) {
    return  res.status(503).send();
  }
  next();
})
app.use('/v1/assignments',assignmentRoutes);
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization,x-access-token');
    next();
  });
// bootstrap();
app.use('/healthz',healthRoutes);

  app.use(userRouter);
  app.listen(PORT,()=>{
    console.log("Server is running on",PORT);
      console.log({host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,});
})
export default app; 