import { BrowserRouter, Routes, Route } from "react-router-dom";
import  Login  from "./pages/login/login";
import Register from "./pages/register/register";
import Appointments from "./pages/appointments/appointments";
import AppoitnmentsAdd from "./pages/appointmentsAdd/AppointmentsAdd";
import Doctors from "./pages/doctors/doctors";
import DoctorsAdd from "./pages/doctorsAdd/DoctorsAdd";
import Patients from "./pages/patients/patients";
function Routering() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} key={1}/>
        <Route path="/register" element={<Register />} key={2} />
        <Route path="/appointments" element={<Appointments />} key ={3}/>
        <Route path="/appointment-edit/:id_appointment" element={<AppoitnmentsAdd />}  key={4}/>
        <Route path="/appointments/add" element={<AppoitnmentsAdd />} key={5}/>
        <Route path="/doctors" element={<Doctors />} key={6}/>
        <Route path="/doctor/add" element={<DoctorsAdd />} key={7}/>
        <Route path="/doctor-edit/:id_doctor" element={<DoctorsAdd />} key={7}/>
        <Route path="/patients" element={<Patients />} key={8}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Routering