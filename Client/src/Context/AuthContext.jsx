// context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { loginService, signupService, updateUserService } from "../Services/AuthService";


const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
 
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
        toast.success(`Welcome back, ${parsedUser.userName}!`);
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const data = await loginService(email, password);

      const userData = {
        id: data.id,
        userName: data.userName,
        email: data.email,
        userRole: data.userRole,
        phone: data.phone,
        img: data.img,
        vehicles: data.vehicles || []
      };

      setUser(userData);
      setIsAuthenticated(true);

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", data.token);

      toast.success(`Welcome, ${userData.userName}!`);
      return { success: true, user: userData };
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed. Please check your credentials.");
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    try {
      setLoading(true);
      await signupService(userData);
      toast.success("Account created successfully! Please login.");
      return { success: true };
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.response?.data?.message || "Signup failed. Please try again.");
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.info("You have been logged out.");
  };

  const updateUser = async (updatedUserData,id) => {
    try {
      const token = localStorage.getItem("token");
      const data = await updateUserService(updatedUserData, token, id);
      console.log("updatedUserData" , updatedUserData)
      const newUserData = { ...user, ...updatedUserData };
      setUser(newUserData);
      console.log("Updated user data:", newUserData);
      localStorage.setItem("user", JSON.stringify(newUserData));
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed.");
    }
  };

  const hasRole = (requiredRole) => {
    if (!user) return false;
    const roleHierarchy = { ADMIN: 2, USER: 1 };
    return (roleHierarchy[user.userRole] || 0) >= (roleHierarchy[requiredRole] || 0);
  };

  const isAdmin = () => hasRole("ADMIN");
  const isUser = () => hasRole("USER");

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated, login, signup, logout, updateUser, hasRole, isAdmin, isUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
