// src/extra/Announcement.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './announcement.css'; // Add your CSS styles for the announcement page

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await axios.get('http://localhost:8800/api/announcements');
        setAnnouncements(res.data);
      } catch (err) {
        console.error("Error fetching announcements:", err);
      }
    };
    fetchAnnouncements();
  }, []);

  return (
    <div className="announcementContainer">
      <h2 className="announcementTitle">Announcements</h2>
      {announcements.length > 0 ? (
        announcements.map((announcement) => (
          <div key={announcement._id} className="announcementCard">
            <h3 className="announcementCardTitle">{announcement.title}</h3>
            <p className="announcementCardDescription">{announcement.description}</p>
            <small className="announcementYear">Year: {announcement.year}</small>
            {announcement.attachments.length > 0 && (
              <ul className="attachmentList">
                {announcement.attachments.map((attachment, index) => (
                  <li key={index}>
                    <a href={attachment} target="_blank" rel="noopener noreferrer">{attachment}</a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      ) : (
        <p>No announcements available.</p>
      )}
    </div>
  );
};

export default Announcement;
