import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Loading from './Loading';
import Seat from './Seat';
import Labels from './Labels';
import Form from './Form';

export default function Section() {
  const { idSection } = useParams();
  const [movieSection, setMovieSection] = useState([]);
  const [seatsStatus, setSeatsStatus] = useState({});
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  let seatsStatusTemp = {};

  useEffect(() => {
    const request = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSection}/seats`);

    request.then(response => {
      setMovieSection(response.data);
      response.data.seats.forEach(seat => {
        seatsStatusTemp[seat.id] = (seat.isAvailable ? 'not selected' : 'unavailable')
      });
      setSeatsStatus(seatsStatusTemp);
    });

    request.catch(error => {
      console.log(error.response.data);
    });
  }, [idSection]);

  if (movieSection.length === 0) {
    return <Loading />;
  }

  function sendForm(e, selecteds, buyers) {
    e.preventDefault();

    const request = axios.post('https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many', {
      ids: selecteds,
      compradores: { buyers }
    })

    request.then(response => {
      navigate('/success', {
        state: {
          buyers: buyers,
          movie: movieSection.movie.title,
          date: movieSection.day.date,
          hour: movieSection.name
        }
      });
    });

    request.catch(error => {
      alert('Ocoreu um erro, tente novamente!');
      console.log(error.response.data);
    });
  }

  function setColors(seatStatus) {
    if (seatStatus === 'unavailable')
      return { background: '#FBE192', border: '#F7C52B' };
    else if (seatStatus === 'selected')
      return { background: '#1AAE9E', border: '#0E7D71' };
    else
      return { background: '#C3CFD9', border: '#808F9D' };
  }

  function handleClick(id, name) {
    if (seatsStatus[id] === 'selected') {
      if (window.confirm(`Deseja excluir a compra do assento ${name}. Os dados do comprador serão apagados.`)) {
        setSeatsStatus({ ...seatsStatus, [id]: 'not selected' });
      }
    }
    else
      setSeatsStatus({ ...seatsStatus, [id]: 'selected' });

    if (!form[id])
      setForm({ ...form, [id]: { idAssento: id, nome: '', cpf: '', nSeat: name } });
  }

  function cpf(value) {
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return value;
  }

  function handleForm(e, id) {
    if (e.target.name === 'cpf' && e.target.value.length < 15)
      setForm({ ...form, [id]: { ...form[id], [e.target.name]: cpf(e.target.value.trim()) } })
    if (e.target.name === 'nome' && e.target.value.trim().length > 0)
      setForm({ ...form, [id]: { ...form[id], [e.target.name]: e.target.value } })
  }

  return (
    <StyledSectionPage>
      <section>
        <div>
          <span>Selecione o(s) assento(s)</span>
        </div>
        <ul>
          {movieSection.seats.map(seat =>
            <Seat
              key={seat.id}
              id={seat.id}
              colors={setColors(seatsStatus[seat.id])}
              name={seat.name}
              handleClick={seatsStatus[seat.id] !== 'unavailable' ? handleClick : ''}
            />
          )}
        </ul>
        <Labels />
        <Form
          seats={movieSection.seats}
          handleForm={handleForm}
          form={form}
          seatsStatus={seatsStatus}
          sendForm={sendForm}
        />
      </section>
      <footer>
        <img src={movieSection.movie.posterURL} alt={movieSection.movie.title} />
        <div>
          <span>{movieSection.movie.title}</span>
          <span>{movieSection.day.date} - {movieSection.day.weekday} - {movieSection.name}</span>
        </div>
      </footer>
    </StyledSectionPage>
  );
}

const StyledSectionPage = styled.main`
	width: 100%;
	min-height: 100vh;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  display: flex;
  justify-content: center;
  transition: 1s;

  > section {
    width: 100%;
    padding: 67px 24px 117px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;

    > div {
      height: 110px;
      display: flex;
      justify-content: center;
      align-items: center;

      > span {
        font-size: 24px;
        line-height: 30px;
        color: #293845;
        text-align: center;
      }
    }

    > ul {
      width: 100%;
      max-width: 490px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  footer {
    width: 100%;
    height: 117px;
    position: fixed;
    left: 0px;
    bottom: 0px;
    background-color: #DFE6ED;
    border: 1px solid #9EADBA;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px -2px 4px 2px rgba(0, 0, 0, 0.1);
    z-index: 3;

    img {
      width: 64px;
      height: 89px;
      background-color: #FFFFFF;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
      border-radius: 2px;
      padding: 9px;
    }

    > div {
        display: flex;
        flex-direction: column;
        margin-left: 14px;

        span {
          font-size: 26px;
          line-height: 30px;
          color: #293845;
      }
    }
  }
`;
