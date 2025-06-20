import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";

export const BookingForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cabin, setCabin] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
    fetch(`http://localhost:3000/api/cabin/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log("Cabaña recibida:", data);
        setCabin(data);
      })
      .catch(err => console.error(err));
    }, [id]);

    const handleSubmit = async (e) => {
      e.preventDefault();

      const userId = localStorage.getItem("userId");
      const body = {
        cabinId: id, 
        userId: userId,
        startDate,
        endDate
      };
      
      try {
        const response = await fetch("http://localhost:3000/api/booking", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
          const errorData = await response.json();
          alert("Error: " + errorData.message);
          return;
        }

        alert("Reserva realizada con éxito");
        navigate("/dashboard");
        } catch (error) {
        console.error(error);
        alert("Error al realizar la reserva");
        }

    };

    if (!cabin) return <p className="text-center mt-5">Cargando cabaña...</p>;


  return (
    <Container className="mt-5">
      <div className="position-absolute top-0 start-0 m-4">
        <Link to="/dashboard" style={{ textDecoration: 'none' }}>&larr; Volver</Link>
      </div>
      <Card className="p-4 shadow">
        <h2 className="mb-4 text-center">Reservar: {cabin.name}</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Fecha de inicio</Form.Label>
            <Form.Control
              type="date"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Fecha de fin</Form.Label>
            <Form.Control
              type="date"
              required
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Form.Group>
          <Button type="submit">Confirmar Reserva</Button>
        </Form>
      </Card>
    </Container>
  )
}

export default BookingForm;
