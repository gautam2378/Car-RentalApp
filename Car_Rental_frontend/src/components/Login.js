// Login.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from "../redux/features/authSlice";
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { selectToken } from '../redux/features/authSlice';
import Base_Url from '../services/BaseUrl';
function Login() {



  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const token=useSelector(selectToken) ;
  useEffect(()=>{
    if(token){
        navigate("/userinfo");
      }
  },[])
 
  
  const handleLogin = async () => {
    try {
      if(username=="" || password==""){
        alert("Please Enter Your Login Credentials!");
        return;
      }
      const response = await axios.post(`${Base_Url}/api/auth/login`, {
        username,
        password,
      });
      
      console.log("response",response.data)
      
      const { token } = response.data;
     
      dispatch(setToken(token));
      navigate("/userinfo")
      // Redirect or navigate to the user info page after successful login
    } catch (error) {
      console.error('Login failed', error);
      if(error.response.status==500)
      {alert("Wrong Login Credentials!!")}
    }
  };

  return (
  
<section className="vh-100 gradient-custom">
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card bg-primary text-white"style={{borderRadius: "1rem"}}>
          <div className="card-body p-5 text-center">

            <div className="mb-md-5 mt-md-4 pb-5">
              <h4 className="fw-bold mb-2"> CarRentAPP Login</h4>
              <p className="text-white-50 mb-5">Please enter your username and password!</p>

              <div className="form-outline form-white mb-4">
                <input  type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control form-control-lg" />
               
              </div>

              <div className="form-outline form-white mb-4">
                <input  type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} id="typePasswordX" className="form-control form-control-lg" />
                
              </div>

              <button className="btn btn-info btn-lg px-5" type="submit" onClick={handleLogin}>Login</button>


            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    
  );
}

export default Login;
