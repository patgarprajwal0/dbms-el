import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './department.css'; // CSS styles for the department page

const Department = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get('http://localhost:8800/api/departments');
        setDepartments(res.data);
      } catch (err) {
        console.error("Error fetching departments:", err);
      }
    };
    fetchDepartments();
  }, []);

  return (
    <div className="departmentContainer">
      <h2 className="departmentTitle">Departments</h2>
      {departments.length > 0 ? (
        departments.map((department) => (
          <div key={department._id} className="departmentCard">
            <h3 className="departmentName">{department.name}</h3>
            <p className="departmentDescription">{department.description}</p>
            <p className="departmentHead"><strong>Head:</strong> {department.head}</p>
            <p className="departmentContact">
              <strong>Email:</strong> {department.contact.email} <br />
              <strong>Phone:</strong> {department.contact.phone}
            </p>
            <p className="departmentEstablishedYear"><strong>Established:</strong> {department.establishedYear}</p>
            {department.courses.length > 0 && (
              <div className="departmentCourses">
                <strong>Courses Offered:</strong>
                <ul>
                  {department.courses.map((course, index) => (
                    <li key={index}>{course}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No departments available.</p>
      )}
    </div>
  );
};

export default Department;
