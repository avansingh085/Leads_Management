import React,{ useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Toaster, toast } from "react-hot-toast";
import LeadManagement from './pages/LeadsManagement.jsx'
import Login from './pages/Login.jsx'
import { Route, Router, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { apiClient } from './apiClient/api.js'
import { useNavigate } from 'react-router-dom'
import { FaSpinner } from 'react-icons/fa'
function App() {

 const [user,setUser]=useState(null);
 const nav=useNavigate();
 const [isLoad,setIsLoad]=useState(true);


 useEffect(()=>{
  const fetchProfile=async ()=>{
    try{
      setIsLoad(true);
         const res=await apiClient.get('/user');
        setUser(res.data);
        nav('/dashboard');

    }
    catch(err){
      nav('/')
     console.log(err);
    }finally{
      setIsLoad(false);
    }
  }
  fetchProfile();
 },[])


 if(isLoad)
 {
    return (<div className='h-screen w-screen grid items-center justify-center'>
           <FaSpinner className='h-12 w-12 animate-spin'/>
         </div>);
 }

  return (
    <>
       <Routes>
         
         <Route path="/dashboard" element={<LeadManagement user={user} />}/>
     
         <Route path="/" element={<Login setUser={setUser}/>}/>
       
       </Routes>
        
    </>
  )
}

export default App
