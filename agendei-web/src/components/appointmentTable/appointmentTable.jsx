/* eslint-disable react/prop-types */

function AppointmentTable(props) { 

    return (
            <tr key={props.id_appointment}>
                <td>{props.user}</td>
                <td>{props.doctor}</td>
                <td>{props.service}</td>
                <td>
                    {Intl.DateTimeFormat('pt-BR').format(new Date(props.booking_date))} - {props.booking_hour}
                </td>
                <td className="text-end">
                    {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.price)}
                </td>
                <td className="col-buttons ps-5 d-flex gap-2 justify-content-end ">
                    <button className="btn btn-primary" onClick={() => props.editAppointment(props.id_appointment)}>
                        <i className="bi bi-pencil-square"></i>
                    </button>
                    <button className="btn btn-outline-danger" onClick={() => props.deleteAppointment(props.id_appointment)}>
                        <i className="bi bi-trash3"></i>
                    </button>
                            </td>
            </tr>
    );
}

export default AppointmentTable;
