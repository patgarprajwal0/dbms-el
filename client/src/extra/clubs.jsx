import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './clubs.css'; // Add your CSS styles for the organization page

const StudentOrganization = () => {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const res = await axios.get('http://localhost:8800/api/clubs');
        setOrganizations(res.data);
      } catch (err) {
        console.error('Error fetching student organizations:', err);
      }
    };
    fetchOrganizations();
  }, []);

  return (
    <div className="organizationContainer">
      <h2 className="organizationTitle">Student Organizations</h2>
      {organizations.length > 0 ? (
        organizations.map((organization) => (
          <div key={organization._id} className="organizationCard">
            <h3 className="organizationCardTitle">{organization.name}</h3>
            <p className="organizationCardDescription">{organization.description}</p>
            <small className="organizationYear">Established: {organization.year}</small>
            {organization.links && organization.links.length > 0 && (
              <ul className="linkList">
                {organization.links.map((link, index) => (
                  <li key={index}>
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      {`Visit ${organization.name} Page ${index + 1}`}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      ) : (
        <p>No student organizations available.</p>
      )}
    </div>
  );
};

export default StudentOrganization;
