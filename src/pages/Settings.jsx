import { useAuth } from "../context/AuthContext";
import { logout } from "../services/Auth";

export default function Settings() {
  const { session } = useAuth();

  const handleLogout = () => {
    logout(session?.sessionId);
    setTimeout(() => {
      sessionStorage.clear();
    }, 500);
  };
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Settings</h2>
      <p className="mt-2 text-gray-700">Settings controls will go here.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
