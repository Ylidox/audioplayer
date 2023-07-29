import {Routes, Route} from 'react-router-dom';
import Layout from './hoc/Layout';
import './App.css';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './contexts/AuthContext';
import { AudioProvaider } from './contexts/AudioContext';
import Registration from './pages/Registration';
import HomePage from './pages/HomePage';
import AddAudio from './pages/AddAudio';

function App() {
  return (
    <AuthProvider>
      <AudioProvaider>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<HomePage/>}/>
            <Route path='liked' element={<div>Избранное</div>}/>
            <Route path='listen' element={<div>Слушать</div>}/>
            <Route path='lists' element={<div>Плейлисты</div>}/>
            <Route path='add_audio' element={<AddAudio/>}/>
          </Route>
          <Route path='/login'  element={<LoginPage/>}/>
          <Route path='/registration' element={<Registration/>}/>
        </Routes>
      </AudioProvaider>
    </AuthProvider>
  );
}

export default App;
