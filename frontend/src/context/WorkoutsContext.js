import { createContext, useReducer } from "react";
export const WorkoutContext=createContext();
//state-reliable previous state value
//action-obj(type,payload) passed into dispatch fn
export const workoutReducer=(state,action)=>{
  switch(action.type){
    case 'SET_WORKOUTS':
      return{
        workouts:action.payload
      }
    case 'CREATE_WORKOUT':
      return{
        workouts:[action.payload,...state.workouts]
      }
    case 'DELETE_WORKOUT':
      return {
        workouts:state.workouts.filter((w)=>w._id!==action.payload._id)
      }
    default:
      return state
  }
}
export const WorkoutContextProvider=({children})=>{
  const [state,dispatch]=useReducer(workoutReducer,{
    workouts:null
  });//this obj is the initial state
  /*...state-workouts */
  return (
    
    <WorkoutContext.Provider value={{...state,dispatch}}>
      {children}
    </WorkoutContext.Provider>
  )
}
