import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Loading from './Loading';

export default function Movie() {
	const { idMovie } = useParams();
	const [daySections, setDaySections] = useState([]);

  useEffect(() => {
    const request = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idMovie}/showtimes`);

    request.then(response => {
      setDaySections(response.data);
    });

    request.catch(error => {
      console.log(error.response.data);
    });
  }, []);

  if (daySections.length === 0) {
    return <Loading />;
  }

  return (
		<StyledMoviePage>
      <header>
        <h1>CINEFLEX</h1>
      </header>
      <section>
        <h1>Selecione o horário</h1>
          {daySections.days.map(day =>
            <Day key={day.id}>
              <span>{day.weekday} - {day.date}</span>
              <ul>
                {day.showtimes.map(section =>
                  <Link to={`/section/${section.id}`} key={section.id}>
                    <li>{section.name}</li>
                  </Link>
                )}
              </ul>
            </Day>
          )}
      </section>
      <footer>
        <img src={daySections.posterURL} alt={daySections.title} />
        <h1>{daySections.title}</h1>
      </footer>
    </StyledMoviePage>
  );
}

const StyledMoviePage = styled.main`
	width: 100%;
	min-height: 100vh;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 1s;

  header {
    width: 100%;
    height: 67px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #C3CFD9;
    position: fixed;
    top: 0;
    left: 0;

    h1 {
      font-size: 34px;
      line-height: 40px;
      color: #E8833A;
      text-shadow: 1px 1px 2px #000000;
    }
  }

  section {
    width: 100%;
    padding: 67px 24px 117px 24px;

    h1 {
      height: 110px;
      font-size: 24px;
      line-height: 110px;
      color: #293845;
      text-align: center;
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
    justify-content: space-evenly;

    img {
      width: 64px;
      height: 89px;
      background-color: #FFFFFF;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
      border-radius: 2px;
      padding: 9px;
    }
  }

`;

const Day = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 24px;
  box-sizing: border-box;

  span {
    font-size: 20px;
    width: 100%;
    line-height: 23px;
    color: #293845;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    li {
      width: 83px;
      height: 43px;
      font-size: 18px;
      text-align: center;
      line-height: 43px;
      color: #FFFFFF;
      background-color: #E8833A;
      border-radius: 3px;
      margin: 0px 9px;
    }
  }
`;