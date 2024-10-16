import './App.scss'
import Header from "./components/Header/Header"
import ListsContainer from './components/ListsContainer/ListsContainer'
import {BrowseRoute,Link} from 'react-dom';

function App() {
  return (
    <>
     <Header/>
     <ListsContainer/>
    </>
  )
}

export default App
