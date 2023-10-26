import { BrowserRouter as Router, Route, Link, Routes,Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from './redux/features/authSlice';
import UserInfo from './components/UserInfo';
import Login from './components/Login';
import './App.css';

import RentalAgreementList from './components/user/RentalAgreementList';
import AdminValidateReturnCar from './components/admin/AdminValidateReturnCar';
import Navbar from './components/Navbar';
import Unauthorized from './pages/Unauthorized';
import AdminProtected from './components/AdminProtectedRoute';
import Protected from './components/ProtectedRoute';
import AdminAddCar from './components/admin/AdminAddCar';
function App() {
  const user = useSelector(selectUser)||null;
  const localToken=localStorage.getItem('token')||null;
  return (
    <Router>

    <div className="App">
      {localToken&&<Navbar/>}
      <Routes>
      <Route element={<UserInfo />} path="/userinfo" exact/>
      <Route element={<Login />} path="/" exact/>
      {(user&&localToken)&&<Route element={<Protected isAdmin={user.isAdmin} isSignedIn={localToken!=null?true:false}><RentalAgreementList /></Protected>} path="/rentalagreements" exact/>}
      <Route element={<Unauthorized/>} path="/unauthorized" exact/>
      {(user && localToken) &&<Route path="/admin/validatecar" element={
        <AdminProtected isAdmin={user.isAdmin} isSignedIn={localToken!=null?true:false}>
          <AdminValidateReturnCar />
        </AdminProtected>
      
      }/>}
      {(user && localToken) &&<Route path="/admin/addcar" element={
        <AdminProtected isAdmin={user.isAdmin} isSignedIn={localToken!=null?true:false}>
          <AdminAddCar />
        </AdminProtected>
      
      }/>}
      <Route element={<Unauthorized/>} path="*"/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
