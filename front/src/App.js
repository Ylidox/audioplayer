import {Routes, Route} from 'react-router-dom';
import Layout from './hoc/Layout';
import './App.css';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './contexts/AuthContext';
import { AudioProvaider } from './contexts/AudioContext';
import { VolumeProvaider } from './contexts/VolumeContext';
import {Registration} from './pages/Registration';
import HomePage from './pages/HomePage';
import AddAudio from './pages/AddAudio';
import { LikedMusik } from './pages/LikedMusik';
import { ChangeAudio } from './pages/ChangeAudio';

function App() {
  return (
    <AuthProvider>
      <AudioProvaider>
        <VolumeProvaider>
          <Routes>
            <Route path='/' element={<Layout/>}>
              <Route index element={<HomePage/>}/>
              <Route path='liked' element={<LikedMusik/>}/>
              <Route path='listen' element={<div>Слушать</div>}/>
              <Route path='lists' element={<div>Плейлисты</div>}/>
              <Route path='add_audio' element={<AddAudio/>}/>
              <Route path='change_audio' element={<ChangeAudio/>}/>
            </Route>
            <Route path='/login'  element={<LoginPage/>}/>
            <Route path='/registration' element={<Registration/>}/>
          </Routes>
        </VolumeProvaider>
      </AudioProvaider>
    </AuthProvider>
  );
}

export default App;
