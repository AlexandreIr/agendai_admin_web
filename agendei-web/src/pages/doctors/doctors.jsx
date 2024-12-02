import { useEffect, useState } from "react";
import api from "../../constants/api";
import Navbar from "../../components/navbar/navbar";
import { useNavigate } from "react-router-dom";

function Doctors() {
    const [doctors, setDoctors] = useState([]);
    const [specialty, setSpecialty] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({});
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const navigate = useNavigate();

    const fetchDoctors = async () => {
        try {
            const response = await api.get("/doctors");
            if (response.data) {
                setDoctors(response.data);
                setFilteredDoctors(response.data);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const OpenNewDoctor = () => {
        navigate('/doctor/add');
    }

    const SelectSpecialty = () => {
        const specialties = [];
        doctors.map(doctor => {
            if(!specialties.includes(doctor.specialty)){
                specialties.push(doctor.specialty);
            }
        })
        setSpecialty(specialties.sort());
    }

    const DefineFilters = (e) =>{
        const {name, value} = e.target;
        setFilters({...filters, [name]: value});
    }

    const HandleFilters = () =>{
        let filtered = [...doctors];
        if(filters.specialty){
            filtered = filtered.filter(doctor => doctor.specialty === filters.specialty);
        }
        if(filters.name){
            filtered = filtered.filter(doctor => doctor.name.toLowerCase().includes(filters.name.toLowerCase()));
        }
        setFilteredDoctors(filtered);
    }

    const HandleDelete = async (id_doctor) =>{
        if(window.confirm('Tem certeza que deseja excluir o médico?')){
            try{
                const response = await api.delete(`/doctors/${id_doctor}`);
                if(response.data){
                    setFilteredDoctors(doctors.filter(doctor => doctor.id_doctor != id_doctor));
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const HandleEdit = (id_doctor) => {
        navigate(`/doctor-edit/${id_doctor}`, {
            state: {
                doctors
            }
        });
    }

    useEffect( () => {
        fetchDoctors();
    }, []);

    useEffect(() => {
        SelectSpecialty();
    }, [loading]);

    return (
        <div className="container-fluid mt-page">
        <Navbar />
        <div className="d-flex justify-content-between align-items-center">
            <div>
                <h2 className="d-inline me-3">Médicos</h2>
                <button className="btn btn-outline-primary" onClick={OpenNewDoctor}>
                    Novo Médico
                </button>
            </div>
            <div className="d-flex align-items-center gap-2">
                <select name="specialty" id="specialty" className="form-select" onChange={DefineFilters}>
                    <option value="">Todas as Especialidades</option>
                    {specialty.map(sp => {
                        return (
                            <option key={sp} value={sp}>{sp}</option>
                        )
                    })}
                </select>
                <input type="text" placeholder="Nome do médico" name="name" className="form-control" onChange={DefineFilters}/>
                <button className="btn btn-primary" onClick={HandleFilters}>Pesquisar</button>
            </div>
        </div>
        <table className="table table-hover mt-4">
            <thead>
                <tr>
                    <th scope="col">Médico</th>
                    <th scope="col">Especialidade</th>
                    <th scope="col" className="col-buttons "></th>
                </tr>
            </thead>
            <tbody>
        {filteredDoctors.map(doctor => {
            return (
            <tr key={doctor.id_doctor}>
                <td>{doctor.name}</td>
                    <td>{doctor.specialty}</td>
                        <td className="col-buttons ps-5 d-flex gap-2 justify-content-end ">
                            <button className="btn btn-primary" onClick={()=>HandleEdit(doctor.id_doctor)}>
                                <i className="bi bi-pencil-square"></i>
                            </button>
                            <button className="btn btn-outline-danger" onClick={() => HandleDelete(doctor.id_doctor)}>
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

export default Doctors;