import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Workouts from './pages/Workouts';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <div style={{ display: 'flex ' }}>
          <Sidebar />

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
