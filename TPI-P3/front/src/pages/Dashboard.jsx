import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomNavbar from "../components/CustomNavbar ";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import naturalezaImg from '../assets/Naturaleza.png';
import comodidadImg from '../assets/Comodidad.png';
import atencionImg from '../assets/Atencion.png';

export const Dashboard = ({ userRole }) => {
  const [cabins, setCabins] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/cabin")
      .then((res) => res.json())
      .then((data) => setCabins(data))
      .catch((error) => console.error("Error al obtener cabañas:", error));
  }, []);

  const handleReserve = (cabinId) => {
    navigate(`/BookingForm/${cabinId}`);
  };

  return (
    <div>
      <CustomNavbar userRole={ userRole }/>

      <section id="cabañas" style={{ padding: "4rem 0" }}>
        <Container>
          <h2 className="mb-4 text-center">Nuestras Cabañas</h2>
          {/* Acá después vas a mapear las cabañas desde la base de datos */}
          <Row className="justify-content-center align-items-stretch">
            {cabins.map((cabin) => (
              <Col md={4} key={cabin.id} className="mb-4">
                <Card className="text-center p-3 shadow h-100">
                  <Card.Img
                    variant="top"
                    src={cabin.imageUrl}
                    alt={cabin.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="h5 fw-bold text-dark">{cabin.name}</Card.Title>
                    <Card.Text className="text-secondary small lh-base mb-3 text-truncate-multiline">
                      {cabin.description}
                    </Card.Text>
                    <Card.Text className="text-muted fst-italic small mb-2">
                      Capacidad: {cabin.capacity} Personas
                    </Card.Text>
                    <Card.Text className="text-muted fst-italic small mb-3">
                      Precio por noche: ${cabin.pricePerNight}
                    </Card.Text>
                    <Button
                      className="btn-primary mt-auto"
                      onClick={() => handleReserve(cabin.id)}
                    >
                      Reservar
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section
        id="conocenos"
        style={{ padding: "4rem 0", backgroundColor: "#f0f4f8" }}
      >
        <Container>
          <h2 className="mb-5 text-center fw-bold" style={{ color: "#2c3e50" }}>
            ¿Quiénes Somos?
          </h2>
          <Row className="text-center gy-4">
            {[ 
              { img: naturalezaImg, alt: "Naturaleza", title: "Amantes de la Naturaleza", text: "Nuestro compromiso es brindarte un espacio en armonía con el entorno, rodeado de montañas, bosques y aire puro." },
              { img: comodidadImg, alt: "Comodidad", title: "Cabañas Confortables", text: "Combinamos rusticidad con confort moderno. Todas nuestras cabañas están totalmente equipadas para tu descanso." },
              { img: atencionImg, alt: "Atención", title: "Atención Personalizada", text: "Nos encanta recibirte como si fueras parte de nuestra familia. Siempre atentos a que vivas una experiencia única." }
            ].map(({ img, alt, title, text }) => (
              <Col md={4} key={title}>
                <div className="conocenos-card p-4 rounded shadow-sm h-100">
                  <img
                    src={img}
                    alt={alt}
                    width={100}
                    className="mb-3 mx-auto d-block img-fluid icon-hover"
                    style={{ filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.1))" }}
                  />
                  <h4 className="mb-3 fw-semibold" style={{ color: "#34495e" }}>
                    {title}
                  </h4>
                  <p className="text-muted fs-6">{text}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>

        <style jsx>{`
          .conocenos-card {
            background: white;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: default;
          }
          .conocenos-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          }
          .icon-hover {
            transition: transform 0.3s ease;
          }
          .conocenos-card:hover .icon-hover {
            transform: scale(1.1);
            filter: drop-shadow(0 4px 4px rgba(0,0,0,0.15));
          }
        `}</style>
      </section>



      <section id="contacto" style={{ padding: "4rem 0", backgroundColor: "#e9ecef" }}>
        <Container>
          <h2 className="mb-5 text-center">Contacto</h2>
          <Row className="justify-content-center">
            <Col md={6}>
              <Card className="p-4 shadow">
                <Card.Body className="text-center">
                  <h4 className="mb-4">¿Tenés dudas o querés hacer una reserva?</h4>
                  <p>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/732/732200.png"
                      alt="Email"
                      width={24}
                      className="me-2"
                    />
                    contacto@ecocabanas.com
                  </p>
                  <p>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/455/455705.png"
                      alt="Teléfono"
                      width={24}
                      className="me-2"
                    />
                    +54 9 11 1234-5678
                  </p>
                  <p>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
                      alt="Ubicación"
                      width={24}
                      className="me-2"
                    />
                    Ruta 40 km 123, Villa Naturaleza, Patagonia
                  </p>
                  <Button variant="primary" className="mt-3">Escribinos</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

    </div>
  )
}

export default Dashboard;