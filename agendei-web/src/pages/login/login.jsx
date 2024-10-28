import * as Styled from './styles.js';
import bg from '../../assets/fundo.png';
import logo from '../../assets/logo.png';
function Login() {
    return (
        <Styled.Container>
            <Styled.LoginForm>
                <Styled.LogoImage src={logo} alt="banner_login" />
                    <h1>Login</h1>
                    <input type="text" placeholder="Email" />
                    <input type="password" placeholder="Senha" />
                    <button type="submit">Entrar</button>
                <p>Não tem conta? <a href="/register">Criar conta</a></p>
            </Styled.LoginForm>
            <Styled.SideImage src={bg} alt="banner_login" />
        </Styled.Container>
        )
}

export default Login