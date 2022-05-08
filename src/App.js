import logo from './logo.svg';
import './App.css';
import Register from './components/register';
import Login from './components/login';
import Home from './components/home'
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom'

function App() {
  return (
 <>
   <BrowserRouter>
  
        <Routes>
        <Route path='/home' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login/>} />
        </Routes>
      
      </BrowserRouter>
 
 </>
  );
}

export default App;
