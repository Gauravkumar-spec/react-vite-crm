import { FiHome, FiDollarSign, FiCalendar, FiEye, FiChevronRight } from 'react-icons/fi';
import { FaBed, FaBath, FaChartLine, FaRegBuilding, FaStar } from 'react-icons/fa';
import { MdApartment, MdLocationOn } from 'react-icons/md';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Dashboard Card Component
const DashboardCard = ({ title, value, change, icon, chart }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
    <div className="flex justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
        <p className={`text-sm mt-1 ${change.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </p>
      </div>
      <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center">
        {icon}
      </div>
    </div>
    <div className="mt-4 flex items-center">
      {chart}
      <span className="ml-2 text-xs text-gray-500">vs previous period</span>
    </div>
  </div>
);

// Recent Listings Component
const RecentListings = () => {
  const listings = [
    {
      id: 1,
      title: "Luxury Villa in Beverly Hills",
      type: "Villa",
      price: "$2,500,000",
      bedrooms: 5,
      bathrooms: 4,
      status: "Active",
      image: "/villa.jpg"
    },
    {
      id: 2,
      title: "Modern Apartment Downtown",
      type: "Apartment",
      price: "$850,000",
      bedrooms: 2,
      bathrooms: 2,
      status: "Pending",
      image: "/apartment.jpg"
    },
    {
      id: 3,
      title: "Suburban Family Home",
      type: "House",
      price: "$1,200,000",
      bedrooms: 4,
      bathrooms: 3,
      status: "Active",
      image: "/house.jpg"
    }
  ];

  return (
    <div className="space-y-4">
      {listings.map((listing) => (
        <div key={listing.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <div className="flex-shrink-0 h-12 w-12 rounded-md overflow-hidden bg-gray-200">
            <img className="h-full w-full object-cover" src={listing.image} alt={listing.title} />
          </div>
          <div className="ml-4 flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-900">{listing.title}</h4>
              <span className={`text-xs px-2 py-1 rounded-full ${
                listing.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {listing.status}
              </span>
            </div>
            <div className="mt-1 flex items-center text-xs text-gray-500">
              <span className="flex items-center mr-3">
                <FaBed className="mr-1" /> {listing.bedrooms}
              </span>
              <span className="flex items-center mr-3">
                <FaBath className="mr-1" /> {listing.bathrooms}
              </span>
              <span className="flex items-center">
                <MdApartment className="mr-1" /> {listing.type}
              </span>
            </div>
          </div>
          <div className="ml-4 text-right">
            <p className="text-sm font-medium text-gray-900">{listing.price}</p>
            <button className="text-indigo-600 hover:text-indigo-900 text-xs flex items-center">
              View <FiChevronRight className="ml-1" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// Top Agents Component
const TopAgents = () => {
  const agents = [
    {
      id: 1,
      name: "Sarah Johnson",
      sales: 42,
      volume: "$12.5M",
      rating: 4.9,
      image: "/agent1.jpg"
    },
    {
      id: 2,
      name: "Michael Chen",
      sales: 38,
      volume: "$10.2M",
      rating: 4.8,
      image: "/agent2.jpg"
    },
    {
      id: 3,
      name: "David Wilson",
      sales: 35,
      volume: "$9.8M",
      rating: 4.7,
      image: "/agent3.jpg"
    }
  ];

  return (
    <div className="space-y-4">
      {agents.map((agent) => (
        <div key={agent.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-gray-200">
            <img className="h-full w-full object-cover" src={agent.image} alt={agent.name} />
          </div>
          <div className="ml-4 flex-1">
            <h4 className="text-sm font-medium text-gray-900">{agent.name}</h4>
            <div className="mt-1 flex items-center text-xs text-gray-500">
              <span className="flex items-center mr-3">
                <FiDollarSign className="mr-1" /> {agent.volume}
              </span>
              <span className="flex items-center">
                <FaStar className="text-yellow-400 mr-1" /> {agent.rating}
              </span>
            </div>
          </div>
          <div className="ml-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              {agent.sales} sales
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

// Chart Components
const LineChart = ({ data }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return <Line options={options} data={data} />;
};

const BarChart = ({ data }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return <Bar options={options} data={data} />;
};

const PieChart = ({ data }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return <Pie options={options} data={data} />;
};

// Main Dashboard Component
export default function Dashboard() {
  // Sample data for charts
  const salesTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Properties Sold',
        data: [12, 19, 8, 15, 22, 18],
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        tension: 0.3,
      },
    ],
  };

  const propertyTypeData = {
    labels: ['Houses', 'Apartments', 'Villas', 'Condos'],
    datasets: [
      {
        label: 'Inventory',
        data: [45, 30, 15, 10],
        backgroundColor: [
          '#4f46e5',
          '#10b981',
          '#f59e0b',
          '#ef4444'
        ],
        borderWidth: 1,
      },
    ],
  };

  const revenueData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Revenue ($)',
        data: [125000, 195000, 84000, 175000],
        backgroundColor: '#10b981',
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Real Estate Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select className="appearance-none bg-gray-700 border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900">
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Quarter</option>
              <option>This Year</option>
            </select>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard 
          title="Total Properties" 
          value="1,284" 
          change="+12% from last month" 
          icon={<FiHome className="text-indigo-600" size={24} />}
          chart={<FaChartLine className="text-green-500" size={16} />}
        />
        <DashboardCard 
          title="Total Revenue" 
          value="$2.8M" 
          change="+18% from last quarter" 
          icon={<FiDollarSign className="text-green-600" size={24} />}
          chart={<FaChartLine className="text-green-500" size={16} />}
        />
        <DashboardCard 
          title="Active Listings" 
          value="326" 
          change="+8 new this week" 
          icon={<FaRegBuilding className="text-blue-600" size={24} />}
          chart={<FaChartLine className="text-green-500" size={16} />}
        />
        <DashboardCard 
          title="Avg. Days on Market" 
          value="42" 
          change="-5% from last month" 
          icon={<FiCalendar className="text-amber-600" size={24} />}
          chart={<FaChartLine className="text-red-500" size={16} />}
        />
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Sales Trend</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-xs bg-indigo-50 text-indigo-600 rounded-md">Monthly</button>
              <button className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-md">Quarterly</button>
              <button className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-md">Yearly</button>
            </div>
          </div>
          <div className="h-64">
            <LineChart data={salesTrendData} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Property Types</h3>
          <div className="h-64">
            <PieChart data={propertyTypeData} />
          </div>
        </div>
      </div>

      {/* Secondary Charts and Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quarterly Revenue</h3>
          <div className="h-64">
            <BarChart data={revenueData} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Performing Agents</h3>
          <TopAgents />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Recent Listings</h3>
            <button className="text-sm text-indigo-600 hover:text-indigo-800">View All</button>
          </div>
          <RecentListings />
        </div>
      </div>

      {/* Market Insights */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Market Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h4 className="text-sm font-medium text-gray-500">Median Price</h4>
            <p className="text-2xl font-bold text-gray-800">$425,000</p>
            <p className="text-sm text-green-600">+5.2% YoY</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="text-sm font-medium text-gray-500">Inventory</h4>
            <p className="text-2xl font-bold text-gray-800">1.2 months</p>
            <p className="text-sm text-red-600">-0.8 months YoY</p>
          </div>
          <div className="border-l-4 border-amber-500 pl-4">
            <h4 className="text-sm font-medium text-gray-500">Days on Market</h4>
            <p className="text-2xl font-bold text-gray-800">38 days</p>
            <p className="text-sm text-green-600">-12% YoY</p>
          </div>
        </div>
      </div>
    </div>
  );
}