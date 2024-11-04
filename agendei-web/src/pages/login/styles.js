import styled from "styled-components";
import { COLORS } from "../../constants/theme";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    height: 100vh;
    width: 100vw;
    gap: 1rem;
    padding-left: 1rem;
    overflow: hidden;
    @media( max-width: 650px ) {
        justify-content: center;
        align-items: center;
        padding-left: 0;
        padding: 1rem;
    }
`

export const LoginForm = styled.form`
    display: flex;
    flex:1;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    height: 100vh;
    width: 100vw;
    margin-top: .5rem;
`
export const Login = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    >h2 {
        text-align: center;
    }
`

export const Input = styled.input`
    width: 20rem;
    height: 2.5rem;
    border-radius: .5rem;
    border: none;
    padding: 0 1rem;
    outline: none;
    background-color: ${COLORS.white};
`

export const Button = styled.button`
    margin-top: 1rem;
    width: 20rem;
    height: 2.5rem;
    border-radius: .5rem;
    border: none;
    padding: 0 1rem;
    outline: none;
    background-color: ${COLORS.blue};
    color: ${COLORS.white};
    transition: 500ms;
    &:hover {
        cursor: pointer;
        transform: scale(1.05);
    }
`

export const ContainerImage = styled.div`
    width: 100vw;
    height: 100vh;
    flex:2;
    overflow: hidden;
    @media( max-width: 650px ) {
        display: none;
    }
`

export const SideImage = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
    max-width: 100%;
    min-width: 100%;
`
export const LogoContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    gap: 1rem;
`

export const LogoImage = styled.img`
    height: auto;
    width: 10rem;
`