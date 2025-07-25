
import React, { useState } from 'react';
import ButtonComponent from '../../Components/ButtonComponent';
import AdminSidebar from '../../Components/Admin/AdminSidebar';
const AddPlace = () => {
  const [formData, setFormData] = useState({
    location: '',
    area: '',
    pincode: '',
    slots: '',
    price: '',
    
    image: null,
  });

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(formData); // Replace with your submit logic
  };

  return (

    
     <div className="flex  bg-white text-gray-700 p-10 bg-gray-100 min-h-screen overflow-hidden">
       <aside className="w-64">
        <AdminSidebar/>
      </aside>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-xl rounded-xl p-10 max-w-6xl mx-auto"
      >
        {/* Left section */}
        <div className="space-y-6">
          <div>
            <label className="block text-gray-800 font-medium mb-1"> Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-gray-800 font-medium mb-1"> Area</label>
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
              <label className="block text-gray-800 font-medium mb-1"> Slots</label>
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
        <div className="md:col-span-2 text-center pt-6">
         <ButtonComponent title='Add Place' onPress={(e)=> window.alert("place added")}/>
        </div>
      </form>
    </div>
  );
};

export default AddPlace;
