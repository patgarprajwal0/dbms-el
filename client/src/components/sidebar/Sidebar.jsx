import React from './sidebar.css'
import { Link } from 'react-router-dom';
import {
  Campaign,
  Class,
  Assignment,
  Work,
  Event,
  Group,
  LibraryBooks,
  QuestionAnswer,
  PeopleAlt,
  BusinessCenter,
} from "@mui/icons-material";

import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
        <Link to="/Announcements">
            <li className="sidebarListItem">
              <Campaign className="sidebarIcon" />
              <span className="sidebarListItemText">Announcements </span>
            </li>
          </Link>
        <Link to="/department">
            <li className="sidebarListItem">
              <Class className="sidebarIcon" />
              <span className="sidebarListItemText">Department </span>
            </li>
          </Link>
          <Link to="/Projects">
            <li className="sidebarListItem">
              <Assignment className="sidebarIcon" />
              <span className="sidebarListItemText">Projects</span>
            </li>
          </Link>
          <Link to="/Internships">
            <li className="sidebarListItem">
              <Work className="sidebarIcon" />
              <span className="sidebarListItemText">Internships</span>
            </li>
          </Link>
          <Link to="/Events">
            <li className="sidebarListItem">
              <Event className="sidebarIcon" />
              <span className="sidebarListItemText">Events</span>
            </li>
          </Link>
          <Link to="/Clubs">
            <li className="sidebarListItem">
              <Group className="sidebarIcon" />
              <span className="sidebarListItemText">Clubs</span>
            </li>
          </Link>
          <Link to="/About">
            <li className="sidebarListItem">
              <LibraryBooks className="sidebarIcon" />
              <span className="sidebarListItemText">About RVCE</span>
            </li>
          </Link>
          <li className="sidebarListItem">
  <a
    href="http://localhost:8501/"
    target="_blank"
    rel="noopener noreferrer"
    className="sidebarLink"
  >
    <QuestionAnswer className="sidebarIcon" />
    <span className="sidebarListItemText">Q&A Forums</span>
  </a>
</li>
          <Link to={"AlumniNetwork"}>
            <li className="sidebarListItem">
              <PeopleAlt className="sidebarIcon" />
              <span className="sidebarListItemText">Alumni Network</span>
            </li>
          </Link>
          <Link to={"PlacementCell"}>
            <li className="sidebarListItem">
              <BusinessCenter className="sidebarIcon" />
              <span className="sidebarListItemText">Placement Cell</span>
            </li>
          </Link>
        </ul>
        <button className="sidebarButton">Show more</button>
        <hr className="sidebarHr" />
        {/* <ul className="sidebarFriendList">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul> */}
      </div>
    </div>
  );
}
