// import React from 'react'
// import { useState } from 'react';
// function Addplace() {

//     const [formData, setFormData] = useState({
//     location: '',
//     area: '',
//     pincode: '',
//     slots: '',
//     pricePerHour: '',
//     type: '',
//     photo: null,
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission (e.g., send to backend)
//     console.log(formData);
//   };
//   return (
//     <>
//     <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
//       <h2 className="text-2xl text-center font-semibold mb-6 text-gray-800">Add New Parking</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block font-medium text-gray-700 mb-1">Location</label>
//           <input
//             type="text"
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             placeholder="e.g. MG Road"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-medium text-gray-700 mb-1">Area</label>
//           <input
//             type="text"
//             name="area"
//             value={formData.area}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             placeholder="e.g. Shivajinagar"
//             required
//           />
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <label className="block font-medium text-gray-700 mb-1">Pincode</label>
//             <input
//               type="text"
//               name="pincode"
//               value={formData.pincode}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="e.g. 411001"
//               required
//             />
//           </div>
//           <div>
//             <label className="block font-medium text-gray-700 mb-1">Number of Slots</label>
//             <input
//               type="number"
//               name="slots"
//               value={formData.slots}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               min="1"
//               required
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <label className="block font-medium text-gray-700 mb-1">Price per Hour (₹)</label>
//             <input
//               type="number"
//               name="pricePerHour"
//               value={formData.pricePerHour}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               min="0"
//               required
//             />
//           </div>
//           <div>
//             <label className="block font-medium text-gray-700 mb-1">Vehicle Type</label>
//             <select
//               name="type"
//               value={formData.type}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               required
//             >
//               <option value="">Select type</option>
//               <option value="Car">Car</option>
//               <option value="Bike">Bike</option>
//               <option value="Truck">Truck</option>
//               <option value="SUV">SUV</option>
//             </select>
//           </div>
//         </div>

//         <div>
//           <label className="block font-medium text-gray-700 mb-1">Upload Photo</label>
//           <input
//             type="file"
//             name="photo"
//             accept="image/*"
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
//             required
//           />
//         </div>

//         <div className="text-center">
//           <button
//             type="submit"
//             className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
//           >
//             Add Parking
//           </button>
//         </div>
//       </form>
//     </div>
//     </>
//   )
// }

// export default Addplace

import React, { useState } from 'react';

const AddPlace = () => {
  const [formData, setFormData] = useState({
    location: '',
    area: '',
    pincode: '',
    slots: '',
    price: '',
    types: '',
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
     <div className="p-10 bg-gray-100 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-xl rounded-xl p-10 max-w-6xl mx-auto"
      >
        {/* Left section */}
        <div className="space-y-6">
          <div>
            <label className="block text-gray-800 font-medium mb-1">📍 Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-gray-800 font-medium mb-1">🏙️ Area</label>
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
              <label className="block text-gray-800 font-medium mb-1">🚗 Slots</label>
              <input
                type="number"
                name="slots"
                value={formData.slots}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>

            <div className="flex-1">
              <label className="block text-gray-800 font-medium mb-1">💰 Price/hr</label>
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
            <label className="block text-gray-800 font-medium mb-1">📮 Pincode</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="w-full border border-blue-400 text-blue-800 rounded-lg px-4 py-2 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-800 font-medium mb-1">🚙 Vehicle Types</label>
            <select
              name="types"
              value={formData.types}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50"
            >
              <option value="">Select Type</option>
              <option value="Car">Car</option>
              <option value="Bike">Bike</option>
              <option value="EV">Electric Vehicle</option>
              <option value="Truck">Truck</option>
              <option value="Other">Other</option>
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
        <div className="md:col-span-2 text-center pt-6">
          <button
            type="submit"
            className="bg-indigo-500 text-white font-semibold px-8 py-3 rounded-full hover:bg-indigo-600 transition"
          >
            ➕ Add Parking
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPlace;
