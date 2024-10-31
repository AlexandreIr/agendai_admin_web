import * as Styled from './styles.js';
import bg from '../../assets/fundo.png';
import logo from '../../assets/logo.png';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import api from '../../constants/api.js';
import { Link, useNavigate } from 'react-router-dom';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [valideEmail, setValidEmail] = useState(true);

    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };
    const handleEmailChange = (e) => { 
        const { value } = e.target; 
        setEmail(value); 
        setValidEmail(validateEmail(value));
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleLogin = async (ev) =>{
        ev.preventDefault();
        try{
            const response = await api.post('/users/login', {
                email,
                password
            });
            if(response.data){
                localStorage.setItem('token', JSON.stringify(response.data.token));
                localStorage.setItem('id_user', JSON.stringify(response.data.id_user));
                navigate('/appointments');
            } 
        } catch (error) {
            console.log(error.message);
        }
    }

    
    return (
        <Styled.Container>
            <Styled.LoginForm>
                <Styled.LogoContainer>
                    <Styled.LogoImage src={logo} alt="banner_login" />
                        <h5>Gerencie seus agendamentos de forma descomplicada.</h5>
                </Styled.LogoContainer>
                    <Styled.Login>
                    <h2>Acesse sua conta</h2>
                        <div>
                            <Styled.Input type="email" placeholder="Email" 
                            onChange={handleEmailChange}
                            value={email}
                            style={{ borderColor: valideEmail ? '' : 'red', borderWidth:'1px', borderStyle:valideEmail?'hidden':'solid' }}
                            />
                            {!valideEmail && <p style={{ color: 'red' }} >
                                E-mail inválido
                            </p>}
                        </div>
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}> 
                            <Styled.Input type={showPassword ? 'text' : 'password'} placeholder="Senha" 
                            onChange={(e) => setPassword(e.target.value)} value={password} 
                            /> 
                            <span onClick={handleShowPassword} 
                            style={{ position: 'absolute', right: '10px', cursor: 'pointer', }} > 
                            {!showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />} 
                            </span>
                        </div>
                        <Styled.Button type="submit" onClick={handleLogin}>Entrar</Styled.Button>
                    </Styled.Login>
                <p>Não tem conta? <Link to="/register">Criar conta</Link></p>
            </Styled.LoginForm>
            <Styled.ContainerImage>
                <Styled.SideImage src={bg} alt="banner_login" />
            </Styled.ContainerImage>
        </Styled.Container>
        )
}

export default Login