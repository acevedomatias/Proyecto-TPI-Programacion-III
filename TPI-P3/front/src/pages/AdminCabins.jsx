import { useState, useEffect } from "react";

export const AdminCabins = () => {
  const [cabins, setCabins] = useState([]);
  const [editingCabin, setEditingCabin] = useState(null);
  const [newCabin, setNewcabin] = useState({  
    name: '',
    description: '',
    pricePerNight: '',
    capacity: '',
    isAvailable: true,
    imageUrl: '' 
  })
  const [showForm, setShowForm] = useState(false);


  useEffect(() => {
  fetch("http://localhost:3000/api/cabin")
    .then(res => res.json())
    .then(data => setCabins(data))
    .catch(error => console.error("Error al obtener cabañas:", error));
  }, []);


  const handleAddCabin = () => {
    setEditingCabin(null);
    setNewcabin({
      name: '',
      description: '',
      pricePerNight: '',
      capacity: '',
      isAvailable: true,
      imageUrl: ''
    })
    setShowForm(true);
  }

  const handleChangeNewCabin = (e) => {
    setNewcabin({ 
      ...newCabin,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      //editar cabaña
      if (editingCabin) {
        response = await fetch(`http://localhost:3000/api/cabin/${editingCabin.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCabin)
        });
      } else {
          //agregar cabaña 
          response = await fetch("http://localhost:3000/api/cabin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCabin),
        });
      }

      if (!response.ok) {
          const errorData = await response.json();
          alert("Error: " + errorData.message);
          return;
      }

      const savedCabin = await response.json();

      if (editingCabin) {
        //actualiza la lista remplazando a la cabaña que edito
        setCabins(cabins.map(cabin => cabin.id === savedCabin.id ? savedCabin : cabin))
      } else {
        //agrega la cabaña nueva a la lista
        setCabins([...cabins, savedCabin]);
      }

      setShowForm(false);
      setEditingCabin(null)
      setNewcabin({
        name: '',
        description: '',
        pricePerNight: '',
        capacity: '',
        isAvailable: true,
        imageUrl: '',
      });  
    } catch (error) {
      console.error(error);
      alert("Hubo un problema guardando la cabaña.");
    }
  }

  const handleDelete = async (id) => {
    const confirm = window.confirm("¿Estás seguro que querés eliminar esta cabaña?");
    if (!confirm) return;

    try {
      await fetch(`http://localhost:3000/api/cabin/${id}`, {
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
        <button onClick={handleAddCabin}>Agregar Cabaña</button>

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
                  <th>Acciones</th>
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
                      <td>{cabin.isAvailable}</td>
                      <td>{cabin.imageUrl}</td>
                      <td>
                          <button onClick={() => {
                            setEditingCabin(cabin);
                            setNewcabin(cabin);
                            setShowForm(true);
                          }}>Editar</button>
                          <button onClick={() => handleDelete(cabin.id)}>Eliminar</button>
                      </td>
                  </tr>   
              ))}
          </tbody>
        </table>

        {showForm && (
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Nombre"
              value={newCabin.name}
              name="name"
              onChange={handleChangeNewCabin}
            />
            <input
              type="text"
              placeholder="Descripción"
              value={newCabin.description}
              name="description"
              onChange={handleChangeNewCabin}
            />
            <input
              type="number"
              placeholder="Precio por noche"
              value={newCabin.pricePerNight}
              name="pricePerNight"
              onChange={handleChangeNewCabin}
            />
            <input
              type="number"
              placeholder="Capacidad"
              value={newCabin.capacity}
              name="capacity"
              onChange={handleChangeNewCabin}
            />
            <input
              type="text"
              placeholder="URL de imagen"
              value={newCabin.imageUrl}
              name="imageUrl"
              onChange={handleChangeNewCabin}
            />
            <label>
              Disponible:
              <input
                type="checkbox"
                checked={newCabin.isAvailable}
                name="isAvailable"
                onChange={(e) => setNewcabin({ ...newCabin, isAvailable: e.target.checked })}
              />
          </label>

          <button type="submit">{editingCabin ? "Guardar cambios" : "Agregar"}</button>
          <button type="button" onClick={() => setShowForm(false)}>Cancelar</button>
          </form>
        )}              
        
      </div>
  )
}

export default AdminCabins;