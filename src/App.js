import logo from './logo.svg';
import './App.css';
import Register from './components/register';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom'

function App() {
  return (
 <>
   <BrowserRouter>
  
        <Routes>
       
          <Route path='/register' element={<Register />} />
     
        </Routes>
      
      </BrowserRouter>
 
 </>
  );
}

export default App;
