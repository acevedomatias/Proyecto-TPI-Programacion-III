import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AdminPanel() {
  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center">Panel de Administración</h2>

      <Row className="g-4 justify-content-center">
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Usuarios</Card.Title>
              <Card.Text>Administrar usuarios registrados.</Card.Text>
              <Link to="/adminPanel/usuarios">
                <Button variant="primary">Ir a Usuarios</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Cabañas</Card.Title>
              <Card.Text>Agregar, editar o eliminar cabañas.</Card.Text>
              <Link to="/adminPanel/cabanas">
                <Button variant="success">Ir a Cabañas</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Reservas</Card.Title>
              <Card.Text>Consultar y gestionar reservas.</Card.Text>
              <Link to="/adminPanel/reservas">
                <Button variant="warning">Ir a Reservas</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminPanel;
