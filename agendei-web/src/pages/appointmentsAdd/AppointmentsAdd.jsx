import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbar"
import { doctors, doctors_services } from "../../constants/mock"


function AppoitnmentsAdd() {
    const {id_appointment} = useParams();

  return (
    <>
        <Navbar />
        <div className="container-fluid mt-page">
            <div className="row col-lg-5 offset-lg-4">
                <div className="col-12 mt-2">
                    <h2>{id_appointment ? "Editar agendamento" : "Novo agendamento"}</h2>
                </div>

                <div className="col-12 mt-2">
                    <label htmlFor="doctors">Médicos</label>
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
                </div>

                <div className="col-12 mt-3">
                    <label htmlFor="services">Serviços</label>
                    <div className="form-control">
                        <select name="services" id="services">
                            <option value="">Todos os serviços</option>
                            {doctors_services.map((services) => (
                            <option key={doctors_services.id_serice} value={doctors_services.id_service}>
                                {services.description}
                            </option>
                            ))} 
                        </select>
                </div>
                </div>

                <div className="col-6 mt-3">
                    <label htmlFor="date">Data</label>
                    <input type="date" id="date" className="form-control" />
                </div>

                <div className="col-6 mt-3">
                    <label htmlFor="hour">Hora</label>
                        <select name="hour" id="hour" className="form-control mb-3">
                            <option value="0">Todos as horas</option>
                            <option value="08:00">08:00</option>    
                            <option value="09:00">09:00</option>    
                            <option value="10:00">10:00</option>    
                            <option value="11:00">11:00</option>    
                            <option value="12:00">12:00</option>    
                            <option value="13:00">13:00</option>    
                            <option value="14:00">14:00</option>
                        </select>
                </div>
                <div className="col-12 mt-4">
                    <div className="d-flex justify-content-end">
                        <Link to={"/appointments"} className="btn btn-outline-danger me-3">
                            Cancelar
                        </Link>
                        <button className="btn btn-primary ms-2">
                            Agendar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default AppoitnmentsAdd;