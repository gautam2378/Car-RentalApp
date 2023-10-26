// RentalAgreementCreation.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createRentalAgreement } from '../../services/RentalAgreementAPI';
import { useSelector } from 'react-redux';
import { selectSelectedCarId,setSelectedCarId } from '../../redux/features/carSlice';
const RentalAgreementCreation = () => {
  const dispatch = useDispatch();
  const [carId, setCarId] = useState('');
  const [rentalStartDate, setRentalStartDate] = useState('');
  const [rentalEndDate, setRentalEndDate] = useState('');
  const selectedCarId=useSelector(selectSelectedCarId)

  

  const handleCreateRentalAgreement = async () => {
    try {
      await dispatch(dispatch(createRentalAgreement(selectedCarId, rentalStartDate, rentalEndDate)));
    } catch (error) {
      console.error('Error creating rental agreement:', error);
    }
  };
  const handleUnselectCarID=()=>{
    dispatch(setSelectedCarId(null));
  }
  return (
  <div className="container ">
    
    <div className="row d-flex justify-content-center align-items-center m-3">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card bg-primary text-white" style={{borderRadius: "1rem"}}>
        <button className='btn btn-close bg-white mt-3 mx-3' onClick={()=>handleUnselectCarID()}></button>
          <div className="card-body p-2 text-center">

            <div className=" pb-1 px-5">
            
              <h2 className="fw-bold mb-2 text-uppercase">Create Rental Agreement</h2>
              <p className="text-white-50 mb-5">Please enter the following details:</p>
              <div className="form-outline form-white mb-2">
              <label>Car ID:</label>
                <input  type="text" value={selectedCarId} onChange={(e) => setCarId(e.target.value)} disabled className="form-control form-control-lg" />
                
              </div>
              <div className="form-outline form-white mb-2">
              <label>Rental Start Date:</label>
                <input  type="datetime-local" value={rentalStartDate} onChange={(e) => setRentalStartDate(e.target.value)}  className="form-control form-control-lg" />
                
              </div>

              <div className="form-outline form-white mb-2">
              <label>Rental End Date:</label>
                <input  type="datetime-local" value={rentalEndDate} onChange={(e) => setRentalEndDate(e.target.value)} id="typePasswordX" className="form-control form-control-lg" />
                
              </div>
              <button className="btn btn-light btn-lg px-3" type="submit" onClick={handleCreateRentalAgreement}>Create Rental Agreement</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default RentalAgreementCreation;
