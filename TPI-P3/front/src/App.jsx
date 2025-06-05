import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicHome from './pages/PublicHome';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Protected from "./components/Protected";
import Dashboard from "./pages/Dashboard";
import Reservations from "./pages/Reservations";
import AdminPanel from "./pages/AdminPanel";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [userRole, setUserRole] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PublicHome />} />
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login setIsLogged={setIsLogged} setUserRole={setUserRole} />}/>
        <Route path='/reservations' element={<Reservations />}/>
        <Route path='/adminPanel' element={<AdminPanel />}/>

        {/* <Route element={<Protected isLogged={isLogged}/>}> */}
          <Route path="/dashboard" element={<Dashboard userRole={userRole} />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;