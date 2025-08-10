import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";

// Simple JWT decoder without extra packages
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

const Profile = () => {
  const token = localStorage.getItem("token");
  const decoded = token ? parseJwt(token) : null;
  const userId = decoded?.id || decoded?.userId || null;

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    userName: "",
    email: "",
    phone: "",
    img: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:9090/user/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch user data");
        const data = await res.json();

        setProfileData({
          userName: data.userName || "",
          email: data.email || "",
          phone: data.phone || "",
          img: data.img || null,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleSave = async () => {
    if (!userId) {
      setError("User not logged in");
      return;
    }

    setError(null);
    try {
      const response = await fetch(`http://localhost:9090/user/update/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${token}`, // if needed
        },
        body: JSON.stringify({
          userName: profileData.userName,
          email: profileData.email,
          phone: profileData.phone,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save profile");
      }

      const updatedUser = await response.json();

      setProfileData({
        userName: updatedUser.userName || profileData.userName,
        email: updatedUser.email || profileData.email,
        phone: updatedUser.phone || profileData.phone,
        img: updatedUser.img || profileData.img,
      });

      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  const fields = [
    { label: "Name", name: "userName", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Mobile", name: "phone", type: "text" },
  ];

  return (
    <div className="flex min-h-screen">
      <div className="w-1/5 min-h-screen">
        <Sidebar />
      </div>

      <div className="w-4/5 p-10 bg-gray-100">
        <h1 className="text-3xl font-semibold mb-6">Welcome, {profileData.userName}</h1>

        {profileData.img && (
          <img
            src={profileData.img}
            alt={`${profileData.userName}'s profile`}
            className="w-32 h-32 mb-6"
          />
        )}

        <div className="bg-white p-6 rounded-lg shadow-md max-w-xl space-y-6">
          {fields.map(({ label, name, type }) => (
            <div key={name}>
              <label className="font-medium">{label}:</label>
              {isEditing ? (
                <input
                  type={type}
                  name={name}
                  value={profileData[name]}
                  onChange={handleChange}
                  className="border border-gray-300 rounded p-2 w-full mt-1"
                />
              ) : (
                <p className="mt-1">{profileData[name]}</p>
              )}
            </div>
          ))}

          <div className="flex space-x-4 mt-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={toggleEdit}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={toggleEdit}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Edit Profile
              </button>
            )}
          </div>
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
