import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const AdminBookings = () => {
  const [bookings, setBooking] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/booking")
      .then(res => res.json())
      .then(data => setBooking(data))
      .catch(error => console.error("Error al obtener reservas:", error));
  }, [])

  const handleDelete = async (id) => {
    const confirm = window.confirm("¿Estás seguro que querés eliminar esta reserva?");
    if (!confirm) return;

    try {
      await fetch(`http://localhost:3000/api/booking/${id}`, {
        method: "DELETE",
      });
      setBooking(bookings.filter((booking) => booking.id !==id));
    } catch (error) {
      console.error("Error al eliminar reserva:", error);
    }
  }; 

  const handleUpdate = async (e) => {
        e.preventDefault();

        if (!editingBooking.startDate ||  !editingBooking.endDate || !editingBooking.userId || !editingBooking.cabinId) {
          alert("Todos los campos son obligatorios");
          return;
        }
        
        console.log("Booking a actualizar:", editingBooking);

        try {
            const response = await fetch(`http://localhost:3000/api/booking/${editingBooking.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editingBooking)
            });

            if (!response.ok) {
                    const errorData = await response.json();
                    alert("Error: " + errorData.message);
                    return;
                }

            //actualiza el array de reservas local
            //si encuentra un booking con el mismo id q estamos editando lo remplaza por el nuevo 
            setBooking(bookings.map((booking) => (booking.id === editingBooking.id ? editingBooking : booking)));
            setEditingBooking(null); // cierra formulario
            alert("Reserva actualizada");

        } catch (error) {
          console.error("Error al actualizar reserva:", error);
          alert("Hubo un error al actualizar la reserva.");
        }
    }

  return (
    <div>
      <div className="position-absolute top-0 start-0 m-4">
        <Link to="/adminPanel" style={{ textDecoration: 'none' }}>&larr; Volver</Link>
      </div>

      <h2>Administrar Reservas</h2>
      {bookings.length === 0 ? (
        <p>No hay reservas.</p>
      ) : (
        <table className="table table-hover table-striped table-bordered align-middle text-center shadow-sm rounded space-y-4">
          <thead>
              <tr>
                  <th>Id</th>
                  <th>Fecha inicio</th>
                  <th>Fecha fin</th>
                  <th>Id Usuario</th>
                  <th>Id Cabaña</th>
                  <th>Acciones</th>
              </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.startDate}</td>
                <td>{booking.endDate}</td>
                <td>{booking.userId}</td>
                <td>{booking.cabinId}</td>
                <td>
                  <button onClick={() => setEditingBooking(booking)}>Editar</button>
                  <button onClick={() => handleDelete(booking.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

 
      {editingBooking && (
          <form onSubmit={handleUpdate}>
            <input
              type="date"
              name="startDate"
              value={editingBooking.startDate ? editingBooking.startDate.slice(0, 10) : ""}
              onChange={(e) =>
                setEditingBooking({ ...editingBooking, startDate: e.target.value })
              }
            />

            <input
              type="date"
              name="endDate"
              value={editingBooking.endDate ? editingBooking.endDate.slice(0, 10) : ""}
              onChange={(e) =>
                setEditingBooking({ ...editingBooking, endDate: e.target.value })
              }
            />

            <input
              type="number"
              name="userId"
              value={editingBooking.userId}
              onChange={(e) =>
                setEditingBooking({ ...editingBooking, userId: parseInt(e.target.value) })
              }
              placeholder="ID Usuario"
            />

            <input
              type="number"
              name="cabinId"
              value={editingBooking.cabinId}
              onChange={(e) =>
                setEditingBooking({ ...editingBooking, cabinId: parseInt(e.target.value) })
              }
              placeholder="ID Cabaña"
            />

              <button type="submit">Guardar</button>
              <button type="button" onClick={() => setEditingBooking(null)}>Cancelar</button>
          </form>  
        )}
    </div>
  )
}

export default AdminBookings;
