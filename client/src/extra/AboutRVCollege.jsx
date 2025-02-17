import React from 'react';
import './AboutRVCollege.css'; // Importing the CSS for styling

const AboutRVCollege = () => {
  return (
    <div className="aboutContainer">
      <div className="heroSection">
        <h1 className="heroTitle">About RV College of Engineering</h1>
        <p className="heroSubtitle">
          One of the premier engineering institutions in India, fostering excellence in education, research, and innovation.
        </p>
      </div>

      <div className="contentSection">
        <h2 className="sectionTitle">History and Legacy</h2>
        <p className="sectionText">
          Established in 1963, RV College of Engineering (RVCE) has been at the forefront of technical education in India. Located in Bangalore, RVCE is known for its strong focus on academics, industry collaboration, and co-curricular excellence. The institution has nurtured countless engineers who have gone on to make significant contributions globally.
        </p>

        <h2 className="sectionTitle">Vision and Mission</h2>
        <p className="sectionText">
          The vision of RV College is to become a leading institution recognized for its excellence in technical education, research, and innovation. Its mission is to provide a conducive environment for learning and to foster creativity, critical thinking, and innovation.
        </p>

        <h2 className="sectionTitle">Facilities and Campus Life</h2>
        <p className="sectionText">
          RVCE offers state-of-the-art infrastructure, well-equipped labs, a library with an extensive collection of resources, and vibrant campus life. The college encourages students to participate in various technical, cultural, and sports activities, promoting holistic development.
        </p>

        <h2 className="sectionTitle">Notable Achievements</h2>
        <p className="sectionText">
          Over the years, RVCE has received numerous accolades for its academic and research excellence. The institution ranks among the top engineering colleges in India and is consistently recognized for its innovative projects and contributions to society.
        </p>
      </div>
    </div>
  );
};

export default AboutRVCollege;
