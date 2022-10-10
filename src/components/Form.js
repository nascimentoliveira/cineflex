import styled from 'styled-components';

export default function Form({ seats, handleForm, form, seatsStatus, sendForm }) {
  const selecteds = seats.filter(seat => (seatsStatus[seat.id] === 'selected')).map(seat => seat.id);
  const buyers = Object.keys(form).filter(seat => (selecteds.includes(Number(seat)))).map(seat => form[seat])

  return (
    <StyledForm onSubmit={e => sendForm(e, selecteds, buyers)}>
      {seats.map(seat =>
      (seatsStatus[seat.id] === 'selected' ?
        <div key={seat.id}>
          <label htmlFor='name'>Nome do comprador do assento {seat.name}:</label>
          <input 
            type='text' 
            name='nome' 
            onChange={e => handleForm(e, seat.id)} 
            value={form[seat.id].nome}
            placeholder='Digite o nome...'
            required 
          />
          <label htmlFor='CPF'>CPF do comprador do assento {seat.name}:</label>
          <input 
            type='text' 
            name='cpf' 
            onChange={e => handleForm(e, seat.id)} 
            value={form[seat.id].cpf}
            placeholder='Digite o CPF...' 
            required 
          />
        </div>
        : ''
      )
      )}
      {(selecteds.length > 0 ?
        <button type='submit'>Reservar assento(s)</button>
        : '')}
    </StyledForm>
  );
}

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  
  div {
    width: 100%;
    max-width: 490px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    padding: 10px;
    margin-bottom: 20px;

    label {
      width: 100%;
      max-width: 490px;
      font-weight: 400;
      font-size: 18px;
      line-height: 21px;
      color: #293845;
    }

    input {
      width: 100%;
      max-width: 490px;
      height: 51px;
      background-color: #FFFFFF;
      border: 1px solid #D5D5D5;
      outline: none;
      border-radius: 3px;
      margin-bottom: 7px;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 18px;
      line-height: 21px;
      color: #AFAFAF;

      &::placeholder {
        font-family: 'Roboto', sans-serif;
        font-style: italic;
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        color: #AFAFAF;
      }
    }
  }

  button {
    width: 225px;
    height: 42px;
    margin: 57px 0px 30px 0px;
    background-color: #E8833A;
    border-radius: 3px;
    border: none;
    outline: none;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    color: #FFFFFF;
  }
`;