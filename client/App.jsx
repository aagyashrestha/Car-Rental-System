import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './Components/Signup'
import Login from './Components/Login'
import Home from './Components/Home'
import ForgotPassword from './Components/ForgotPassword'
import ResetPassword from './Components/ResetPassword'
import Dashboard from './Components/Dashboard'

import LuxuryCar from './Components/LuxuryCar'
import SportsCar from './Components/SportsCar'
import RegularCar from './Components/RegularCar'
import AboutUs from './Components/About'
import Menu from './Components/Menu'
import Booking from './Components/Booking'
import Toyota from './Components/Toyota'
import Maruti from './Components/Maruti'
import Ford from './Components/Ford'
import Scorpio from './Components/Scorpio'
import Mustang from './Components/Mustang'
import Corvette from './Components/Corvette'
import Nissan from './Components/Nissan'
import Alfa from './Components/Alfa'
import Audi from './Components/Audi'
import BMW from './Components/Bmw'
import Porsche from './Components/Porsche'
import Bentley from './Components/Bentley'
import Admin from './Components/Admin'
import CarDetailsForm from './Components/AddCarForm'

import Payment from './Components/Payment'
import Contact from './Components/Contact'; 
import CarDetails from './Components/CarCard';
import CarCard from './Components/CarCard'
import EditCarForm from './Components/EditCarForm'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path = "/signup" element={<Signup />}></Route>
        <Route path = "/login" element={<Login />}></Route>
        <Route path = "/forgotPassword" element={<ForgotPassword />}></Route>
        <Route path = "/resetPassword/:token" element={<ResetPassword />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/luxurycar" element={<LuxuryCar  />}></Route>
        <Route path="/sportscar" element={<SportsCar  />}></Route>
        <Route path="/regularcar" element={<RegularCar  />}></Route>
        <Route path="/aboutus" element={<AboutUs  />}></Route>
        <Route path="/menu" element={<Menu />}></Route>
        <Route path="/booking/:carId" element={<Booking />}></Route>
        <Route path="/toyota" element={<Toyota />}></Route>
        <Route path="/maruti" element={<Maruti />}></Route>
        <Route path="/ford" element={<Ford />}></Route>
        <Route path="/scorpio" element={<Scorpio />}></Route>
        <Route path="mustang" element={<Mustang />}></Route>
        <Route path="/corvette" element={<Corvette />}></Route>
        <Route path="/nissan" element={<Nissan />}></Route>
        <Route path="/alfa" element={<Alfa />}></Route>
        <Route path="/audi" element={<Audi />}></Route>
        <Route path="/bmw" element={<BMW />}></Route>
        <Route path="/porsche" element={<Porsche />}></Route>
        <Route path="/bentley" element={<Bentley />}></Route>
        <Route path="/cars" element={<Admin/>}></Route>
        <Route path="/payment" element={<Payment />}></Route>
        <Route path="/addcarform" element={<CarDetailsForm />}></Route>
        <Route path="/cars/:id" element={<CarCard/>} />
        <Route path="/home" element={<Home/>}></Route>

        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/editcarform/:id" element={<EditCarForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
