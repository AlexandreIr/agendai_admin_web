import { BrowserRouter, Routes, Route } from "react-router-dom";
import  Login  from "./pages/login/login";
import Register from "./pages/register/register";
import Appointments from "./pages/appointments/appointments";
import AppoitnmentsAdd from "./pages/appointmentsAdd/AppointmentsAdd";
function Routering() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/appointment-edit/:id_appointment" element={<AppoitnmentsAdd />} />
        <Route path="/appointments/add" element={<AppoitnmentsAdd />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Routering