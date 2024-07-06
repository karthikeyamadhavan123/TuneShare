import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Protected = (props) => {
    const {Component}=props;
  const navigate=  useNavigate();
  useEffect(()=>{
    const userId=localStorage.getItem('user_id')||localStorage.getItem('userId');
    if(!userId){
      navigate('/login');
    }
  })
 
  return (
    <div>
      <Component/>
    </div>
  )
}

export default Protected
