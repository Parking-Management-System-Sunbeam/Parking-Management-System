import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import AdminSidebar from '../../Components/Admin/AdminSidebar';
import {
  getMonthlyPayments,
  getYearlyPayments,
 
} from '../../Services/paymentService';
import { getAllLocationIds } from '../../Services/placeService';

const Earning = () => {
  const [viewType, setViewType] = useState('monthly');
  const [locationId, setLocationId] = useState('');
  const [locationIds, setLocationIds] = useState([]);
  const [earningsData, setEarningsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  // Load location IDs on mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const ids = await getAllLocationIds();
       
        setLocationIds(ids);
        if (ids.length > 0) {
          setLocationId(ids[0]); // default to first location
        }
      } catch (err) {
        console.error("Failed to load locations", err);
      }
    };
    fetchLocations();
  }, []);

  // Load earnings when viewType or locationId changes
useEffect(() => {
  if (!locationId || viewType === 'overall') {
    setEarningsData([]);
    setTotalAmount(0);
    return;
  }

 const fullMonths = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const shortMonths = {
  January: 'Jan',
  February: 'Feb',
  March: 'Mar',
  April: 'Apr',
  May: 'May',
  June: 'Jun',
  July: 'Jul',
  August: 'Aug',
  September: 'Sep',
  October: 'Oct',
  November: 'Nov',
  December: 'Dec'
};

const loadEarningsData = async () => {
  setLoading(true);
  setError(null);

  try {
    let data = [];

    if (viewType === 'monthly') {
      const response = await getMonthlyPayments(locationId); // [{ month, totalIncome }]
      const incomeMap = new Map(
        response.map(item => [item.month, Number(item.totalIncome) || 0])
      );

      data = fullMonths.map(month => ({
        period: shortMonths[month],
        earnings: incomeMap.get(month) || 0,
      }));

    } else if (viewType === 'yearly') {
      const response = await getYearlyPayments(locationId); 
      data = response.map(item => ({
        period: item.year.toString(),
        earnings: Number(item.totalIncome) || 0,
      }));
    }

    setEarningsData(data);

    const total = data.reduce((sum, item) => sum + item.earnings, 0);
    setTotalAmount(total);

  } catch (err) {
    console.error('Failed to load earnings:', err);
    setError(err?.message || 'Something went wrong');
  } finally {
    setLoading(false);
  }
};

  loadEarningsData();
}, [viewType, locationId]);

 

  const handleViewTypeChange = (type) => {
    setViewType(type);
  };

  const handleLocationChange = (e) => {
    setLocationId(e.target.value);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

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
        <AdminSidebar />
      </aside>

      <div className='flex flex-col w-full'>
        <main className="p-10">

          <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center items-center">
            {/* View Type Selector */}
            <div className="flex gap-2">
              {['monthly', 'yearly'].map(type => (
                <button
                  key={type}
                  onClick={() => handleViewTypeChange(type)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    viewType === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>

            {/* Location Dropdown */}
            {viewType !== 'overall' && (
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
                  {locationIds.map(id => (
                    <option key={id} value={id}>Location {id}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Total Earnings */}
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
                    onClick={() => setViewType(viewType)} // Retry by resetting
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
      </div>
    </div>
  );
};

export default Earning;
