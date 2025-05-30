import { useState, useRef } from "react";
import { Validations } from "../utils/Validations";
import { useNavigate } from "react-router-dom";


export const Register = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [errors, setErrors] = useState({ name: false, email: false, password: false });
    
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
  e.preventDefault();
  const validationsErrors = Validations(formData);

  if (Object.keys(validationsErrors).length > 0) {
    setErrors(validationsErrors);
  } else {
    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert("Error: " + errorData.message); // Mostrar error del backend si existe
        return;
      }

      // Si todo salió bien, redirige al login
      setTimeout(() => {
        navigate('/login');
      }, 500);
    } catch (error) {
      console.error("Error en el registro:", error);
      alert("Hubo un problema con el servidor");
    }
  }
}

  return (
    <form onSubmit={handleSubmit}>
        <div>
            <input
                name="name"
                placeholder="Nombre"
                required
                value={formData.name}
                onChange={handleChange}
                ref={nameRef}    
            />
            { errors.name && <p style={{color:"red"}}>{errors.name}</p>}
        </div>
        <div>
            <input
                name="email"
                placeholder="Ingresar email"
                required
                value={formData.email}
                onChange={handleChange}
                ref={emailRef}
            />
            { errors.email && <p style={{color: "red"}}>{errors.email}</p> }
        </div>
        <div>
            <input 
                type="password"
                name="password"
                placeholder="Ingresar contraseña"
                required
                value={formData.password}
                onChange={handleChange}
                ref={passwordRef}
            />
            { errors.password && <p style={{color: "red"}}>{errors.password}</p> }
        </div>
        <button type="submit">Registrarse</button>
    </form>
  )
}
