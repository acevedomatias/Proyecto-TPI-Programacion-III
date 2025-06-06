import { useState, useEffect } from "react";

export const AdminCabins = () => {
  const [cabins, setCabins] = useState([]);
  const [editingCabin, setEditingCabin] = useState(null);
  const [newCabin, setNewcain] = useState({  
    name: '',
    description: '',
    pricePerNight: '',
    capacity: '',
    isAvaiable: true,
    imageUrl: '' 
  })

  useEffect(() => {
  fetch("http://localhost:3000/api/cabins")
    .then(res => res.json())
    .then(data => setCabins(data))
    .catch(error => console.error("Error al traer cabañas:", error));
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("¿Estás seguro que querés eliminar esta cabaña?");
    if (!confirm) return;

    try {
      await fetch(`http://localhost:3000/api/cabins/${id}`, {
        method: "DELETE",
      });
      setCabins(cabins.filter((cabin) => cabin.id !==id));
    } catch (error) {
      console.error("Error al eliminar cabaña:", error);
    }
  };


  return (
      <div>
        <h2>Administrar Cabañas</h2>
        <button >Agregar Cabaña</button>

        <table>
          <thead>
              <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Descripcion</th>
                  <th>Precio Por Noche</th>
                  <th>Capacidad</th>
                  <th>Disponible</th>
                  <th>Url</th>
              </tr>
          </thead>
          <tbody>
              {cabins.map((cabin) => (
                  <tr key={cabin.id}>
                      <td>{cabin.id}</td>
                      <td>{cabin.name}</td>
                      <td>{cabin.description}</td>
                      <td>{cabin.pricePerNight}</td>
                      <td>{cabin.capacity}</td>
                      <td>{cabin.isAvaiable}</td>
                      <td>{cabin.imageUrl}</td>
                      <td>
                          <button onClick={() => setEditingCabin(cabin)}>Editar</button>
                          <button onClick={() => handleDelete(cabin.id)}>Eliminar</button>
                      </td>
                  </tr>   
              ))}
          </tbody>
        </table>
      </div>
  )
}

export default AdminCabins;