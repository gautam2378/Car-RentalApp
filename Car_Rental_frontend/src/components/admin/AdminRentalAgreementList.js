import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAdminRentalAgreements,
  updateAdminRentalAgreement,
  deleteAdminRentalAgreement,
  validateReturnCars,
  markCarReturned,
} from '../../services/adminRentalAgreementAPI';
import { selectAdminRentalAgreements } from '../../redux/features/adminRentalAgreementSlice';
import { useNavigate } from 'react-router';
import { selectToken } from '../../redux/features/authSlice';

const AdminRentalAgreementList = () => {
  const dispatch = useDispatch();
  const adminRentalAgreements = useSelector(selectAdminRentalAgreements);
  const navigate = useNavigate();
  const [rentalEndDate, setRentalEndDate] = useState('');
  const [rentalStartDate, setRentalStartDate] = useState('');
  const [toggle,setToggle]=useState({});
  const localToken=useSelector(selectToken)||null;
  useEffect(()=>{
    if(localToken==null)
    {
      navigate("/");
    }
  },[])
  useEffect(() => {
    dispatch(fetchAdminRentalAgreements());
  }, [dispatch]);

  const handleUpdateAgreement = (id,carId) => {
    // You can pass additional data like rentalEndDate and endRentalDate here
    dispatch(
      updateAdminRentalAgreement(id, {
        carId:carId,
        rentalStartDate: rentalStartDate,
        rentalEndDate: rentalEndDate,
      })
    );
  };

  const handleDeleteAgreement = (id) => {
    dispatch(deleteAdminRentalAgreement(id));
  };


  const handleMarkCarReturned = (id) => {
    dispatch(markCarReturned(id));
  };
  const handleToggleButton=(id)=>{
    setToggle({
      ...toggle,
      [id]: !toggle[id],
    });
  }
  return (
    <div>
      <h2>All Agreements</h2>

<ul className="list-group list-group-light mx-5">
      {adminRentalAgreements &&
        adminRentalAgreements.map((agreement) => (
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

      <div className='col-2 '><button onClick={() => handleDeleteAgreement(agreement.id)}>Delete </button></div>
      <div className='col-2'><button onClick={()=>handleToggleButton(agreement.id)} className='btn btn-dark'>Update </button></div>
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

export default AdminRentalAgreementList;
