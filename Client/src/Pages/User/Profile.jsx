import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
import Sidebar from "../../components/Sidebar";
<<<<<<< HEAD
import img from "../../assets/profileImage.jpg"
=======
>>>>>>> 41fddb8aaa4aaeec9b7351e428c2fca17b2ecfef

const Profile = () => {
  const { user, loading, updateUser } = useAuth();

<<<<<<< HEAD
  
=======
>>>>>>> 41fddb8aaa4aaeec9b7351e428c2fca17b2ecfef
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    userName: "",
    email: "",
    phone: "",
<<<<<<< HEAD
    img: img,
=======
    img: null,
>>>>>>> 41fddb8aaa4aaeec9b7351e428c2fca17b2ecfef
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setProfileData({
        userName: user.userName || "",
        email: user.email || "",
        phone: user.phone || "",
        img: user.img || null,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleEdit = () => {
    setError(null);
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    if (!user) {
      setError("User not logged in");
      return;
    }
    setError(null);
    try {
      const res =
<<<<<<< HEAD
      await updateUser(profileData, user.id);
=======
      await updateUser(profileData);
>>>>>>> 41fddb8aaa4aaeec9b7351e428c2fca17b2ecfef
      console.log(res)
      setIsEditing(false);
    } catch (err) {
      setError(err.message || "Failed to save profile");
    }
  };

  if (loading) return <p>Loading user data...</p>;
  if (!user) return <p>User not logged in</p>;

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
<<<<<<< HEAD
            src={img}
            
=======
            src={profileData.img}
            alt={`${profileData.userName}'s profile`}
>>>>>>> 41fddb8aaa4aaeec9b7351e428c2fca17b2ecfef
            className="w-32 h-32 rounded-full mb-6"
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

<<<<<<< HEAD
export default Profile;
=======
export default Profile;
>>>>>>> 41fddb8aaa4aaeec9b7351e428c2fca17b2ecfef
