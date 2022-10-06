import styled from 'styled-components';

export default function Loading() {
  return (
    <StyledLoadingPage>
      <h1>CINEFLEX</h1>
      <h2>Carregando...</h2>
    </StyledLoadingPage>
  );
}

const StyledLoadingPage = styled.main`
	width: 100%;
	min-height: 100vh;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
	background-color: #C3CFD9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 1s;

  h1 {
    font-size: 70px;
    line-height: 80px;
    color: #E8833A;
    text-shadow: 1px 1px 2px #000000;
  }
  
  h2 {
    font-size: 15px;
    line-height: 35px;
    color: #303030;
  }
`;