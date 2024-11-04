import { Link, useNavigate } from "react-router-dom"
import Navbar from "../../components/navbar/navbar.jsx"
import AppointmentTable from "../../components/navbar/appointmentTable/appointmentTable.jsx";
import api from "../../constants/api.js";
import { useEffect, useState } from "react";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [dateFilter, setDateFilter] = useState({});
  const [doctorFilter, setDoctorFilter] = useState('');
  const [FilteredAppointments, setFilteredAppointments] = useState([]);

  const navigate = useNavigate();
  
  const loadDoctors = async() => {
    try {
      const response = await api.get("/doctors");

      if (response.data) {
          setDoctors(response.data);
      }

    } catch (error) {
        if (error.response?.data.error) {
          if (error.response.status == 401)
              return navigate("/");

          alert(error.response?.data.error);
      }
        else
          alert("Erro ao listar médicos.");
    }
  }

  const loadAppoitments = async() => {
    try {
      const response = await api.get('/admin/appointments' );
      if(response.data){
        setAppointments(response.data);
        setFilteredAppointments(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const editAppointment = (id_appointment) => {
    navigate(`/appointment-edit/${id_appointment}`);
  }

  const deleteAppointment = async (id_appointment) => {
    const confirm = window.confirm('Tem certeza que deseja excluir o agendamento?');
    if(confirm) {
        const response = await api.delete(`/admin/appointments/${id_appointment}`);
        if(response.data) {
            setAppointments(appointments.filter(appointment => appointment.id_appointment !== id_appointment));
            alert('Agendamento excluído com sucesso!');
        }
    }
  }

  // const handleParameters = (e) => {
  //   const { value } = e.target;
  //   if(value != '') 
  //     setFilteredAppointments(appointments.filter((appointment) => value.includes(appointment.doctor)));
  //   else
  //     setFilteredAppointments(appointments);
  // };

  const filterDate = (e) =>{
    const { name, value } = e.target;
    setDateFilter({...dateFilter,[name]: value});
  }


const filterAppointments = () => {
    let filtered = [...appointments];

    let sd = new Date(dateFilter.startDate);
    let ed = new Date(dateFilter.endDate);

    sd = sd.setDate(sd.getDate() + 1);
    ed = ed.setDate(ed.getDate() + 1);

    if (doctorFilter!='') {
        filtered = filtered.filter(app => doctorFilter.includes(app.doctor));
    }

    if (dateFilter.startDate) {
        filtered = filtered.filter(app => {
            const appDate = new Date(app.booking_date.split('T')[0]);
            return appDate >= sd;
        });
    }

    if (dateFilter.endDate) {
        filtered = filtered.filter(app => {
            const appDate = new Date(app.booking_date.split('T')[0]);
            return appDate <= ed;
        });
    }

    setFilteredAppointments(filtered);
};

  useEffect(() => {
    loadDoctors();
    loadAppoitments();
  }, []);

    
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
          <input type="date" id="startDate" className="form-control" name="startDate" onChange={filterDate} />
          <span>Até</span>
          <input type="date" id="endDate" className="form-control" name="endDate" onChange={filterDate}/>

          <div className="form-control">
            <select name="doctors" id="doctors" onChange={(e)=>setDoctorFilter(e.target.value)}>
              <option value="">Todos os médicos</option>
              {doctors.map((doctor) => (
                <option key={doctor.id_doctor} value={doctor.name}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>
            <button className="btn btn-primary" onClick={filterAppointments}>Filtrar</button>
        </div>
      </div>
      <div>
        <table className="table table-hover mt-4">
                  <thead>
                      <tr>
                          <th scope="col">Paciente</th>
                          <th scope="col">Médico</th>
                          <th scope="col">Serviço</th>
                          <th scope="col">Data/Hora</th>
                          <th scope="col" className="text-end">Valor</th>
                          <th scope="col" className="col-buttons "></th>
                      </tr>
                  </thead>
                  <tbody>
                    { FilteredAppointments.map((appointment) => (
                      <AppointmentTable
                        key={appointment.id_appointment}
                        id_appointment={appointment.id_appointment}
                        user={appointment.user}
                        doctor={appointment.doctor}
                        service={appointment.service}
                        booking_date={appointment.booking_date}
                        booking_hour={appointment.booking_hour}
                        price={appointment.price}
                        deleteAppointment={deleteAppointment}
                        editAppointment={editAppointment}
                      />
                    ))}
                  </tbody>

        </table>
      </div>
      
    </div>
  )
}

export default Appointments