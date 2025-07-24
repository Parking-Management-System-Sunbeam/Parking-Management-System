import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditPlace = () => {
  const { placeId } = useParams();
//   const navigate = useNavigate();

  const [formData, setFormData] = useState({
    location: '',
    area: '',
    pincode: '',
    slots: '',
    pricePerHour: '',
    type: '',
    photo: null,
  });

  useEffect(() => {
    // Replace with API call to fetch parking place by ID
    const fetchData = async () => {
      // Simulate data fetch
      const existingData = {
        location: 'MG Road',
        area: 'Shivajinagar',
        pincode: '411001',
        slots: '10',
        pricePerHour: '20',
        type: 'Car',
      };
      setFormData(existingData);
    };
    fetchData();
  }, [placeId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update data in backend here
    console.log("Updated data: ", formData);
    navigate('/admin/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Parking (ID: {placeId})</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* same input fields as AddParkingForm */}
        {[
          { name: 'location', label: 'Location' },
          { name: 'area', label: 'Area' },
          { name: 'pincode', label: 'Pincode', type: 'text' },
          { name: 'slots', label: 'Number of Slots', type: 'number' },
          { name: 'pricePerHour', label: 'Price per Hour (₹)', type: 'number' },
        ].map(({ name, label, type = 'text' }) => (
          <div key={name}>
            <label className="block font-medium text-gray-700 mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        ))}

        <div>
          <label className="block font-medium text-gray-700 mb-1">Vehicle Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Select type</option>
            <option value="Car">Car</option>
            <option value="Bike">Bike</option>
            <option value="Truck">Truck</option>
            <option value="SUV">SUV</option>
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Replace Photo</label>
          <input
            type="file"
            name="photo"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
          >
            Update Parking
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPlace;
