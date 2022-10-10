import GlobalStyle from '../theme/globalStyles';
import styled from 'styled-components';
import MainPage from './MainPage';
import Movie from './Movie';
import Section from './Section';
import Success from './Success';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Top>
          <span>CINEFLEX</span>
        </Top>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/movie/:idMovie' element={<Movie />} />
          <Route path='/section/:idSection' element={<Section />} />
          <Route path='/success' element={<Success />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

const Top = styled.header`
  width: 100%;
  height: 67px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #C3CFD9;
  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;

  span {
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    line-height: 40px;
    color: #E8833A;
    text-shadow: 1px 1px 2px #000000;
  }
`;