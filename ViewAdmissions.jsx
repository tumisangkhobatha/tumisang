// src/components/ViewAdmissions.jsx
import React, { useEffect, useState } from 'react';

function ViewAdmissions() {
    const [admissions, setAdmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch admissions from the API
    useEffect(() => {
        fetch('http://localhost:3000/api/admissions') // Replace with your actual API endpoint
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch admissions');
                }
                return response.json();
            })
            .then((data) => {
                setAdmissions(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading admissions...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>View Admissions</h2>
            {admissions.length === 0 ? (
                <p>No admissions found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Applicant Name</th>
                            <th>Course</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admissions.map((admission) => (
                            <tr key={admission.id}>
                                <td>{admission.id}</td>
                                <td>{admission.applicantName}</td>
                                <td>{admission.course}</td>
                                <td>{admission.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ViewAdmissions;
