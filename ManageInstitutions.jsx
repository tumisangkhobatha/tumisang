import React, { useState } from "react";
import "./ManageInstitutions.css";

function ManageInstitutions() {
    const [institutions, setInstitutions] = useState([]); // State to hold institution data
    const [formData, setFormData] = useState({ name: "" }); // State for form input
    const [isEditing, setIsEditing] = useState(false); // Editing state
    const [currentId, setCurrentId] = useState(null); // Current ID for editing

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            setInstitutions(
                institutions.map((inst) =>
                    inst.id === currentId ? { ...inst, name: formData.name } : inst
                )
            );
        } else {
            setInstitutions([...institutions, { id: Date.now(), name: formData.name }]);
        }
        resetForm();
    };

    const handleEdit = (id) => {
        const institutionToEdit = institutions.find((inst) => inst.id === id);
        setFormData({ name: institutionToEdit.name });
        setIsEditing(true);
        setCurrentId(id);
    };

    const handleDelete = (id) => {
        setInstitutions(institutions.filter((inst) => inst.id !== id));
    };

    const resetForm = () => {
        setFormData({ name: "" });
        setIsEditing(false);
        setCurrentId(null);
    };

    return (
        <div className="manage-institutions-container">
            <h2>Manage Institutions</h2>
            <form onSubmit={handleSubmit} className="crud-form">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter Institution Name"
                    required
                />
                <button type="submit">{isEditing ? "Update" : "Add Institution"}</button>
                <button type="button" onClick={resetForm}>Cancel</button>
            </form>

            <table className="crud-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {institutions.map((inst) => (
                        <tr key={inst.id}>
                            <td>{inst.id}</td>
                            <td>{inst.name}</td>
                            <td>
                                <button onClick={() => handleEdit(inst.id)}>Edit</button>
                                <button onClick={() => handleDelete(inst.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManageInstitutions;
