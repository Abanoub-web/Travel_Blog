import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for user in localStorage when the app loads
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handlelogin = (loginData) => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if any user data matches the login data
    const foundUser = storedUsers.find(
      user =>
        (user.email === loginData.username || user.username === loginData.username) &&
        user.password === loginData.password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      return true;  // Login successful
    } else {
      return false; // Login failed
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, handlelogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);