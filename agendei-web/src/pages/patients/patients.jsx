import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar"
import api from "../../constants/api";

function Patients() {

    const [patients, setPatients] = useState([]);

    const fetchPatients = async() =>{
        try {
            const response = await api.get('/admin/users');
            setPatients(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPatients();
    }, []);

  return (
    <div className="container-fluid mt-page">
        <Navbar />
        <div className="d-flex justify-content-between align-items-center">
            <div>
                <h2 className="d-inline me-3">Médicos</h2>
                <button className="btn btn-outline-primary" >
                    Novo paciente
                </button>
            </div>
        </div>
        <table className="table table-hover mt-4">
            <thead>
                <tr>
                    <th scope="col">Paciente</th>
                    <th scope="col" className="col-buttons "></th>
                </tr>
            </thead>
            <tbody>
        {patients.map(patient => {
            return (
            <tr key={patient.id_doctor}>
                <td>{patient.name}</td>
                    <td>{patient.specialty}</td>
                        <td className="col-buttons ps-5 d-flex gap-2 justify-content-end ">
                            <button className="btn btn-primary">
                                <i className="bi bi-pencil-square"></i>
                            </button>
                            <button className="btn btn-outline-danger">
                                <i className="bi bi-trash3"></i>
                            </button>
                        </td>
                    </tr>
            )
        })}
        </tbody>
        </table>
        </div>
  )
}

export default Patients