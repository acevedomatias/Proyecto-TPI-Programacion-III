import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";

export const BookingForm = () => {
    const navigate = useNavigate();
    const [cabin, setCabin] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
    fetch(`http://localhost:3000/api/cabin/${id}`)
      .then(res => res.json())
      .then(data => setCabin(data))
      .catch(err => console.error(err));
    }, [id]);

    const handleSubmit = async (e) => {
       e.preventDefault();

       
    };

    if (!cabin) return <p className="text-center mt-5">Cargando cabaña...</p>;


  return (
    <Container className="mt-5">
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