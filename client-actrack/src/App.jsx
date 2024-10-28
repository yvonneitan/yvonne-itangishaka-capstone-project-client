import './App.scss';
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ListsPage from './pages/ListsPage/ListsPage';
import CompletedPage from './pages/CompletedPage/CompletedPage';
import LoginPage from './pages/LoginPage/LoginPage';
import React, {useRef} from "react";
import ShowRightSideContainer from './components/ShowRightSideContainer/ShowRightSideContainer';


function App() {
  const backgroundRef = useRef(null);
  return (
    <BrowserRouter>
      <Header targetRef={backgroundRef}/>
        <div className='containers'ref={backgroundRef} style={{ backgroundColor: '#e9e9e9', height: '100vh', padding: 0 }}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/lists" element={<ListsPage />} /> 
          <Route path="/completed" element={<CompletedPage />} />
        </Routes>
        <ShowRightSideContainer/>
        </div>
    </BrowserRouter>
  );
}


export default App;
