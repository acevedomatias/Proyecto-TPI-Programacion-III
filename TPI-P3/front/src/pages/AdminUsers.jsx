import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

export const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/api/user")
        .then(res => res.json())
        .then(data => setUsers(data))
        .catch(error => console.error("Error al obtener usuarios:", error));
    }, []);

    const handleDelete = async (id) => {
        const confirm = window.confirm("¿Estás seguro que querés eliminar este usuario?");
        if (!confirm) return;

        try {
            await fetch(`http://localhost:3000/api/user/${id}`, {
                method: "DELETE",
            });
            setUsers(users.filter((user) => user.id !== id))
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/api/user/${editingUser.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editingUser)
            });

            if (!response.ok) {
                    const errorData = await response.json();
                    alert("Error: " + errorData.message);
                    return;
                }

            //actualiza el array de usuarios local
            //si encuentra un user con el mismo id q estamos editando lo remplaza por el nuevo 
            setUsers(users.map((user) => (user.id === editingUser.id ? editingUser : user)));
            setEditingUser(null); // cierra formulario
            alert("Usuario actualizado");

        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            alert("Hubo un error al actualizar el usuario.");
        }
    }


    return (
  <div>
    <div className="position-absolute top-0 start-0 m-4">
      <Link to="/adminPanel" style={{ textDecoration: 'none' }}>&larr; Volver</Link>
    </div>

    <h2 className="m-4 text-center">Administrar Usuarios</h2>

    <table className="table table-hover table-striped table-bordered align-middle text-center shadow-sm rounded">
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <button className="btn btn-primary m-1" onClick={() => setEditingUser(user)}>
                <i className="bi bi-pencil-square m-1"></i>Editar
              </button>
              <button className="btn btn-danger m-1" onClick={() => handleDelete(user.id)}>
                <i className="bi bi-trash m-1"></i>Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* Formulario de edición */}
    {editingUser && (
      <form
        onSubmit={handleUpdate}
        className="p-4 border rounded shadow-sm bg-light w-100"
        style={{ maxWidth: '500px', margin: '0 auto' }}
      >
        <h4 className="mb-4 text-center">Editar Usuario</h4>

        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={editingUser.name}
            onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={editingUser.email}
            onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Rol</label>
          <select
            className="form-select"
            name="role"
            value={editingUser.role}
            onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
          >
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success">
            Guardar
          </button>
          <button type="button" className="btn btn-danger" onClick={() => setEditingUser(null)}>
            Cancelar
          </button>
        </div>
      </form>
    )}
  </div>
);

    }

export default AdminUsers;
