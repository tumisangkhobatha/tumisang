// src/components/ViewApplications.jsx
import React, { useEffect, useState } from 'react';
import './ManageCourses.css'; // Import your CSS file for styles


function ViewApplications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/applications');
                if (!response.ok) {
                    const text = await response.text(); // Read the response as text
                    throw new Error(`Failed to fetch applications: ${text}`); // Include the response text in the error
                }
                const data = await response.json();
                setApplications(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    const handleViewDetails = (id) => {
        console.log("View details for application:", id);
    };

    if (loading) {
        return <div>Loading applications...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>View Applications</h2>
            {applications.length === 0 ? (
                <p>No applications found.</p>
            ) : (
                <table className="courses-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Student ID</th>
                            <th>Course ID</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((application) => (
                            <tr key={application.id}>
                                <td>{application.id}</td>
                                <td>{application.student_id}</td>
                                <td>{application.course_id}</td>
                                <td>{application.status}</td>
                                <td>
                                    <button onClick={() => handleViewDetails(application.id)}>View Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ViewApplications;
