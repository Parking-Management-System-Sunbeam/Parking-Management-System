import React, { useState } from 'react';
import { X } from 'lucide-react';
import ButtonComponent from '../../Components/ButtonComponent';
import Sidebar from '../../components/Sidebar';
import AdminSidebar from '../../Components/Admin/AdminSidebar';

const EditPlace = () => {
  const [formData, setFormData] = useState({
    location: '',
    area: '',
    slots: '',
    price: '',
    types: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="flex min-h-screen bg-white text-gray-700">
        
      <aside className="w-64">
        <AdminSidebar/>
      </aside>
      {/* Main Form */}
      <div className="flex-1 p-10">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Form Fields */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border border-gray-400 rounded-md px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="w-full border border-gray-400 rounded-md px-4 py-2"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Slots</label>
                <input
                  type="number"
                  name="slots"
                  value={formData.slots}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded-md px-4 py-2"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Price per hour</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full border border-gray-400 rounded-md px-4 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Types</label>
              <input
                type="text"
                name="types"
                value={formData.types}
                onChange={handleChange}
                className="w-full border border-gray-400 rounded-md px-4 py-2"
              />
            </div>
          </div>

          {/* Image & Delete */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-48 h-48 border border-gray-300 bg-gray-100 flex items-center justify-center relative">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {formData.image ? (
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-sm text-gray-500">Add Image</div>
              )}
            </div>
            <ButtonComponent title='Delete image' onPress={(e)=>window.alert("image delete")}/>
          </div>

          {/* Buttons */}
          <div className="col-span-2 flex justify-start gap-6 mt-8">
            <ButtonComponent title='Save Changes' onPress={(e)=> window.alert("Changes saved")}/>
            <ButtonComponent title='Cancel' onPress={(e)=>window.alert("cancelled")}/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPlace;
