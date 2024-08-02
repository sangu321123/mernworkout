import { useEffect } from "react";
//components
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import {useAuthContext} from '../hooks/useAuthContext';
const Home=()=>{
  const {workouts,dispatch}=useWorkoutsContext();
  const {user}=useAuthContext();
  useEffect(()=>{//since this can't be made async
    const fetchWorkouts=async()=>{
      
      const response=await fetch('/api/workouts',{

        headers:{
          'Authorization':`Bearer ${user.token}`
        }
      });//without explicitly declaring the port no. since proxy
      
      const json=await response.json();//something we can work with// parse to make it again array of workouts
      
      if(response.ok){
        dispatch({
          type:"SET_WORKOUTS",
          payload:json
        })
        
      };
      

    };
    if (user){
      fetchWorkouts();
    };
    
  },[dispatch]);
  return(
    <div className="home">
      <div className="workouts">
        {/*such a brilliant piece of code */}
        {/*map()=>() since we are returning a template ,
        WorkoutDetails has props*/}
        {workouts && workouts.map((workout)=>(
          <WorkoutDetails key={workout._id} workout={workout}/>
        ))}
      </div>
      <WorkoutForm/>
    </div>
  );
};
export default Home;