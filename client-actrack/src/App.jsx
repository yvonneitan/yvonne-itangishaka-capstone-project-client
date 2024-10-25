import './App.scss';
import Header from "./components/Header/Header";
import ListsContainer from './components/ListsContainer/ListsContainer';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ListsPage from './pages/ListsPage/ListsPage';
import CompletedPage from './pages/CompletedPage/CompletedPage';
import LoginPage from './pages/LoginPage/LoginPage';
// import GreetingsContainer from './components/GreetingsContainer/GreetingsContainer';
// import MiddleContainer from './components/MiddleContainer/MiddleContainer';
// import RightSideContainer from './components/RightSideContainer/RightSideContainer';
import ShowRightSideContainer from './components/ShowRightSideContainer/ShowRightSideContainer';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className='containers'>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<><ListsContainer/><HomePage /></>} />
          <Route path="/lists" element={<ListsPage />} /> 
          <Route path="/completed" element={<CompletedPage />} />
        </Routes>
      <ShowRightSideContainer/>
      </div>
    </BrowserRouter>
  );
}


export default App;
