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
  }, [idMovie]);

  if (daySections.length === 0) {
    return <Loading />;
  }

  return (
    <StyledMoviePage>
      <section>
        <div>
          <span>Selecione o horário</span>
        </div>
        {daySections.days.map(day =>
          <Day key={day.id}>
            <span data-identifier="session-date">{day.weekday} - {day.date}</span>
            <div>
              {day.showtimes.map(section =>
                <Link to={`/section/${section.id}`} key={section.id}>
                  <button data-identifier="hour-minute-btn">{section.name}</button>
                </Link>
              )}
            </div>
          </Day>
        )}
      </section>
      <footer>
        <img
          data-identifier="movie-img-preview"
          src={daySections.posterURL}
          alt={daySections.title}
        />
        <div>
          <span data-identifier="movie-and-session-infos-preview">
            {daySections.title}
          </span>
        </div>
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

  > section {
    width: 100%;
    padding: 67px 24px 117px 24px;

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

const Day = styled.section`
  width: 100%;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 24px;
  box-sizing: border-box;
  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  padding: 10px;

  > span {
    width: 100%;
    font-size: 20px;
    line-height: 23px;
    color: #293845;
  }

  > div {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    button {
      width: 83px;
      height: 43px;
      font-size: 18px;
      text-align: center;
      line-height: 43px;
      color: #FFFFFF;
      background-color: #E8833A;
      border-radius: 3px;
      margin: 0px 9px 9px 0px;
      border: none;
      outline: none;
      cursor: pointer;

      &:hover {
        transform: scale(1.1);
      }
    }
  }
`;