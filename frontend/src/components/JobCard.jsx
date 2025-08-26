import React, { useState } from "react";
import axios from "axios";

export default function JobCard({ job, onEdit, onDelete }) {
  const [message, setMessage] = useState("");

  const handleApply = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Please login to apply.");
        return;
      }

      const res = await axios.post(
        `http://localhost:5000/api/jobs/${job._id}/apply`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message || "Applied successfully!");
    } catch (err) {
      setMessage("Failed to apply");
    }
  };

  return (
    <div className="border rounded p-4 shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-bold">{job.title}</h3>
        <p className="text-gray-600">
          {job.location} • {job.type}
        </p>
        <p className="text-sm mt-2">
          {job.description ? job.description.slice(0, 100) : ""}...
        </p>
      </div>

      {/* If admin passed edit/delete props → show them */}
      {onEdit || onDelete ? (
        <div className="mt-3 flex gap-2">
          {onEdit && (
            <button
              onClick={onEdit}
              className="bg-yellow-400 px-3 py-1 rounded"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          )}
        </div>
      ) : (
        // Otherwise show Apply button
        <div className="mt-3">
          <button
            onClick={handleApply}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Apply
          </button>
          {message && (
            <p className="text-sm mt-2 text-green-600">{message}</p>
          )}
        </div>
      )}
    </div>
  );
}
