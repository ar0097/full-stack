"use client";

import { useEffect, useState } from "react";

type Job = {
  _id: string;
  company: string;
  role: string;
  status: string;
  appliedDate: string;
  link: string;
};

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [form, setForm] = useState({
    company: "",
    role: "",
    status: "Applied",
    appliedDate: "",
    link: "",
  });

  const [filter, setFilter] = useState("");

  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL as string;

  const fetchJobs = async () => {
    const res = await fetch(
      `${BACKEND_URL}${filter ? `?status=${filter}` : ""}`
    );
    const data = await res.json();
    setJobs(data);
  };

  const addJob = async () => {
    await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({
      company: "",
      role: "",
      status: "Applied",
      appliedDate: "",
      link: "",
    });
    fetchJobs();
  };

  const deleteJob = async (id: string) => {
    await fetch(`${BACKEND_URL}/${id}`, { method: "DELETE" });
    fetchJobs();
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch(`${BACKEND_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchJobs();
  };

  useEffect(() => {
    fetchJobs();
  }, [filter]);

  return (
    <main className="p-4 mx-auto">
      <h1 className="text-2xl font-bold mb-4">📌 Student Job Tracker</h1>

      <div className="flex justify-between items-center gap-5 my-5">
        <input
          type="text"
          placeholder="Company"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          className="border px-2 py-1 rounded w-[300px]"
        />
        <input
          type="text"
          placeholder="Role"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="border px-2 py-1 rounded w-[300px]"
        />

        <input
          type="date"
          value={form.appliedDate}
          onChange={(e) => setForm({ ...form, appliedDate: e.target.value })}
          className="border px-2 py-1 rounded w-[300px]"
        />
        <input
          type="url"
          placeholder="Link (Optional)"
          value={form.link}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
          className="border px-2 py-1 rounded w-[300px]"
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="border px-2 py-1 rounded w-[200px]"
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
        <button
          onClick={addJob}
          className="bg-blue-600 text-white py-1 rounded w-[200px]"
        >
          Add Job
        </button>
      </div>

      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="">All</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <ul className="space-y-3">
        {jobs.map((job) => (
          <li key={job._id} className="border p-3 rounded shadow">
            <div className="flex justify-between">
              <div>
                <h2 className="font-bold text-lg">
                  {job.company} - {job.role}
                </h2>
                <p>
                  Status: <strong>{job.status}</strong>
                </p>
                <p>
                  Applied on: {new Date(job.appliedDate).toLocaleDateString()}
                </p>
                {job.link && (
                  <a
                    href={job.link}
                    target="_blank"
                    className="text-blue-500 underline"
                  >
                    {job.role}
                  </a>
                )}
              </div>
              <div className="flex gap-2 items-start">
                <select
                  value={job.status}
                  onChange={(e) => updateStatus(job._id, e.target.value)}
                  className="border px-1 py-1 text-sm rounded"
                >
                  <option>Applied</option>
                  <option>Interview</option>
                  <option>Offer</option>
                  <option>Rejected</option>
                </select>
                <button
                  onClick={() => deleteJob(job._id)}
                  className="bg-red-600 text-white text-sm px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
