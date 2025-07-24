import React from 'react';
import DataTable from 'react-data-table-component';

const data = [
  { id: 1, user: 'John Doe', price: 100, vehicleType: 'Car', slot: '9:00 AM - 10:00 AM', status: 'Booked' },
  { id: 2, user: 'Jane Smith', price: 80, vehicleType: 'Bike', slot: '10:00 AM - 11:00 AM', status: 'Available' },
  { id: 3, user: 'Raj Patel', price: 120, vehicleType: 'SUV', slot: '11:00 AM - 12:00 PM', status: 'Booked' },
  { id: 4, user: 'Aisha Khan', price: 90, vehicleType: 'Sedan', slot: '12:00 PM - 1:00 PM', status: 'Cancelled' },
  { id: 5, user: 'Nikhil Sharma', price: 150, vehicleType: 'Van', slot: '1:00 PM - 2:00 PM', status: 'Booked' },
  { id: 6, user: 'Sneha Reddy', price: 70, vehicleType: 'Bike', slot: '2:00 PM - 3:00 PM', status: 'Available' },
  { id: 7, user: 'Vikram Rao', price: 200, vehicleType: 'Truck', slot: '3:00 PM - 4:00 PM', status: 'Cancelled' },
  { id: 8, user: 'Priya Jain', price: 110, vehicleType: 'Car', slot: '4:00 PM - 5:00 PM', status: 'Booked' },
  { id: 9, user: 'Rahul Mehra', price: 95, vehicleType: 'SUV', slot: '5:00 PM - 6:00 PM', status: 'Available' },
  { id: 10, user: 'Anjali Verma', price: 85, vehicleType: 'Sedan', slot: '6:00 PM - 7:00 PM', status: 'Booked' },
  { id: 4, user: 'Aisha Khan', price: 90, vehicleType: 'Sedan', slot: '12:00 PM - 1:00 PM', status: 'Cancelled' },
  { id: 5, user: 'Nikhil Sharma', price: 150, vehicleType: 'Van', slot: '1:00 PM - 2:00 PM', status: 'Booked' },
  { id: 6, user: 'Sneha Reddy', price: 70, vehicleType: 'Bike', slot: '2:00 PM - 3:00 PM', status: 'Available' },
  { id: 7, user: 'Vikram Rao', price: 200, vehicleType: 'Truck', slot: '3:00 PM - 4:00 PM', status: 'Cancelled' },
  { id: 8, user: 'Priya Jain', price: 110, vehicleType: 'Car', slot: '4:00 PM - 5:00 PM', status: 'Booked' },
  { id: 8, user: 'Priya Jain', price: 110, vehicleType: 'Car', slot: '4:00 PM - 5:00 PM', status: 'Booked' },
  { id: 9, user: 'Rahul Mehra', price: 95, vehicleType: 'SUV', slot: '5:00 PM - 6:00 PM', status: 'Available' },
  { id: 10, user: 'Anjali Verma', price: 85, vehicleType: 'Sedan', slot: '6:00 PM - 7:00 PM', status: 'Booked' },
  { id: 4, user: 'Aisha Khan', price: 90, vehicleType: 'Sedan', slot: '12:00 PM - 1:00 PM', status: 'Cancelled' },
  { id: 5, user: 'Nikhil Sharma', price: 150, vehicleType: 'Van', slot: '1:00 PM - 2:00 PM', status: 'Booked' },
  { id: 6, user: 'Sneha Reddy', price: 70, vehicleType: 'Bike', slot: '2:00 PM - 3:00 PM', status: 'Available' },
  { id: 7, user: 'Vikram Rao', price: 200, vehicleType: 'Truck', slot: '3:00 PM - 4:00 PM', status: 'Cancelled' },
  { id: 8, user: 'Priya Jain', price: 110, vehicleType: 'Car', slot: '4:00 PM - 5:00 PM', status: 'Booked' }

];

function handleDelete(id) {
  window.alert(`Delete booking` + id);
}



const columns = [
  { name: 'ID', selector: row => row.id },
  { name: 'User', selector: row => row.user},
  { name: 'Price', selector: row => `₹${row.price}`, sortable: true },
  { name: 'Vehicle Type', selector: row => row.vehicleType},
  { name: 'Slot', selector: row => row.slot },
  {
    name: 'Status',
    cell: row => (
      <span
        className={`px-2 py-1 text-xs font-semibold rounded-full ${
          row.status === 'Booked'
            ? 'bg-green-100 text-green-700'
            : row.status === 'Available'
            ? 'bg-blue-100 text-blue-700'
            : 'bg-red-100 text-red-700'
        }`}
      >
        {row.status}
      </span>
    ),
    sortable: true,
  },
  {
      name: 'Actions',
      cell: row => (
        <button
          onClick={() => handleDelete(row.id)}
          className="text-sm px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
        >
          Delete
        </button>
      )
    }
];

const AdminTable = () => {
  return (
    <div className="w-[90%] mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-2 text-gray-800">Booking Records</h2>
      <div className="bg-white rounded shadow p-4 overflow-x-auto">
        <DataTable
          columns={columns}
          data={data}
          pagination
          paginationPerPage={5} 
          dense
          highlightOnHover
          responsive
          striped
        />
      </div>
    </div>
  );
};

export default AdminTable;
