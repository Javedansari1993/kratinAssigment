import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import "./App.css";
import myAxios from "./my-axios";
import UserProfile from "./components/UserProfile";
import Footer from "./components/Footer";

const App = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    // Check if a user token is stored in local storage
    const token = localStorage.getItem("token");

    if (token) {
      // Fetch user data using the stored token
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await myAxios.get("api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const userData = response.data;
        setUser(userData);
      } else {
        console.log("Invalid token or error occurred");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await myAxios.post("api/users/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        fetchUserData(token);
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = async () => {
    try {
      if (mobileNumber.length !== 10) {
        console.log("Mobile number should be 10 digits long");
        return;
      }
      const response = await myAxios.post("api/users/register", {
        name,
        email,
        password,
        mobileNumber,
      });
      setNotification(response.data.message);
      if (response.status === 200) {
        console.log("User registered successfully");
        handleLogin();
      } else {
        console.log("Registration failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    // Clear the token from localStorage and reset the user state
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <div>
      <Router>
        <Header user={user} handleLogout={handleLogout} />
        <div className="container">
          <Routes>
            <Route path="/" element={<Outlet />}>
              <Route
                path="/"
                element={
                  user ? (
                    <Navigate to="/dashboard" replace={true} />
                  ) : (
                    <Login
                      email={email}
                      password={password}
                      setEmail={setEmail}
                      setPassword={setPassword}
                      handleLogin={handleLogin}
                    />
                  )
                }
              />
              <Route
                path="/signup"
                element={
                  user ? (
                    <Navigate to="/dashboard" replace={true} />
                  ) : (
                    <Signup
                      notification={notification}
                      name={name}
                      email={email}
                      password={password}
                      mobileNumber={mobileNumber}
                      setName={setName}
                      setEmail={setEmail}
                      setPassword={setPassword}
                      setMobileNumber={setMobileNumber}
                      handleRegister={handleRegister}
                    />
                  )
                }
              />
            </Route>
            <Route
              path="/dashboard"
              element={
                user ? (
                  <Dashboard
                    user={user}
                    handleLogout={handleLogout}
                    setUser={setUser}
                  />
                ) : (
                  <Navigate to="/" replace={true} />
                )
              }
            />
            {user && (
              <Route
                path="/UserProfile"
                element={<UserProfile user={user} />}
              />
            )}
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
