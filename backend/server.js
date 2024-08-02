require('dotenv').config();//to get env from env file to process object
//entry file for the backend 
const express=require('express');
const mongoose=require('mongoose');
const workoutRoutes=require('./routes/workouts');
const userRoutes=require('./routes/user');
//express app
const app=express();
//middleware
app.use(express.json());//if req has body(data),attaches it to the req obj
//to register a global middleware
app.use((req,res,next)=>{
  console.log(req.path,req.method);
  next();
});
//react to requests-route handler 
/*app.get('/',(req,res)=>{
  res.json({mssg:'Welcome to the app'});
  
});*/
//routes
app.use('/api/workouts',workoutRoutes);//attaches all of the routes in workoutRoutes to the app
app.use('/api/user',userRoutes);



//listen for requests
//connect to db
//asyncronous hence returns a promise since it takes time 
mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
          //process-global object available in node   ,,listen for requests
          //listen to requests only after connecting to db
          app.listen(process.env.PORT,()=>{
            console.log(`connected to db &listening on port ${process.env.PORT}`);//this fn is a middleware
          });
        })
        .catch((error)=>{
          console.log(error);
        });

