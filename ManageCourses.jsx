import React, { useEffect, useState } from 'react';
import './ManageCourses.css'; // Import your CSS file for styles

function ManageCourses() {
    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState('');
    const [editingCourse, setEditingCourse] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [faculties, setFaculties] = useState([]);
    const [selectedFacultyId, setSelectedFacultyId] = useState('');

    // Fetch courses and faculties from the API
    useEffect(() => {
        fetch('http://localhost:5000/api/courses') // Replace with your actual API endpoint
            .then((response) => response.json())
            .then((data) => setCourses(data))
            .catch((error) => console.error('Error fetching courses:', error));

        fetch('http://localhost:5000/api/faculties') // Replace with your actual API endpoint
            .then((response) => response.json())
            .then((data) => setFaculties(data))
            .catch((error) => console.error('Error fetching faculties:', error));
    }, []);

    const handleAddCourse = () => {
        const course = { name: newCourse, facultyId: selectedFacultyId };

        fetch('http://localhost:5000/api/courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(course),
        })
            .then(() => {
                setCourses((prev) => [...prev, course]);
                setNewCourse('');
                setSelectedFacultyId('');
            })
            .catch((error) => console.error('Error adding course:', error));
    };

    const handleEditCourse = (course) => {
        setEditingCourse(course);
        setEditValue(course.name);
    };

    const handleUpdateCourse = () => {
        fetch(`http://localhost:5000/api/courses/${editingCourse.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: editValue }),
        })
            .then(() => {
                setCourses((prev) =>
                    prev.map((c) => (c.id === editingCourse.id ? { ...c, name: editValue } : c))
                );
                setEditingCourse(null);
                setEditValue('');
            })
            .catch((error) => console.error('Error updating course:', error));
    };

    const handleDeleteCourse = (id) => {
        fetch(`http://localhost:5000/api/courses/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                setCourses((prev) => prev.filter((course) => course.id !== id));
            })
            .catch((error) => console.error('Error deleting course:', error));
    };

    return (
        <div>
            <h2>Manage Courses</h2>
            <input
                type="text"
                value={newCourse}
                onChange={(e) => setNewCourse(e.target.value)}
                placeholder="Add new course"
            />
            <select
                value={selectedFacultyId}
                onChange={(e) => setSelectedFacultyId(e.target.value)}
            >
                <option value="">Select Faculty</option>
                {faculties.map((faculty) => (
                    <option key={faculty.id} value={faculty.id}>
                        {faculty.name}
                    </option>
                ))}
            </select>
            <button
                style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    padding: '10px 15px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                }}
                onClick={handleAddCourse}
            >
                Add Course
            </button>

            <h3>Current Courses</h3>
            <table className="courses-table">
                <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr key={course.id}>
                            <td>
                                {editingCourse?.id === course.id ? (
                                    <input
                                        type="text"
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                    />
                                ) : (
                                    course.name
                                )}
                            </td>
                            <td>
                                {editingCourse?.id === course.id ? (
                                    <>
                                  
                                        <button onClick={() => setEditingCourse(null)}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                 
                                        <button onClick={() => handleDeleteCourse(course.id)}>Delete</button>
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

export default ManageCourses;