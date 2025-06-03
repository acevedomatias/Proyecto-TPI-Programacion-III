import { Link } from "react-router-dom";

export const PublicHome = () => {
  return (
    <div>
        <h1>Bienvenido a EcoCabañas</h1>
        <Link to="/login">
            <button>Iniciar Sesión</button>
        </Link>
        <Link to="/register" style={{ marginLeft: 10 }}>
            <button>Registrarse</button>
        </Link>
    </div>
  )
}

export default PublicHome;
