import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    validateReturnCars,
    markCarReturned,
  } from '../../services/adminRentalAgreementAPI';
import { selectCars } from '../../redux/features/carSlice';
import { selectToken } from '../../redux/features/authSlice';
import { useNavigate } from 'react-router';
const AdminValidateReturnCar = () => {
     const dispatch=useDispatch();
    const validateCars=useSelector(selectCars);
    const navigate=useNavigate();

    const localToken=useSelector(selectToken)||null;
  useEffect(()=>{
    if(localToken==null)
    {
      navigate("/");
    }
  },[])
    useEffect(async ()=>{
        dispatch(validateReturnCars());

    },[dispatch])

    const handleCarMarked=(id)=>{
        dispatch(markCarReturned(id));
        dispatch(validateReturnCars());
    }
  return (
    <div>
      {validateCars.length==0&&<div className='fw-bold fs-4 '> No Car for Return</div>}
      <div className="row row-cols-1 row-cols-md-3 g-4 m-5">
      
      {validateCars && validateCars.map((car)=>(
          
          <div key={car.id} className="col">
        <div className="card h-100">
          <img src={car.imageLink} className="card-img-top"
            alt="Palm Springs Road" />
          <div className="card-body">
            <h5 className="card-title">{car.maker+" "+car.model}</h5>
            <p className="card-text">
             Rental Price: <span className="text-warning ">{car.rentalPrice}</span>
            </p>
            
          </div>
          <div className="card-footer">
          <button className='btn btn-dark' onClick={()=>handleCarMarked(car.id)}> Mark Car Returned</button>
          </div>
        </div>
      
            
        </div>
      ))} 
      </div>
    </div>
  )
}

export default AdminValidateReturnCar
