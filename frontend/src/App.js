
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './Components/Dashboard/Sidebar'
import { AuthProvider } from './Components/Auth/Auth';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Dashboard from './Components/Dashboard';
import { RequireAuth } from './Components/Auth/RequireAuth';
import PageNotFound from './Components/PageNotFound';

function App() {
  
  return (

    <div>
      <AuthProvider>
      <Routes>
          <Route path='*' element={<PageNotFound/>}/>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/dashboard' element={<RequireAuth><Sidebar ><Dashboard/></Sidebar> </RequireAuth>}/>
        
        
      </Routes>
      </AuthProvider>
      
    </div>
  );
}

export default App;
