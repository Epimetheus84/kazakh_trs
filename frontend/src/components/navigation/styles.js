import styled from 'styled-components';

export const Navbar = styled.nav`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    align-items: center;

    background: #F8F8FF;
    color: #90d2c6;
    width: 100%;
    height: 15vh;
    margin-bottom: 10vh;
    
    .nav-links{
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-evenly;
        align-items: center;

        width: 35vw;
        list-style: none;
    }
    .link{
        color: #90d2c6;
        font-size: 2.5vh;
        text-decoration: none;
        text-shadow: 1px 1px 1px #D3D3D3;
    }
`;