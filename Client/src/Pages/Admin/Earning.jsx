import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AdminSidebar from '../../Components/Admin/AdminSidebar';

const Earning = () => {
  const [viewType, setViewType] = useState('monthly');
  const [locationId, setLocationId] = useState('1');
  const [earningsData, setEarningsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  // Complete earnings data structure
  const mockData = {
    monthly: [
      { period: 'Jan', earnings: 120 },
      { period: 'Feb', earnings: 150 },
      { period: 'Mar', earnings: 170 },
      { period: 'Apr', earnings: 140 },
      { period: 'May', earnings: 180 },
      { period: 'Jun', earnings: 200 },
      { period: 'Jul', earnings: 190 },
      { period: 'Aug', earnings: 220 },
      { period: 'Sep', earnings: 210 },
      { period: 'Oct', earnings: 250 },
      { period: 'Nov', earnings: 230 },
      { period: 'Dec', earnings: 270 },
    ],
    yearly: [
      { period: '2020', earnings: 180 },
      { period: '2021', earnings: 220 },
      { period: '2022', earnings: 2500 },
      { period: '2023', earnings: 280 },
      { period: '2024', earnings: 310 },
    ],
    overall: [
      { period: 'Total Lifetime', earnings: 12300 }
    ]
  };

  // Load earnings data
  const loadEarningsData = async (type) => {
    setLoading(true);
    setError(null);
    
    try {
      let data;
      
      // Mock API delay for realistic loading experience
      await new Promise(resolve => setTimeout(resolve, 500));
      data = mockData[type];
      
      setEarningsData(data);
      
      // Calculate total
      const total = data.reduce((sum, item) => sum + item.earnings, 0);
      setTotalAmount(total);
      
    } catch (err) {
      setError(err.message);
      console.error('Failed to load earnings data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load data when component mounts or filters change
  useEffect(() => {
    loadEarningsData(viewType, locationId);
  }, [viewType, locationId]);

  // Handle view type change
  const handleViewTypeChange = (type) => {
    setViewType(type);
  };

  // Handle location change
  const handleLocationChange = (e) => {
    setLocationId(e.target.value);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Get chart height based on view type
  const getChartHeight = () => {
    switch (viewType) {
      case 'overall':
        return 200;
      case 'yearly':
        return 300;
      default:
        return 350;
    }
  };



  return (
    <div className='flex'>
      <aside className="w-64">
        <AdminSidebar/>
      </aside>
      
      <div className='flex flex-col w-full'>
        <main className="p-10">
          {/* <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Earnings Overview</h1> */}
          
          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center items-center">
            {/* View Type Selector */}
            <div className="flex gap-2">
              <button
                onClick={() => handleViewTypeChange('monthly')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewType === 'monthly'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => handleViewTypeChange('yearly')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewType === 'yearly'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Yearly
              </button>
              <button
                onClick={() => handleViewTypeChange('overall')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewType === 'overall'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Overall
              </button>
            </div>
            
            {/* Location Selector */}
            <div className="flex items-center gap-2">
              <label htmlFor="location" className="text-sm font-medium text-gray-700">
                Location:
              </label>
              <select
                id="location"
                value={locationId}
                onChange={handleLocationChange}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="1">Location 1</option>
                <option value="2">Location 2</option>
                <option value="3">Location 3</option>
                <option value="4">All Locations</option>
              </select>
            </div>
          </div>

          {/* Total Earnings Card */}
          <div className="max-w-sm mx-auto mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6 text-center">
              <h3 className="text-lg font-medium mb-2">
                Total {viewType.charAt(0).toUpperCase() + viewType.slice(1)} Earnings
              </h3>
              <p className="text-3xl font-bold">
                {loading ? '...' : formatCurrency(totalAmount)}
              </p>
            </div>
          </div>
        </main>

        {/* Chart Section */}
        <div className="w-[80%] mx-auto mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 capitalize">
            {viewType} Earnings Report
          </h2>

          <div className="bg-white shadow rounded-lg p-6">
            {loading && (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            )}

            {error && (
              <div className="flex justify-center items-center h-64">
                <div className="text-red-600 text-center">
                  <p className="text-lg font-medium mb-2">Error loading data</p>
                  <p className="text-sm">{error}</p>
                  <button
                    onClick={() => loadEarningsData(viewType, locationId)}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}

            {!loading && !error && earningsData.length > 0 && (
              <ResponsiveContainer width="100%" height={getChartHeight()}>
                <BarChart 
                  data={earningsData} 
                  margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis tickFormatter={(value) => `${value.toLocaleString()}`} />
                  <Tooltip 
                    formatter={(value) => [formatCurrency(value), 'Earnings']}
                    labelStyle={{ color: '#374151' }}
                  />
                  <Bar 
                    dataKey="earnings" 
                    fill={viewType === 'overall' ? '#10B981' : '#4F46E5'} 
                    radius={[5, 5, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            )}

            {!loading && !error && earningsData.length === 0 && (
              <div className="flex justify-center items-center h-64">
                <p className="text-gray-500 text-lg">No data available</p>
              </div>
            )}
          </div>
        </div>

        {/* Data Summary Cards */}
        {/* <div className="w-[80%] mx-auto mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold text-gray-700 mb-2">Monthly Total</h4>
              <p className="text-2xl font-bold text-blue-600">$233K</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold text-gray-700 mb-2">Yearly Total</h4>
              <p className="text-2xl font-bold text-green-600">$1.24M</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold text-gray-700 mb-2">Average Growth</h4>
              <p className="text-2xl font-bold text-purple-600">+15.2%</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Earning;