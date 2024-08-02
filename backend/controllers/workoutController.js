const Workout=require('../models/WorkoutModel');//small w
const mongoose=require('mongoose');
//get all workouts
const getWorkouts=async (req,res)=>{
  const user_id=req.user._id;
  const workouts=await Workout.find({user_id}).sort({createAt:-1});//array of objects

  res.status(200).json(workouts);//json format

};
//get a single workout
const getWorkout=async(req,res)=>{

  const {id}=req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:'No such workout'});
  };
  const workout=await Workout.findById(id);
  if(!workout){
    return res.status(404).json({error:'No such workout'});
  };
  res.status(200).json(workout);

};
//create a new workout
const createWorkout=async(req,res)=>{
  const {title,load,reps}=req.body;
  let emptyFields=[];
  if (!title){
    emptyFields.push('title');
  };
  if (!load){
    emptyFields.push('load');
  };
  if (!reps){
    emptyFields.push('reps');
  };
  if(emptyFields.length>0){
    return res.status(400).json({error:'Please fill in all fields',emptyFields})
  }

  //add doc to db
  try{
    const user_id=req.user._id;
    const workout= await Workout.create({title,load,reps,user_id});//asyncronous//the response that we get here is the new doc created along with its id
    res.status(200).json(workout)//200-OK code
  }catch(error){
    res.status(400).json({error:error.message});//400-error code
  };
};
//delete a workout
const deleteWorkout=async(req,res)=>{
  const {id}=req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:'No such workout'});
  };
  const workout=await Workout.findOneAndDelete({_id:id});
  if(!workout){
    return res.status(404).json({error:'No such workout'});
  };
  res.status(200).json(workout)
};
//update a workout
const updateWorkout=async(req,res)=>{
  const {id}=req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:'No such workout'});
  };
  const workout=await Workout.findOneAndUpdate({_id:id},{
    ...req.body
  });
  if(!workout){
    return res.status(404).json({error:'No such workout'});
  };
  res.status(200).json(workout)

};
module.exports={
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
}