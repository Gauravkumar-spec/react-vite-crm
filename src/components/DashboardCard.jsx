export default function DashboardCard({ title, value }) {
  return (
    <div className="bg-gray-500 p-6 rounded-xl shadow-lg hover:shadow-xl transition">
      <p className="text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800 mt-2">{value}</h3>
    </div>
  );
}
