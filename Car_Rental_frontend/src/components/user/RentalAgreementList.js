// RentalAgreementList.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { acceptRentalAgreement, editRentalAgreement, fetchUserRentalAgreements, requestReturn } from '../../services/RentalAgreementAPI';
import { selectRentalAgreements, setRentalAgreements } from '../../redux/features/rentalAgreementSlice';
import axios from 'axios';
import { selectUser } from './../../redux/features/authSlice';

const RentalAgreementList = () => {
  const dispatch = useDispatch();
  const user = useSelector (selectUser)// Replace with actual user ID
  const rentalAgreements = useSelector(selectRentalAgreements);
  const [rentalEndDate, setRentalEndDate] = useState('');
  const [rentalStartDate, setRentalStartDate] = useState('');
  const [toggle, setToggle] = useState({});
  useEffect(() => {
    const fetchRentalAgreements = async () => {
      try {
        const agreements = await fetchUserRentalAgreements(user.id);
        console.log('agreements',agreements);
        dispatch(setRentalAgreements(agreements));
      } catch (error) {
        console.error('Error fetching rental agreements:', error);
      }
    };
    fetchRentalAgreements();
  }, [dispatch, user.id]);

  const config={
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };
  const handleRequestReturn= async(id)=>{
    try{
    dispatch(requestReturn(id));
    window.location.reload();
    }
    catch(error)
    {
      console.error("Error in requesting return",error);
    }
  }

  const handleUpdateAgreement= async(id,carId)=>{
    dispatch(editRentalAgreement(id,carId,rentalStartDate,rentalEndDate));
    alert(`Agreement with id ${id} has been updated `);
    window.location.reload();
  }

  const handleToggleButton=(id)=>{
    setToggle({
      ...toggle,
      [id]: !toggle[id],
    });
  }
  const handleAccept=async(id)=>{

    await dispatch(acceptRentalAgreement(id));

    window.location.reload();

  }
  return (
    <div>
      <h2>Your Agreements</h2>
      <p className='text-danger'> <a className="btn btn-link text-danger" onClick={()=>window.location.reload()}>click here</a> if rental agreements are not visible!!!</p>
      <ul className="list-group list-group-light mx-5">
      {rentalAgreements &&
        rentalAgreements.map((agreement) => (
          <div key={agreement.id}>
            <li className=" list-group-item d-flex justify-content-between align-items-center border-3 mx-5 px-5">
    <div className="d-flex align-items-center">
      <img src={agreement.car.imageLink} className="rounded-circle" alt=""
        style={{width: "150px", height: "150px"}} />
      <div className='row d-flex justify-content-center align-items-center px-5'>
      <div className="col-6">
        <p className="fw-bold mb-1">Agreement ID: {agreement.id}</p>
        <p className="fw-bold mb-1">Start Date: {agreement.rentalStartDate}</p>
        <p className="fw-bold mb-1">End Date: {agreement.rentalEndDate}</p>
        <p className="fw-bold mb-1">Car Name: {agreement.car.maker} {agreement.car.model}</p>
        <p className="fw-bold mb-1">Total cost: {agreement.totalCost}</p>
      </div>

      <div className='col-2 '>{agreement.isAccepted && !agreement.isRequestForReturn?<button className="btn btn-dark" onClick={()=>handleRequestReturn(agreement.id)}>Request Return</button>:<button className="btn btn-dark" disabled>Return Requested</button>}</div>
      <div className='col-2'>{!agreement.isAccepted?(<div><button onClick={()=>handleToggleButton(agreement.id)} className='btn btn-dark'>Update Agreement</button><br/><button onClick={()=>handleAccept(agreement.id)} className='btn btn-dark mt-2'>Accept Agreement</button></div>):(<div><button disabled className='btn btn-dark'>Update Agreement</button><br/><button disabled className='btn btn-dark mt-2'>Agreement Accepted</button></div>)}  </div>
      <div className='col-2 '> <p class={`badge rounded-pill ${agreement.isReturned?"bg-success":"bg-warning "}`}>{agreement.isReturned?"Returned":"Not Returned"}</p><br/><p class={`badge rounded-pill ${agreement.isAccepted?"bg-success":"bg-warning "}`}>{agreement.isAccepted?"Accepted":"Not Accepted"}</p></div>
      </div>
      
    </div>
   
  </li>
  {toggle && <div style={{ display: toggle[agreement.id] ? 'block' : 'none' }} className=" justify-content-center align-items-center px-5 ">
     
              <p className="fw-bold text-primary">Update Agreement with id {agreement.id}</p>
             
              <div className="form-outline form-white mb-2">
              <label>New Rental Start Date:</label>
                <input  type="datetime-local" value={rentalStartDate} onChange={(e) => setRentalStartDate(e.target.value)}  className="form-control form-control-lg" />
                
              </div>

              <div className="form-outline form-white mb-2">
              <label>New Rental End Date:</label>
                <input  type="datetime-local" value={rentalEndDate} onChange={(e) => setRentalEndDate(e.target.value)} id="typePasswordX" className="form-control form-control-lg" />
                
              </div>
      <button onClick={() => handleUpdateAgreement(agreement.id,agreement.carId)}>Update Agreement</button>
      </div>}
            <hr width="0" />
          </div>
        ))}
         </ul>
    </div>
  );
};

export default RentalAgreementList;
