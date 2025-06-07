import { useState, useEffect } from "react";

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

        }
    }


    return (
        <div>
            <table>
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
                                <button onClick={() => setEditingUser(user)}>Editar</button>
                                <button onClick={() => handleDelete(user.id)}>Eliminar</button>
                            </td>
                        </tr>   
                    ))}
                </tbody>
            </table>

            {/* condicional */}
            {editingUser && (
                <form onSubmit={handleUpdate}>
                    <input
                        type="text"
                        name="name"
                        value={editingUser.name}
                        onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                    />

                    <input
                        type="email"
                        name="email"
                        value={editingUser.email}
                        onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                    />

                    <select
                        name="role" 
                        value={editingUser.role}
                        onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                    >
                        <option value="user">Usuario</option>
                        <option value="admin">Administrador</option>
                    </select>

                    <button type="submit">Guardar</button>
                    <button type="button" onClick={() => setEditingUser(null)}>Cancelar</button>
                </form>  
            )}
            
        </div>


    )
    }

export default AdminUsers;
