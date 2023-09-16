import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from './components/Home/Home';
import Header from './components/Layout/Header/Header';
import Courses from './components/Courses/Courses';
import Footer from './components/Layout/Footer/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import ContactUs from './components/Contact/ContactUs';
import Request from './components/Request/Request';
import AboutUs from './components/About/AboutUs';
import Subscribe from './components/Payments/Subscribe';
import NotFound from './components/Layout/NotFound/NotFound';
import PaymentSuccess from './components/Payments/PaymentSuccess';
import PaymentFail from './components/Payments/PaymentFail';
import CoursePage from './components/CoursePage/CoursePage';
import Profile from './components/Profile/Profile';
import UpdateProfile from './components/Profile/UpdateProfile';
import ChangePassword from './components/Profile/ChangePassword';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import CreateCourse from './components/Admin/CreateCourse/CreateCourse';
import AdminCourses from './components/Admin/AdminCourses/AdminCourses';
import Users from './components/Admin/Users/Users';

function App() {

  window.addEventListener('contextmenu',(e)=>{
    e.preventDefault()
  })
  return (
    <Router>
       <Header/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/updateprofile' element={<UpdateProfile />}/>
        <Route path='/changepassword' element={<ChangePassword />}/>
        <Route path='/courses' element={<Courses />}/>
        <Route path='/course/:id' element={<CoursePage />}/>
        <Route path='/contact' element={<ContactUs />}/>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/request' element={<Request />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/forgotpassword' element={<ForgotPassword />}/>
        <Route path='/resetpassword/:token' element={<ResetPassword />}/>
        <Route path='/subscribe' element={<Subscribe />}/>
        <Route path='*' element={<NotFound />}/>
        <Route path='/paymentsuccess' element={<PaymentSuccess/>}/>
        <Route path='/paymentfail' element={<PaymentFail/>}/>

        {/* Admin Routes */}
        <Route path='/admin/dashboard' element={<Dashboard/>}/>
        <Route path='/admin/createcourse' element={<CreateCourse/>}/>
        <Route path='/admin/courses' element={<AdminCourses/>}/>
        <Route path='/admin/users' element={<Users/>}/>
      </Routes>

      <Footer/>
    </Router>
  );
}

//export
export default App;
