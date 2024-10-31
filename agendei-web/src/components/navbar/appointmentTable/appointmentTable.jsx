/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";

function AppointmentTable({ appointments = [] }) { 
    const navigate = useNavigate();
    const editAppointment = (id) => {
        navigate(`/appointment-edit/${id}`);
    }

    const deleteAppointment = (id) => {
        alert(id);
    }

    return (
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
                    {appointments.map((appointment) => (
                        <tr key={appointment.id_appointment}>
                            <td>{appointment.user}</td>
                            <td>{appointment.doctor}</td>
                            <td>{appointment.service}</td>
                            <td>
                                {Intl.DateTimeFormat('pt-BR').format(new Date(appointment.booking_date))} - {appointment.booking_hour}
                            </td>
                            <td className="text-end">
                                {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(appointment.price)}
                            </td>
                            <td className="col-buttons ps-5 d-flex gap-2 justify-content-end ">
                                <button className="btn btn-primary" onClick={() => editAppointment(appointment.id_appointment)}>
                                    <i className="bi bi-pencil-square"></i>
                                </button>
                                <button className="btn btn-danger" onClick={() => deleteAppointment(appointment.id_appointment)}>
                                    <i className="bi bi-trash3"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AppointmentTable;
