import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicHome from './pages/PublicHome';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Protected from "./components/Protected";
import Dashboard from "./pages/Dashboard";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicHome />} />
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login setIsLogged={setIsLogged} />}/>

        <Route element={<Protected isLogged={isLogged}/>}>
          <Route path="/dashboard" element={<Dashboard/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;