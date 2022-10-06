import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function MainPage() {
  return (
    <StyledMainPage>
      <div>
        <ion-icon name="film-outline"></ion-icon>
        <h1>CINEFLEX</h1>
      </div>
    </StyledMainPage>
  );
}

const StyledMainPage = styled.main`
	width: 100vw;
	min-height: 100vh;
	background-color: #C3CFD9;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 1s;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    text-shadow: 1px 1px 2px #000000;

    ion-icon {
      font-size: 70px;
      color: #E8833A;
      filter: drop-shadow(1px 1px 2px #000000);
    }

    h1 {
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 70px;
      line-height: 40px;
      color: #E8833A;
    }
  }
`;
