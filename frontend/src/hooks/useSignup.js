import { useState } from "react";
import {useAuthContext} from './useAuthContext';
export const useSignup=()=>{
  const [error,setError]=useState(null);
  const [isLoading,setIsLoading]=useState(null);
  const {dispatch}=useAuthContext();
  const signup=async(email,password)=>{
    setIsLoading(true);
    setError(null);
    const response=await fetch('/api/user/signup',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({email,password})
    });
    const json=await response.json();//info reg jwt or an error msg//here u get an object
    if(!response.ok){
      setIsLoading(false);
      setError(json.error);
    };
    if(response.ok){
      //save the user to local storage(email propertu and jwt)
      localStorage.setItem('user',JSON.stringify(json))//here restringifying into json

      //update AuthContext
      dispatch({type:'LOGIN',payload:json});
      setIsLoading(false);
    }

  }
  return {signup,isLoading,error};

};