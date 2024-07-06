import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './components/Register';
import Home from './components/Home';
import Login from './components/Login';
import Songs from './components/Songs';
import Lyrics from './components/Lyrics';
import CreateSong from './components/CreateSong';
import Protected from './components/Protected';
import Chat from './components/Chat';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register-email" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/songs" element={<Protected Component={Songs }/>}/>
          <Route path="/songs/:id" element={<Protected Component={Lyrics }/>} />
          <Route path="/songs/new" element={<Protected Component={CreateSong }/>} />
          <Route path="/chats" element={<Protected Component={Chat }/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
