import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateLogin } from "../utils/ValidationsLogin";


export const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: false, password: false});
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
        const validationsErrors = validateLogin(formData);
        
        if (Object.keys(validationsErrors).length > 0) {
            setErrors(validationsErrors);

            if (validationsErrors.email) {
                emailRef.current.focus();
            } else if (validationsErrors.password) {
                passwordRef.current.focus();
            }
            return
        } else {
            setErrors({});
            try {
                const response = await fetch("http://localhost:3000/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    alert("Error: " + errorData.message);
                    return;
                }

                const token = await response.json();
                localStorage.setItem("token", token);
                alert("Inicio de sesión exitoso");
                navigate("/home");
            } catch (error) {
                console.error("Error al hacer login:", error);
                alert("Ocurrió un error inesperado");
            }
        }
    }   

    return (
        <form onSubmit={handleSubmit}>
            <input 
                name="email"
                placeholder="Ingresar email"
                required
                ref={emailRef}
                onChange={handleChange}
                value={formData.email}
            />
            { errors.name && <p style={{color:"red"}}>{errors.email}</p>}

            <input 
                type="password"
                name="password"
                placeholder="Ingresar contraseña"
                ref={passwordRef}
                onChange={handleChange}
                value={formData.password}
            />
            { errors.name && <p style={{color:"red"}}>{errors.password}</p>}

            <button type="submit">Iniciar Sesión</button>
        </form>
    )
}


export default Login;