import React, { useState } from "react";
import { X } from "lucide-react";
import useSWR from "swr";
import { fetchData } from "../api/ClientFunction";

const HealthCheckPopup = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { data, error, mutate } = useSWR("/health", fetchData);

  if (!isOpen) return null;

  let statusMessage = "Click 'Check Health' to test backend.";
  if (loading) statusMessage = "Checking...";
  else if (error) statusMessage = "🔴 Server is down";
  else if (data?.status === "ok") statusMessage = `🟢 ${data?.message}`;
  else if (data) statusMessage = "🟡 Server responded but something is off";

  const handleCheck = () => {
    setLoading(true);
    mutate("/health");
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4 text-gray-800">Backend Health</h2>
        <p className="text-gray-700 mb-4">{statusMessage}</p>

        <button
          onClick={handleCheck}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
        >
          Check Health
        </button>
      </div>
    </div>
  );
};

export default HealthCheckPopup;
