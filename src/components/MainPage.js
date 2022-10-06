import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Loading from './Loading';

export default function MainPage() {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const request = axios.get('https://mock-api.driven.com.br/api/v5/cineflex/movies');

    request.then(response => {
      setMovies(response.data);
    });

    request.catch(error => {
      console.log(error.response.data);
    });
  }, []);

  if (movies.length === 0) {
    return <Loading />;
  }

  return (
    <StyledMainPage>
      <header>
        <h1>CINEFLEX</h1>
      </header>
      <section>
        <h1>Selecione o filme</h1>
        <ul>
          {movies.map(movie =>
            <Link to={`/movie/${movie.id}`} key={movie.id}>
              <li title={movie.title}>
                <img src={movie.posterURL} alt={movie.title} />
              </li>
            </Link>
          )}
        </ul>
      </section>
    </StyledMainPage>
  );
}

const StyledMainPage = styled.main`
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
    background-color: #FFFFFF;
    padding: 67px 0px 100px 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: 1s;

    h1 {
      height: 110px;
      font-size: 24px;
      line-height: 110px;
      color: #293845;
      text-align: center;
    }

    ul {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      
      li {
        width: 145px;
        height: 209px;
        box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
        border-radius: 3px;
        margin: 11px 30px 0px 0px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        
        img {
          width: 129px;
          height: 193px;
        }
      }
    }
  }
`;
