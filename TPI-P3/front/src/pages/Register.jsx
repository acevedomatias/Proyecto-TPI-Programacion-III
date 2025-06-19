import { useState, useRef } from "react";
import { validateRegister } from "../utils/ValidationsRegister";
import { useNavigate, Link } from "react-router-dom";

import { Form, Button, Card, Container } from 'react-bootstrap';


export const Register = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [errors, setErrors] = useState({ name: false, email: false, password: false });
    
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    
    const navigate = useNavigate();

    useEffect(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("role"); 
      localStorage.removeItem("userId");
    }, [])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationsErrors = validateRegister(formData);

        if (Object.keys(validationsErrors).length > 0) {
            setErrors(validationsErrors);

            if (validationsErrors.name) {
                nameRef.current.focus();
            } else if (validationsErrors.email) {
                emailRef.current.focus();
            } else if (validationsErrors.password) {
                passwordRef.current.focus();
            }
            return;
        } else {
            setErrors({});
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
                alert("Error: " + errorData.message);
                return;
            }

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
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
    >
        <div className="position-absolute top-0 start-0 m-4">
            <Link to="/" style={{ textDecoration: 'none' }}>&larr; Volver</Link>
        </div>

      <Card style={{ width: '100%', maxWidth: '800px' }} className="shadow p-4">
        <Card.Body>
          <h2 className="text-center mb-4 fs-3">Registro</h2>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Nombre"
                value={formData.name}
                onChange={handleChange}
                ref={nameRef}
              />
              {errors.name && (
                <Form.Text className="text-danger">{errors.name}</Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                placeholder="Ingresar email"
                value={formData.email}
                onChange={handleChange}
                ref={emailRef}
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
                value={formData.password}
                onChange={handleChange}
                ref={passwordRef}
              />
              {errors.password && (
                <Form.Text className="text-danger">{errors.password}</Form.Text>
              )}
            </Form.Group>

            <Button variant="success" type="submit" className="w-100">
              Registrarse
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Register;