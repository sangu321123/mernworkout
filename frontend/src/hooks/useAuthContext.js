import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext=()=>{
  const context=useContext(AuthContext);//returns the value passed into the provider component({state,dispatch})
  if(!context){
    throw Error('useWAuthContext must be used inside an AuthContextProvider');
  };
  return context;
};