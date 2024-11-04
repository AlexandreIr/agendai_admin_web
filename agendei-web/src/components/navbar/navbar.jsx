import { Link, useNavigate } from "react-router-dom"
import logo from '../../assets/logo-white.png'

function Navbar() {

    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('id_admin')
        navigate('/')
    }

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
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link active" to="/appointments" >Agendamentos</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to="/doctors">Médicos</Link>
                    </li>
                </ul>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <div className="btn-group">
                            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                Alexandre Fernandes da Silva
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