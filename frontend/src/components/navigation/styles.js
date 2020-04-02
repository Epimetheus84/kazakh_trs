import styled from 'styled-components';

export const Navbar = styled.nav`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    align-items: center;

    background: #F8F8FF;
    color: white;
    width: 100%;
    height: 15vh;
    margin-bottom: 10vh;

    .logo{
        font-size:7vh;
        font-weight: bold;
        text-shadow: 3px 3px 3px #D3D3D3;
    }
    .nav-links{
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-evenly;
        align-items: center;

        width: 35vw;
        list-style: none;
    }
    .link{
        color: white;
        font-size: 2.5vh;
        text-decoration: none;
        text-shadow: 1px 1px 1px #D3D3D3;
    }
`