import { Link } from "react-router-dom"
import Navbar from "../../components/navbar/navbar.jsx"
import  {appointments, doctors} from '../../constants/mock'
import AppointmentTable from "../../components/navbar/appointmentTable/appointmentTable.jsx";

function Appointments() {

  return (
    <div className="container-fluid mt-page">
      <Navbar />
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2 className="d-inline me-3">Agendamentos</h2>
          <Link to="/appointments/add" className="btn btn-outline-primary">
            Novo Agendamento
          </Link>
        </div>
        <div className="d-flex gap-3 align-items-center">
          <input type="date" id="startDate" className="form-control" />
          <span>Até</span>
          <input type="date" id="endDate" className="form-control" />

          <div className="form-control">
            <select name="doctors" id="doctors">
              <option value="">Todos os médicos</option>
              {doctors.map((doctor) => (
                <option key={doctor.id_doctor} value={doctor.id_doctor}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>
            <button className="btn btn-primary">Filtrar</button>
        </div>
      </div>
      {<AppointmentTable appointments={appointments} />}
    </div>
  )
}

export default Appointments