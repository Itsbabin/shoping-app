import './App.css';
import Nav from './component/Nav';
import Home from './component/Home';
import {
  Route, Routes,
  BrowserRouter as Router
} from 'react-router-dom';
import Login from './component/Login';
import Addnote from './component/Addnote';
import NoteState from './Notestate';
function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Nav />
          <Routes>
            <Route path='/' element={<h3>this is notepad</h3>} />
            <Route path='/home' element={<Home />} />
            <Route path='/addnote' element={<Addnote />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
