import React from 'react'
import { clearAuthData, selectToken, selectUser } from '../redux/features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { clear } from '@testing-library/user-event/dist/clear';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { clearRentalData } from '../redux/features/rentalAgreementSlice';
const Navbar = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const token=useSelector(selectToken);
    const user=useSelector(selectUser)
const handleLogout=()=>{
  localStorage.clear();
    dispatch(clearAuthData());
    dispatch(clearRentalData());
  
    navigate('/')
    window.location.reload();
}
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid mx-2">
            <Link to="" className="navbar-brand">CarRentAPP</Link>
            <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between mx-3" id="navbarCollapse">
                <div className="navbar-nav">
                    {user?<Link to="/userinfo" className="nav-item nav-link active">Home</Link>:""}
                    
                    {user && user?.isAdmin?(<Link to="/admin/validatecar" className="nav-item nav-link">Validate Cars</Link>):<Link className="nav-item nav-link active" to="/rentalagreements">My Rental Agreements</Link>}
                    {user && user?.isAdmin && <Link to="/admin/addcar" className="nav-item nav-link">Add Car</Link>}
                </div>
                <div className="navbar-nav">
                  <a className="navbar-brand text-light nav-item ">{user?.userName} {user?.isAdmin?"(Admin)":"(User)"}</a>
                  
                </div>
                <div className="navbar-nav">
                    {!token&&<Link to="/" className="nav-item nav-link">Login</Link>}
                    {token && <Link className="nav-item nav-link" onClick={()=>handleLogout()}>Logout</Link>}
                </div>
            </div>
        </div>
    </nav>
      
    </div>
  )
}

export default Navbar
