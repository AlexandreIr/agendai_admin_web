import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import { useState } from "react";
import api from "../../constants/api";

function DoctorsAdd() {
    const [isVisible, setIsvisible] = useState(false);
    const [doctorInfo, setDocotorInfo] = useState({
        icon:'male'
    });

    const navigation = useNavigate();

    const {id_doctor} = useParams();

    const handleDocotorInfo = (e) => {
        const {name, value} = e.target;
        setDocotorInfo({...doctorInfo, [name]: value.trim()});
    }

    const handleDoctorCreation = async (e) => {
        e.preventDefault();
        try{
            console.log(doctorInfo);
            const response = await api.post('/doctors', doctorInfo);
            if(response.data){
                console.log(response.data);
                alert('Médico cadastrado com sucesso');
            }
            navigation('/doctors');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Navbar />
            <div className="container-fluid mt-page">
                <div  className="row col-lg-5 offset-lg-4">
                    <div className="col-12 mt-2">
                        <h2>{id_doctor ? "Editar médico" : "Novo médico"}</h2>
                    </div>
                    <div className="col-12 position-relative">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Nome</label>
                                <input type="text" className="form-control" id="name" name="name" aria-describedby="name" onChange={handleDocotorInfo} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="speciality" className="form-label">Especialidade</label>
                                <input type="text" className="form-control" id="speciality" name = "speciality" aria-describedby="specialty" onChange={handleDocotorInfo}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="icon" className="form-label">Gênero</label>
                                <select name="icon" id="icon" className="form-control" onChange={handleDocotorInfo}>
                                    <option value="male">Masculino</option>
                                    <option value="female">Feminino</option>
                                </select>
                            </div>
                            <div className="mb-3 position-absolute end-0">
                                <button className="btn btn-primary" onClick={() => setIsvisible(!isVisible)} type="button">Cadastrar serviços</button>
                                {isVisible && (
                                    <form action="">
                                        <div className="mb-3">
                                            <label htmlFor="service" className="form-label">Serviço</label>
                                            <input type="text" className="form-control" id="service" name="service" aria-describedby="service" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="service" className="form-label">Preço</label>
                                            <input type="text" className="form-control" id="price" name="price" aria-describedby="price" />
                                        </div>
                                    </form>
                                )}
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={handleDoctorCreation}>Cadastrar médico</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DoctorsAdd;