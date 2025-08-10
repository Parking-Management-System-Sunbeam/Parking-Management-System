import React, { useEffect, useState } from "react";
import Listing from "../../Components/Listing";
import ButtonComponent from "../../Components/ButtonComponent";
import AdminSidebar from "../../Components/Admin/AdminSidebar";
import { deleteLocation, getAllLocations, updateLocation } from "../../Services/placeService";
import { toast } from "react-toastify";

const EditPlace = () => {
  const [locations, setLocations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [formData, setFormData] = useState({
    location: "",
    area: "",
    slots: "",
    price: "",
    types: "",
    image: null,
  });

  // Fetch locations on mount
  useEffect(() => {
    (async () => {
      try {
        const data = await getAllLocations();
        setLocations(data);
        console.log(locations)
      } catch (err) {
        console.error("Error fetching locations:", err);
      }
    })();
  }, []);

 const openEditModal = (loc) => {
  setSelectedLocation(loc);

  setFormData({
    location: loc.location_name || "",
    area: loc.area || "", // if you have area in loc, else "" or loc.location_detail
    pincode: loc.pincode || "",
    slots: loc.slots ? loc.slots.length : "", // assuming slots array, use length or number
    price: loc.price || "",
    image: "", // no file initially
    vehicleTypes: loc.vehicleTypes || ["TWO_WHEELER"],
    description: loc.description || "",
  });

  setIsModalOpen(true);
};

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

 const handleSave = async (e) => {
  e.preventDefault();
  try {
   await updateLocation(selectedLocation.id, {
  locationName: formData.location,
  locationDetail: formData.area,
  numberOfSlots: Number(formData.slots),
  price: Number(formData.price),
  pincode: formData.pincode,  
  vehicleTypes: formData.vehicleTypes,  
  description: formData.description, 
});
    toast.success("Changes saved!");
    setIsModalOpen(false);
  } catch (err) {
    console.error("Error saving:", err);
    toast.error("Failed to save changes");
  }
};

  const handleVehicleTypeChange = e => {
    setFormData({ ...formData, vehicleTypes: [e.target.value] });
  };

  const handleDelete = async () => {
  if (!selectedLocation) return;
  try {
    await deleteLocation(selectedLocation.id);
    toast.success("Place deleted!");
    setIsModalOpen(false);
    // Optionally refresh list after delete:
    const data = await getAllLocations();
    setLocations(data);
  } catch (error) {
    toast.error("Failed to delete place");
  }
};
  return (
    <div className="flex min-h-screen bg-white text-gray-700">
      {/* Sidebar */}
      <aside className="w-64">
        <AdminSidebar />
      </aside>

      {/* Main content */}
      <div className="flex-1 p-10">
        {/* List of user's places */}
        <h2 className="text-xl font-bold mb-6">My Added Locations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {locations.map((loc) => (
            <div key={loc.id} onClick={() => openEditModal(loc)}>
              <Listing data={loc} />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
    className="fixed inset-0 bg-black/50  flex justify-center items-center z-50"
    style={{ backdropFilter: 'blur(2px)' }} 
  >
    <div className="   p-8 rounded-lg w-full max-w-2xl mx-4">
      
       <form
  onSubmit={handleSave}
  className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white  shadow-xl rounded-xl p-10 max-w-6xl mx-auto"
>
  {/* Left section */}
  <div className="space-y-6">
    <div>
      <label className="block text-gray-800 font-medium mb-1">Location</label>
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </div>

    <div>
      <label className="block text-gray-800 font-medium mb-1">Description</label>
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </div>

    <div>
      <label className="block text-gray-800 font-medium mb-1">Area</label>
      <input
        type="text"
        name="area"
        value={formData.area}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </div>

    <div className="flex gap-4">
      <div className="flex-1">
        <label className="block text-gray-800 font-medium mb-1">Slots</label>
        <input
          type="number"
          name="slots"
          value={formData.slots}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />
      </div>

      <div className="flex-1">
        <label className="block text-gray-800 font-medium mb-1">Price/hr</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />
      </div>
    </div>

    <div>
      <label className="block text-gray-800 font-medium mb-1">Pincode</label>
      <input
        type="text"
        name="pincode"
        value={formData.pincode}
        onChange={handleChange}
        className="w-full border border-blue-400 text-blue-800 rounded-lg px-4 py-2 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <div>
      <label className="block text-gray-800 font-medium mb-1">Vehicle Type</label>
      <select
        name="vehicleType"
        value={formData.vehicleTypes[0]}
        onChange={handleVehicleTypeChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        <option value="TWO_WHEELER">Two Wheeler</option>
        <option value="FOUR_WHEELER">Four Wheeler</option>
        <option value="BOTH">Both</option>
      </select>
    </div>
  </div>

  {/* Right section */}
  <div className="flex flex-col items-center justify-center gap-4">
    <label className="text-gray-700 font-medium">🖼️ Add Image</label>
    <div className="w-52 h-52 border-2 border-dashed border-gray-400 flex items-center justify-center rounded-lg relative">
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        className="opacity-0 absolute w-full h-full cursor-pointer"
      />
      {formData.image ? (
        <img
          src={URL.createObjectURL(formData.image)}
          alt="preview"
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <span className="text-gray-400">Click to Upload</span>
      )}
    </div>
  </div>

  {/* Submit */}
  <div className="md:col-span-2 text-center pt-6 flex justify-between items-center">
    <ButtonComponent title="Update Place" onPress={handleSave} />
 <button
      type="button"
      onClick={handleDelete}
      className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Delete Place
    </button>   <button
      type="button"
      onClick={() => setIsModalOpen(false)}
      className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
    >Close</button> </div>
</form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPlace;
