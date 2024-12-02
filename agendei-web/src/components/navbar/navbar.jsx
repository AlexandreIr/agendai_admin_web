import { Link, useLocation, useNavigate } from "react-router-dom"
import logo from '../../assets/logo-white.png'
import { useEffect, useState } from "react";

function Navbar() {
    const [active, setActive] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('id_admin')
        navigate('/')
    }

    const handleActive = () =>{
        const pathName = location.pathname;
        setActive(pathName);
    }

    useEffect(() => {
        handleActive();
    }, []);
    

  return (
    <nav className="navbar fixed-top navbar-expand-lg bg-primary " data-bs-theme="dark">
        <div className="container-fluid">
            <Link className="navbar-brand" aria-current="page" to="/appointments">
                <img src={logo} alt="logo" width="auto" height="35" className="navbar-logo"/>
            </Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSuportedContent" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon "></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSuportedContent">
                <ul className="navbar-nav nav-pills me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className={`nav-link ${active==='/appointments'?'active':''}`} to="/appointments" onClick={()=>handleActive('tab1')}>Agendamentos</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${active==='/doctors'?'active':''}`} to="/doctors" onClick={()=>handleActive('tab2')}>Médicos</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${active==='/patients'?'active':''}`} to="/patients" onClick={()=>handleActive('tab3')}>Pacientes</Link>
                    </li>
                </ul>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <div className="btn-group">
                            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                {localStorage.getItem('name')}
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><Link className="dropdown-item" to="/profile">Meu Perfil</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><button className="dropdown-item" onClick={logout}>Sair</button></li>
                            </ul>

                        </div>
                    </li>

                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar