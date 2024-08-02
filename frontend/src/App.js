//lacks clarity later
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
//BrowserRouter-everywhere we want to use the router
//Routes-wraps all individual routes
//Route-ind to create a single route
import { useAuthContext } from './hooks/useAuthContext';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const {user}=useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <div className='pages'>
          <Routes>
            <Route
              path="/"//hoempage//these are props
              element={user ?<Home/>:<Navigate to="/login"/>}//element we wanna render for this route
            />
            <Route
              path="/login"
              element={!user?<Login/>:<Navigate to="/"/>}
            />
            <Route
              path="/signup"
              element={!user?<Signup/>:<Navigate to="/"/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
