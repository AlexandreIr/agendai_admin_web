import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import * as Styled from './styles.js';
import bg from '../../assets/fundo.png';
import logo from '../../assets/logo.png';
import { Link, useNavigate } from "react-router-dom";
import api from "../../constants/api.js";


function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validEmail, setValidEmail] = useState(true);

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

const handleRegister = async (ev) => {
    ev.preventDefault();
    try{
        if(password !== confirmPassword){
            alert('As senhas devem ser iguais');
        }
        const response = await api.post('/admin/register', {
            name,
            email,
            password
        });
        if(response.data.token){
            localStorage.setItem('token', JSON.stringify(response.data.token));
            localStorage.setItem('id_admin', JSON.stringify(response.data.id_admin));
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
                        <h5>Crie sua conta agora mesmo</h5>
                </Styled.LogoContainer>
                    <Styled.Login>
                    <h2>Preencha os campos abaixo</h2>
                        <div>
                            <Styled.Input type="text" placeholder="Nome" 
                            onChange={(e) => setName(e.target.value)} value={name} />

                            <Styled.Input type="email" placeholder="Email" 
                            onChange={handleEmailChange}
                            value={email}
                            style={{ borderColor: validEmail ? '' : 'red', borderWidth:'1px', borderStyle:validEmail?'hidden':'solid' }}
                            />
                            {!validEmail && <p style={{ color: 'red' }}>E-mail inválido</p>}
                        </div>
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}> 
                            <Styled.Input type={showPassword ? 'text' : 'password'} placeholder="Senha" 
                            onChange={(e) => setPassword(e.target.value)} value={password} 
                            /> 
                            <span onClick={handleShowPassword} 
                            style={{ position: 'absolute', right: '1rem', top:'50%', transform: 'translateY(-50%)', cursor: 'pointer'}} > 
                            {!showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />} 
                            </span>
                        </div>
                            <Styled.Input type={showPassword ? 'text' : 'password'} placeholder="Confirme sua senha" 
                            onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} 
                            />
                            {password !== confirmPassword && <p style={{ color: 'red' }}>As senhas devem ser iguais</p>}
                        <Styled.Button type="submit" onClick={handleRegister}>Criar conta</Styled.Button>
                    </Styled.Login>
                <p>Já tem conta? <Link to="/">Fazer login</Link></p>
            </Styled.LoginForm>
            <Styled.ContainerImage>
                <Styled.SideImage src={bg} alt="banner_login" />
            </Styled.ContainerImage>
        </Styled.Container>
  )
}

export default Register