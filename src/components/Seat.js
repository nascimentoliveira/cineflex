import styled from 'styled-components';
import seatIcon from '../assets/images/seat.svg';

export default function Seat({ id, colors, name, handleClick }) {
  return (
    <SeatStyled 
      color={colors}
      clickable={(handleClick)}
      onClick={() => handleClick ? handleClick(id, name) : ''}
    >
      <img src={seatIcon} alt={`Poltrona ${name}`} />
      <div>
        <span>{name}</span>
      </div>
    </SeatStyled>
  );
}

const SeatStyled = styled.li`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2px;
  color: #000000;
  background-color: ${props => props.color.background};
  border: 1px solid ${props => props.color.border};
  border-radius: 18px;
  position: relative;

  &:hover {
    cursor: ${props => props.clickable ? 'pointer': 'default'};
  }

  img {
    width: 35px;
    height: 35px;
  }

  div {
    width: 15px;
    height: 16px;
    position: absolute;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 13px;
    top: 6px;

    span {
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 11px;
      line-height: 13px;

      &:hover {
        cursor: default;
      }
    }
  }
`;