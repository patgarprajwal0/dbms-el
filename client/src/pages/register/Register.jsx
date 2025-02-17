import "./register.css";
import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  axios.defaults.baseURL = "http://localhost:8800/api";
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const year = useRef();
  const teacherRole = useRef(); // For teacher-specific role selection
  const department = useRef();
  const des = useRef();
  const usn = useRef();
  const [userType, setUserType] = useState("student");
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity("Passwords do not match!");
    } else if (!email.current.value.endsWith("@rvce.edu.in")) {
      email.current.setCustomValidity("Email should end with @rvce.edu.in");
    } else {
      const user = {
        username: username.current?.value || "",
        email: email.current?.value || "",
        password: password.current?.value || "",
        des: des.current?.value || "",
        year: userType === "student" ? year.current?.value || "" : teacherRole.current?.value || "",
        department: department.current?.value || "",
        usn: userType === "student" ? usn.current?.value || "" : "",
        isAdmin: userType === "teacher", // Set isAdmin for teacher
      };
      try {
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">RVCE</h3>
          <span className="loginDesc">Connect with college</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <select
              required
              className="loginInput"
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
            <input placeholder="Username" required ref={username} className="loginInput" />
            <input placeholder="RVCE mail id" required ref={email} className="loginInput" type="email" />
            <input placeholder="Password" required ref={password} className="loginInput" type="password" minLength="6" />
            <input placeholder="Password again" required ref={passwordAgain} className="loginInput" type="password" />
            <select required ref={department} className="loginInput">
              <option value="" disabled selected hidden>
                Select Department
              </option>
              <option value="CSE">CSE</option>
              <option value="ISE">ISE</option>
              <option value="DS">DS</option>
              <option value="EC">EC</option>
              <option value="ET">ET</option>
              <option value="EI">EI</option>
            </select>
            <input
              placeholder="Description (e.g., Cricket player, AI Enthusiast, etc.)"
              ref={des}
              className="loginInput"
            />
            {userType === "student" && (
              <>
                <select required ref={year} className="loginInput">
                  <option value="" disabled selected hidden>
                    Select Year
                  </option>
                  <option value="I">I</option>
                  <option value="II">II</option>
                  <option value="III">III</option>
                  <option value="IV">IV</option>
                </select>
                <input placeholder="USN" required ref={usn} className="loginInput" />
              </>
            )}
            {userType === "teacher" && (
              <select required ref={year} className="loginInput">
                <option value="" disabled selected hidden>
                  Select Role
                </option>
                <option value="Staff">Staff</option>
                <option value="Assistant Professor">Assistant Professor</option>
                <option value="HOD">HOD</option>
              </select>
            )}
            <button className="loginButton" type="submit">
              Sign up
            </button>
            <button className="loginRegistrationButton" onClick={handleLoginClick}>
              Log in into your account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
