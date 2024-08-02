const express=require('express');
const {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
}=require('../controllers/workoutController');
const requireAuth=require('../middleware/requireAuth');
const router=express.Router();//instance of a router
//require auth for all workout routes
router.use(requireAuth);
//request handlers(route handlers)
//GET all workouts
router.get('/',getWorkouts);

//GET a single workout
//:-route parameter
router.get('/:id',getWorkout);
//POST a new workout
router.post('/',createWorkout);
//DELETE a workout
router.delete('/:id',deleteWorkout);
//UPDATE a workout
router.patch('/:id',updateWorkout);

module.exports=router;