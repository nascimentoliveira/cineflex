import styled from 'styled-components';
import Seat from './Seat';

export default function Labels() {
  return (
    <StyledLabels data-identifier="seat-selected-subtitle">
      <div>
        <Seat colors={{ background: '#1AAE9E', border: '#0E7D71' }} />
        <span>Selecionado</span>
      </div>
      <div>
        <Seat colors={{ background: '#C3CFD9', border: '#808F9D' }} />
        <span>Disponível</span>
      </div>
      <div>
        <Seat colors={{ background: '#FBE192', border: '#F7C52B' }} />
        <span>Indiponível</span>
      </div>
    </StyledLabels>
  );
}

const StyledLabels = styled.section`
  width: 100%;
  max-width: 490px;
  display: flex;
  justify-content: space-around;
  margin: 16px 0px 41px 0px;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;