import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import BackgroundEffects from './components/BackgroundEffects';
import Dashboard from './pages/Dashboard';
import Workouts from './pages/Workouts';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <div className="swim-app-layout">
          <Sidebar />

          <BackgroundEffects />

          <main className="swim-main-viewport">
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/workouts' element={<Workouts />} />
              <Route path='*' element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App;
