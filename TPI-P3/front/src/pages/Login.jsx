import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { validateLogin } from "../utils/ValidationsLogin";
import { jwtDecode } from "jwt-decode";

import { Form, Button, Card, Container} from 'react-bootstrap';


export const Login = ({ setIsLogged, setUserRole }) => {
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

                const data = await response.json();
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data.user.id);

                //extrae el rol desde el token
                const decoded = jwtDecode(data.token);
                setUserRole(decoded.role);

                setIsLogged(true);
                alert("Inicio de sesión exitoso");
                navigate("/Dashboard");
                
            } catch (error) {
                console.error("Error al hacer login:", error);
                alert("Ocurrió un error inesperado");
            }
        }
    }   

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: '100vh', width: '100vh' }}
        >
            <div className="position-absolute top-0 start-0 m-4">
                <Link to="/" style={{ textDecoration: 'none' }}>&larr; Volver</Link>
            </div>

            <Card style={{ width: '100%', maxWidth: '800px', maxHeight: '500px' }} className="shadow">
                <Card.Body>
                    <h2 className="text-center mb-4">Iniciar Sesión</h2>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                name="email"
                                placeholder="Ingresar email"
                                ref={emailRef}
                                onChange={handleChange}
                                value={formData.email}
                            />
                            {errors.email && (
                                <Form.Text className="text-danger">{errors.email}</Form.Text>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Ingresar contraseña"
                                ref={passwordRef}
                                onChange={handleChange}
                                value={formData.password}
                            />
                            {errors.password && (
                                <Form.Text className="text-danger">{errors.password}</Form.Text>
                            )}
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100 mb-3">
                            Iniciar Sesión
                        </Button>

                        <div className="text-center">
                            <p>
                                ¿Aún no tenés cuenta? <Link to="/register">Registrate</Link>
                            </p>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}


export default Login;