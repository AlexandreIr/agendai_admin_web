import { Link, useLocation, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbar"
import api from "../../constants/api";
import { useEffect, useState } from "react";


function AppoitnmentsAdd() {
    const {id_appointment} = useParams();
    const location = useLocation();
    const currentUrl = location.pathname
    const {doc} = location.state;
    const [services, setServices] = useState([]);	
    const [appointment, setAppointment] = useState({})

    const fetchServices = async (e) => {
        const {value} = e.target
        try {
            const response = await api.get(`/doctors/${value}/services`);
            setServices(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchAppointment = async (id_appointment) => {
        if (currentUrl.includes('/appointment-edit/')) {
            try {
                const response = await api.get(`/appointment/${id_appointment}`);
                const services = await api.get(`/doctors/${response.data.id_doctor}/services`);
                if (response.data) {
                    setAppointment(response.data);
                    setServices(services.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };
    

    const handleSelectedValue = (e) => {
        const {name, value} = e.target;
        setAppointment({...appointment, [name]: value})
        if(name === "id_doctor") fetchServices(e)
    }

    

    useEffect(() => {
        fetchAppointment(currentUrl.match(/\d+/g));
    }, []);
    

  return (
    <>
        <Navbar />
        <div className="container-fluid mt-page">
            <div className="row col-lg-5 offset-lg-4">
                <div className="col-12 mt-2">
                    <h2>{id_appointment ? "Editar agendamento" : "Novo agendamento"}</h2>
                </div>

                <div className="col-12 mt-2">
                    <label htmlFor="id_doctor">Médicos</label>
                    <div className="form-control">
                        <select name="id_doctor" id="id_doctor" 
                        value={appointment.id_doctor?appointment.id_doctor:''} 
                        onChange={handleSelectedValue}>
                            {doc.map((doctor) => (
                            <option key={doctor.id_doctor} value={doctor.id_doctor}>
                                {doctor.name}
                            </option>
                            ))} 
                        </select>
                </div>
                </div>

                <div className="col-12 mt-3">
                    <label htmlFor="id_service">Serviços</label>
                    <div className="form-control">
                        <select name="id_service" id="id_service" 
                        value={appointment.id_service?appointment.id_service:''} 
                        onChange={handleSelectedValue}>
                            {services.map((services) => (
                            <option key={services.id_serice} value={services.id_service}>
                                {services.description}
                            </option>
                            ))} 
                        </select>
                </div>
                </div>

                <div className="col-6 mt-3">
                    <label htmlFor="booking_date">Data</label>
                    <input type="date" id="booking_date" name="booking_date" className="form-control" 
                    min={new Date().toISOString().split('T')[0]} 
                    value={appointment.booking_date?
                    new Date(appointment.booking_date).toISOString().split('T')[0]:''} 
                    onChange={handleSelectedValue}/>

                </div>

                <div className="col-6 mt-3">
                    <label htmlFor="booking_hour">Hora</label>
                        <select name="booking_hour" id="booking_hour" className="form-control mb-3" 
                        value={appointment.booking_hour?appointment.booking_hour.split('h')[0]:''} onChange={handleSelectedValue}>
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
                        <button className="btn btn-primary ms-2" onClick={()=>console.log(appointment)}>
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