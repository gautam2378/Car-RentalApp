import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars } from '../../services/carSearchAPI';
import { selectCars, selectSelectedCarId, setSelectedCarId } from '../../redux/features/carSlice';
import RentalAgreementCreation from './RentalAgreementCreation';

const UserHomePage = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const selectedCarId = useSelector(selectSelectedCarId);

  const [maker, setMaker] = useState('');
  const [model, setModel] = useState('');
  const [rentalPrice, setRentalPrice] = useState('');

  const handleSearch = () => {
    dispatch(fetchCars(maker, model, rentalPrice));
  };

  const handleCarSelect = (carId) => {
    dispatch(setSelectedCarId(carId)); 
  };
 
  return (
    <div>
      {!selectedCarId && <div className="mx-5 mt-5">
        <div className="row">
            <div className="col">
                <div className="form-outline">
                    <input type="text" placeholder='Maker' value={maker} onChange={(e) => setMaker(e.target.value)} id="form12"  className="form-control" />
                    <label className="form-label" for="form12">Maker</label>
                </div>
            </div>
            <div className="col">
                <div className="form-outline">
                    <input placeholder='Model' type="text" value={model} onChange={(e) => setModel(e.target.value)} id="form12" className="form-control" />
                    <label className="form-label" for="form12">Model</label>
                </div>
            </div>
            <div className="col">
                <div className="form-outline">
                    <input placeholder='Rental Price' type="text" value={rentalPrice} onChange={(e) => setRentalPrice(e.target.value)} id="form12" className="form-control" />
                    <label className="form-label" for="form12">Rental Price</label>
                </div>
            </div>

        </div>
        <div className='row'><button className="btn btn-success" onClick={handleSearch}>Search</button></div>
    </div>}

    
    {!selectedCarId && <div className="row row-cols-1 row-cols-md-3 g-4 m-5">
      {cars.map((car) => (
        
      <div key={car.id} className="col">
        <div className="card h-100">
          <img src={car.imageLink} className="card-img-top"
            alt="Palm Springs Road" />
          <div className="card-body">
            <h5 className="card-title">{car.maker+" "+car.model}</h5>
            <p className="card-text">
             Rental Price: <span className="text-warning ">{car.rentalPrice}</span>
            </p>
            {car.isAvailable?<button className="btn btn-dark" data-toggle="modal" data-target="#myModal"   onClick={()=>handleCarSelect(car.id)}>Select Car</button>:<button className="btn btn-dark"  disabled>Not Available</button>}
          </div>
          <div className="card-footer">
            <small className="text-muted">{car.isAvailable?<p className="text-success fs-5">Available</p>:<p className="text-warning fs-5">Unavailable</p>}</small>
          </div>
        </div>
      </div>
        
      ))}
      </div>}
      {selectedCarId && <RentalAgreementCreation/>}
     
    </div>
  );
};

export default UserHomePage;
