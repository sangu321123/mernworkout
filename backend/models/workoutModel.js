const mongoose=require('mongoose');
const Schema=mongoose.Schema;
//Schema-structure
const workoutSchema=new Schema({
  title:{
    type:String,
    required:true//mandatory to be filled
  },
  reps:{
    type:Number,
    required:true
  },
  load:{
    type:Number,
    required:true
  },
  user_id:{
    type:String,
    required:true
  }
},{timestamps:true});//when doc created and updated infos
module.exports=mongoose.model('Workout',workoutSchema)//also creates a collection Workouts