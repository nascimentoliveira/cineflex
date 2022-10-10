import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

export default function Success() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <StyledSuccessPage>
      <Status>
        <span>Pedido feito com sucesso!</span>
      </Status>
      <div>
        <h1>Filme e sessão</h1>
        <h2 data-identifier="movie-session-infos-reserve-finished">
          {location.state.movie}
        </h2>
        <h2 data-identifier="movie-session-infos-reserve-finished">
          {location.state.date} - {location.state.hour}
        </h2>
      </div>
      <div>
        <h1>Ingressos</h1>
        <ul>
          {location.state.buyers.map(seat =>
            <li key={seat.idAssento}>
              <h2 data-identifier="seat-infos-reserve-finished">
                Assento {seat.nSeat}
              </h2>
              <h1>Comprador</h1>
              <h2 data-identifier="buyer-infos-reserve-finished">
                Nome: {seat.nome.trim()}
              </h2>
              <h2 data-identifier="buyer-infos-reserve-finished">
                CPF {seat.cpf}
              </h2>
            </li>
          )}
        </ul>
      </div>
      <button
        data-identifier="back-to-home-btn"
        type='submit'
        onClick={() => navigate('/')}
      >
        Voltar para Home
      </button>
    </StyledSuccessPage>
  );
}

const StyledSuccessPage = styled.main`
  width: 100%;
	min-height: 100vh;
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 67px 24px 0px 24px;
  transition: 1s;

  div {
    width: 100%;
    margin: 10px 0px;

    h1 {
      margin: 2px 0px;
      font-weight: 700;
      font-size: 24px;
      line-height: 28px;
      color: #293845;
    }

    h2 {
      margin: 2px 0px;
      font-weight: 400;
      font-size: 22px;
      line-height: 26px;
      color: #293845;
    }

    ul {
      margin: 15px 0px;

      li {
        margin: 20px 0px;
      }
    }
  }

  button {
    width: 225px;
    height: 42px;
    background-color: #E8833A;
    border-radius: 3px;
    border: none;
    outline: none;
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    color: #FFFFFF;

  }
`;

const Status = styled.section`
  width: 100%;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
    
  span {
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    color: #247A6B; 
  }
`;