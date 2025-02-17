import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Internships.css'; // CSS for styling

const Internships = () => {
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await axios.get('http://localhost:8800/api/internships');
        setInternships(res.data);
      } catch (err) {
        console.error("Error fetching internships:", err);
      }
    };
    fetchInternships();
  }, []);

  return (
    <div className="internshipsContainer">
      <h2 className="internshipsTitle">Available Internships</h2>
      {internships.length > 0 ? (
        internships.map((internship) => (
          <div key={internship._id} className="internshipCard">
            <h3 className="internshipCardTitle">{internship.title}</h3>
            <p className="internshipCardCompany">Company: {internship.company}</p>
            <p className="internshipCardDescription">{internship.description}</p>
            <p className="internshipDuration">Duration: {internship.duration}</p>
            <p className="internshipLocation">Location: {internship.location}</p>
          </div>
        ))
      ) : (
        <p>No internships available at the moment.</p>
      )}
    </div>
  );
};

export default Internships;
