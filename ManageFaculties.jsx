import React, { useEffect, useState } from 'react';

function ManageFaculties() {
    const [faculties, setFaculties] = useState([]);
    const [newFaculty, setNewFaculty] = useState('');
    const [editingFaculty, setEditingFaculty] = useState(null);
    const [editValue, setEditValue] = useState('');

    // Fetch faculties from the API
    useEffect(() => {
        fetch('http://localhost:5000/api/faculties')
            .then((response) => response.json())
            .then((data) => setFaculties(data))
            .catch((error) => console.error('Error fetching faculties:', error));
    }, []);

    const handleAddFaculty = () => {
        const faculty = { name: newFaculty };
        fetch('http://localhost:5000/api/faculties', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(faculty),
        })
            .then(() => {
                setFaculties((prev) => [...prev, faculty]);
                setNewFaculty('');
            })
            .catch((error) => console.error('Error adding faculty:', error));
    };

    const handleEditFaculty = (faculty) => {
        setEditingFaculty(faculty);
        setEditValue(faculty.name);
    };

    const handleUpdateFaculty = () => {
        fetch(`http://localhost:5000/api/faculties/${editingFaculty.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: editValue }),
        })
            .then(() => {
                setFaculties((prev) =>
                    prev.map((f) => (f.id === editingFaculty.id ? { ...f, name: editValue } : f))
                );
                setEditingFaculty(null);
                setEditValue('');
            })
            .catch((error) => console.error('Error updating faculty:', error));
    };

    const handleDeleteFaculty = (id) => {
        fetch(`http://localhost:5000/api/faculties/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                setFaculties((prev) => prev.filter((faculty) => faculty.id !== id));
            })
            .catch((error) => console.error('Error deleting faculty:', error));
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>Manage Faculties</h2>
            <input
                type="text"
                value={newFaculty}
                onChange={(e) => setNewFaculty(e.target.value)}
                placeholder="Add new faculty"
                style={{
                    padding: '8px',
                    marginRight: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                }}
            />
            <button
                onClick={handleAddFaculty}
                style={{
                    backgroundColor: '#4CAF50', // Primary green background
                    color: 'white', // White text color
                    border: 'none', // No border
                    padding: '10px 15px', // Padding for size
                    borderRadius: '5px', // Rounded corners
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                }}
            >
                Add Faculty
            </button>

            <h3>Current Faculties</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#4CAF50', color: 'white' }}>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Faculty ID</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Name</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {faculties.map((faculty) => (
                        <tr key={faculty.id} style={{ textAlign: 'center', borderBottom: '1px solid #ddd' }}>
                            <td style={{ padding: '10px' }}>{faculty.id}</td>
                            <td style={{ padding: '10px' }}>
                                {editingFaculty?.id === faculty.id ? (
                                    <input
                                        type="text"
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        style={{ padding: '5px', borderRadius: '3px', width: '80%' }}
                                    />
                                ) : (
                                    faculty.name
                                )}
                            </td>
                            <td style={{ padding: '10px' }}>
                                {editingFaculty?.id === faculty.id ? (
                                    <>
                                        <button
                                            onClick={handleUpdateFaculty}
                                            style={{
                                                backgroundColor: '#2196F3', // Blue color for "Update"
                                                color: 'white',
                                                padding: '5px 10px',
                                                borderRadius: '3px',
                                                border: 'none',
                                                marginRight: '5px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => setEditingFaculty(null)}
                                            style={{
                                                backgroundColor: '#f44336', // Red color for "Cancel"
                                                color: 'white',
                                                padding: '5px 10px',
                                                borderRadius: '3px',
                                                border: 'none',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        {/* <button
                                            onClick={() => handleEditFaculty(faculty)}
                                            style={{
                                                backgroundColor: '#FFC107', // Yellow for "Edit"
                                                color: 'black',
                                                padding: '5px 10px',
                                                borderRadius: '3px',
                                                border: 'none',
                                                marginRight: '5px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            Edit
                                        </button> */}
                                        <button
                                            onClick={() => handleDeleteFaculty(faculty.id)}
                                            style={{
                                                backgroundColor: '#f44336', // Red for "Delete"
                                                color: 'white',
                                                padding: '5px 10px',
                                                borderRadius: '3px',
                                                border: 'none',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManageFaculties;