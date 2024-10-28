import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
`

export const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: .5rem;
    height: 100vh;
    width: 100vw;
    position: relative;
    >p {
        position: absolute;
        bottom: 2rem;
    }
`

export const SideImage = styled.img`
    height: 100vh;
    width: 100vw;
`

export const LogoImage = styled.img`
    height: auto;
    width: 15rem;
    position: absolute;
    top: 2rem;
`