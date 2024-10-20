import './App.scss'
import Header from "./components/Header/Header"
import ListsContainer from './components/ListsContainer/ListsContainer'
import { BrowserRouter, Routes, Route } from'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ListsPage from './pages/ListsPage/ListsPage';
import CompletedPage from'./pages/CompletedPage/CompletedPage';
import LoginPage from './pages/LoginPage/LoginPage';
import GreetingsContainer from './components/GreetingsContainer/GreetingsContainer';
import MiddleContainer from './components/MiddleContainer/MiddleContainer';
import RightSideContainer from './components/RightSideContainer/RightSideContainer';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className='containers'>
      <ListsContainer/> 
      {/* <GreetingsContainer/> */}
      <MiddleContainer/>
      {/* <RightSideContainer/> */}
      </div>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/lists" element={<ListsPage />} />
      <Route path="/completed" element={<CompletedPage />} />
      <Route path="/login" element={<LoginPage />} />
     </Routes>
     </BrowserRouter>
  )
}

export default App
