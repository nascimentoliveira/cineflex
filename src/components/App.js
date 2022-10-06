import GlobalStyle from '../theme/globalStyles'
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