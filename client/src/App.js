import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route,redirect } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Extra from "./extra/announcement";
import Dept from "./extra/department";
import Club from "./extra/clubs";
import Event from "./extra/UpcomingEvents";
import Internship from "./extra/Internships";
import About from "./extra/AboutRVCollege";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

//dede 
export default function App() {

  const {user} = useContext(AuthContext)
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={user?<Home />:<Register/>} />
        <Route path="/login" element={user?<Home />:<Login />} />
        <Route path="/register" element={user?<Home />:<Register />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/Announcements" element={<Extra />} />
        <Route path="/Department" element={<Dept />} />
        <Route path="/Clubs" element={<Club />} />
        <Route path="/Events" element={<Event />} />
        <Route path="/Internships" element={<Internship />} />
        <Route path="/About" element={<About />} />
      </Route>
      </Routes>
    </BrowserRouter>
  );
}
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);
