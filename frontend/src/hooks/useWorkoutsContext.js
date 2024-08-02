import { useContext } from "react";
import { WorkoutContext } from "../context/WorkoutsContext";

export const useWorkoutsContext=()=>{
  const context=useContext(WorkoutContext);//returns the value passed into the provider component({state,dispatch})
  if(!context){
    throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
  }
  return context
};