import { useAuth } from "../context/AuthContext";

export default function Settings() {
  const { handleLogout } = useAuth();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Settings</h2>
      <p className="mt-2 text-gray-700">Settings controls will go here.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
