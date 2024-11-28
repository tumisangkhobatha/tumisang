// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./components/Auth/Welcome";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import AdminDashboard from "./components/Dashboards/AdminDashboard";
import StudentDashboard from "./components/Dashboards/StudentDashboard";
import InstitutionDashboard from "./components/Dashboards/InstitutionDashboard";
import ManageInstitutions from "./components/ManageInstitutions";
import ManageFaculties from "./components/ManageFaculties";
import ManageCourses from "./components/ManageCourses";
import ViewApplications from "./components/ViewApplication"; 
import ApplyForCourses from "./components/ApplyForCourses"; 
import ViewAdmissions from "./components/ViewAdmissions"; 

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/student/dashboard" element={<StudentDashboard />} />
                <Route path="/institution/dashboard" element={<InstitutionDashboard />} />
                <Route path="/manage-institutions" element={<ManageInstitutions />} />
                <Route path="/manage-faculties" element={<ManageFaculties />} />
                <Route path="/manage-courses" element={<ManageCourses />} />
                <Route path="/view-applications" element={<ViewApplications />} /> {/* New route for ViewApplications */}
                <Route path="/apply-for-courses" element={<ApplyForCourses />} /> {/* New route for ApplyForCourses */}
                <Route path="/view-admissions" element={<ViewAdmissions />} /> {/* New route for ViewAdmissions */}
            </Routes>
        </Router>
    );
}

export default App;
