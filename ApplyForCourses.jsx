import React, { useEffect, useState } from 'react';

function ApplyForCourses() {
    const [faculties, setFaculties] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedFaculty, setSelectedFaculty] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [studentId, setStudentId] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Fetch faculties from the API
    useEffect(() => {
        fetch('http://localhost:5000/api/faculties')
            .then((response) => response.json())
            .then((data) => setFaculties(data))
            .catch((error) => console.error('Error fetching faculties:', error));
    }, []);

    // Fetch courses when a faculty is selected
    useEffect(() => {
        if (selectedFaculty) {
            fetch(`http://localhost:5000/api/courses/${selectedFaculty}`)
                .then((response) => response.json())
                .then((data) => setCourses(data))
                .catch((error) => console.error('Error fetching courses:', error));
        } else {
            setCourses([]); // Reset courses if no faculty is selected
        }
    }, [selectedFaculty]);

    // Submit application to the API
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        // Validate inputs
        if (!selectedCourse || !studentId) {
            setError('Please fill in all fields.');
            return;
        }

        // Call API to submit application
        fetch('http://localhost:5000/api/apply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                student_id: studentId,
                course_id: selectedCourse,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to submit application');
                }
                return response.json();
            })
            .then(() => {
                setSuccess(true);
                setSelectedCourse('');
                setSelectedFaculty('');
                setStudentId('');
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    return (
        <div>
            <h2>Apply for Courses</h2>
            {success && <div className="success-message">Application submitted successfully!</div>}
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Student ID:
                        <input
                            type="number"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Faculty:
                        <select
                            value={selectedFaculty}
                            onChange={(e) => setSelectedFaculty(e.target.value)}
                            required
                        >
                            <option value="">Select a Faculty</option>
                            {faculties.map((faculty) => (
                                <option key={faculty.id} value={faculty.id}>
                                    {faculty.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Course:
                        <select
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                            required
                        >
                            <option value="">Select a Course</option>
                            {courses.length > 0 ? (
                                courses.map((course) => (
                                    <option key={course.id} value={course.id}>
                                        {course.name}
                                    </option>
                                ))
                            ) : (
                                <option value="">No courses available</option>
                            )}
                        </select>
                    </label>
                </div>
                <button type="submit">Submit Application</button>
            </form>
        </div>
    );
}

export default ApplyForCourses;
