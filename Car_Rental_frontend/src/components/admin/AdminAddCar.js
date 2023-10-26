import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { adminAddCar } from '../../services/adminRentalAgreementAPI';
import { useNavigate } from 'react-router';

const AdminAddCar = () => {
    const [carModel,setCarModel]=useState("");
    const [carMaker,setCarMaker]=useState("");
    const [imageLink,setImageLink]=useState("");
    const [rentalPrice,setRentalPrice]=useState(0.0);
    const [isAvailable, setIsAvailable] = useState(true); 
    const dispatch=useDispatch();
    const navigate=useNavigate();
  const handleRadioChange = (event) => {
    setIsAvailable(event.target.value ==="true");
  };
  const handleAddCar=()=>{
    if (carMaker=="" || carModel=="" ||imageLink==""|| rentalPrice <= 0) {

      alert('Please fill all the required fields.');

      return;

    }
    dispatch(adminAddCar({
        Maker : carMaker,
        Model :carModel,
        imageLink :imageLink,
        RentalPrice :rentalPrice,
        IsAvailable :isAvailable
    }))
    navigate("/userinfo");
  }
  return (
    <div>
      <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card bg-primary text-white" style={{borderRadius: "1rem"}}>
          <div className="card-body p-5 text-center">

            <div className="mb-md-5 mt-md-4 pb-5">

              <h2 className="fw-bold mb-2 text-uppercase">Add a New Car</h2>
              <p className="text-white-50 mb-5">Please enter the details below:</p>

              <div className="form-outline form-white mb-4">
                <input  type="text" placeholder="Car Maker" value={carMaker} onChange={(e) => setCarMaker(e.target.value)} className="form-control form-control-lg" />
               
              </div>
              <div className="form-outline form-white mb-4">
                <input  type="text" placeholder="Car Model" value={carModel} onChange={(e) => setCarModel(e.target.value)} className="form-control form-control-lg" />
               
              </div>
              <div className="form-outline form-white mb-4">
                <input  type="text" placeholder="Car Rental Price" value={rentalPrice} onChange={(e) => setRentalPrice(e.target.value)} className="form-control form-control-lg" />
               
              </div>
              <div className="form-outline form-white mb-4">
                <input  type="text" placeholder="Image Link" value={imageLink} onChange={(e) => setImageLink(e.target.value)} className="form-control form-control-lg" />
               
              </div>
              <div className='form-outline form-white mb-4'>
              <h3>Is the car available?</h3>
      <div className='row d-flex justify-content-around'><label>
        <input
          type="radio"
          className='form-check-input'
          value="true"
          checked={isAvailable === true}
          onChange={handleRadioChange}
        />
        Yes
      </label>
      <label>
        <input
          type="radio"
          value="false"
          className='form-check-input'
          checked={isAvailable === false}
          onChange={handleRadioChange}
        />
        No
      </label>
      </div>
              </div>
              <button className="btn btn-light btn-lg px-5" type="submit" onClick={handleAddCar}>Add Car</button>


            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
  )
}

export default AdminAddCar
