import React from 'react';

const AdminInsight = () => {
  // Static data for dashboard summary
  const totalSlots = 120;
  const availableSlots = 45;
  const bookedSlots = 65;
  const cancelledSlots = 10;

  return (
    <div>
    <div className="h-content bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-3">Admin Dashboard Insights</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <Card title="Total Slots" value={totalSlots} color="text-blue-600" />
          <Card title="Available Slots" value={availableSlots} color="text-green-600" />
          <Card title="Booked Slots" value={bookedSlots} color="text-purple-600" />
          {/* <Card title="Cancelled Slots" value={cancelledSlots} color="text-red-600" /> */}
        </div>
      </div>
    </div>
   

    </div>
  );
};

// Reusable card component
const Card = ({ title, value, color }) => (
  <div className="bg-white shadow rounded-xl p-6">
    <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
    <p className={`text-3xl font-bold ${color}`}>{value}</p>
  </div>
);

export default AdminInsight;
