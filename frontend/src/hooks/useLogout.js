import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext} from "./useWorkoutsContext";
export const useLogout=()=>{
  const {dispatch}=useAuthContext();
  const {dispatch:workoutsDispatch}=useWorkoutsContext();
  const logout=()=>{
    
    //no need to send any requests
    //remove user from storage
    localStorage.removeItem('user');
    //dispatch logout action to remove from globalstate
    dispatch({type:'LOGOUT'});
    workoutsDispatch({type:'SET_WORKOUTS',payload:null});
  };
  return {logout};
}