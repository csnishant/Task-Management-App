import React, { useEffect, useState } from "react";
import axios from "axios";
import { TASK_API_END_POINT } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getTasks = async () => {
    try {
      const res = await axios.get(TASK_API_END_POINT, config);
      setTasks(res.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      toast.error("Failed to sync your tasks database.");
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };

  const addTask = async () => {
    if (!title.trim()) return;
    try {
      setLoading(true);
      await axios.post(TASK_API_END_POINT, { title: title.trim() }, config);
      setTitle("");
      toast.success("Task deployed successfully!");
      getTasks();
    } catch (error) {
      console.error("Failed to add task:", error);
      toast.error("Could not append your task.");
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async () => {
    if (!title.trim() || !editingId) return;
    try {
      setLoading(true);
      await axios.put(
        `${TASK_API_END_POINT}/${editingId}`,
        { title: title.trim() },
        config,
      );
      setEditingId(null);
      setTitle("");
      toast.success("Task scope modified!");
      await getTasks();
    } catch (error) {
      console.error("Failed to update task:", error);
      toast.error("Could not process task update.");
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${TASK_API_END_POINT}/${id}`, config);
      toast.info("Task removed from workspace.");
      getTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
      toast.error("Failed to purge task.");
    }
  };

  const editTask = (task) => {
    setEditingId(task._id);
    setTitle(task.title);
    toast.dark("Editing mode activated.");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitle("");
  };

  const logoutHandler = () => {
    localStorage.clear();
    toast.success("Logged out from workspace safely.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 font-sans antialiased selection:bg-indigo-500 selection:text-white py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* TOP NAVBAR / HEADER CONTAINER */}
        <header className="flex justify-between items-center bg-white px-5 py-4 sm:px-8 sm:py-5 rounded-2xl shadow-sm border border-gray-100/80 text-left">
          <div className="flex items-center gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-100 shrink-0">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-black text-gray-900 tracking-tight sm:text-2xl">
                Task Workspace
              </h1>
              <p className="text-xs font-semibold text-gray-400 mt-0.5 uppercase tracking-wider">
                Active Projects & Priorities
              </p>
            </div>
          </div>

          <button
            onClick={logoutHandler}
            className="inline-flex items-center gap-2 bg-slate-50 hover:bg-rose-50 text-gray-600 hover:text-rose-600 px-4 py-2.5 rounded-xl text-sm font-bold border border-gray-100 hover:border-rose-100 active:scale-[0.98] transition-all duration-150">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="hidden sm:inline">Terminate Session</span>
            <span className="sm:hidden">Logout</span>
          </button>
        </header>

        {/* WORKSPACE OPERATIONS CONTROLLER */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* TASK INTAKE FORM (Left Panel on Desktop) */}
          <div className="lg:col-span-1 bg-white p-5 rounded-2xl shadow-sm border border-gray-100/80 text-left space-y-4">
            <div>
              <label className="block text-xs font-bold tracking-wide uppercase text-gray-700">
                {editingId ? "Modify Target Scope" : "Create Workspace Task"}
              </label>
              <p className="text-xs text-gray-400 mt-0.5">
                Assign goals or workflows.
              </p>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="What needs execution?"
                value={title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-50/60 border border-gray-200 rounded-xl text-gray-950 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 focus:bg-white transition duration-150 text-sm shadow-inner"
              />

              <div className="flex flex-col gap-2 pt-1">
                {editingId ? (
                  <>
                    <button
                      onClick={updateTask}
                      disabled={loading || !title.trim()}
                      className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white py-3 rounded-xl font-bold text-sm shadow-md shadow-amber-500/10 active:scale-[0.99] transition-all">
                      {loading ? "Syncing..." : "Apply Modification"}
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 py-2.5 rounded-xl font-semibold text-sm active:scale-[0.99] transition-all">
                      Cancel Re-scope
                    </button>
                  </>
                ) : (
                  <button
                    onClick={addTask}
                    disabled={loading || !title.trim()}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold text-sm shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20 active:scale-[0.99] transition-all flex justify-center items-center gap-1.5">
                    {loading ? (
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    )}
                    {loading ? "Deploying..." : "Push to Queue"}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* TASK ACTIVE QUEUE DIRECTORY (Right Panel on Desktop) */}
          <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100/80 text-left space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h2 className="text-xs font-black text-gray-400 uppercase tracking-wider">
                Your Operations Queue
              </h2>
              <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-full border border-indigo-100">
                {tasks.length}{" "}
                {tasks.length === 1 ? "Task Pending" : "Tasks Pending"}
              </span>
            </div>

            <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
              {tasks.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/40">
                  <svg
                    className="mx-auto h-10 w-10 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                  <p className="mt-3.5 text-sm font-semibold text-gray-500">
                    Workspace synchronized.
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    No immediate priorities pending execution.
                  </p>
                </div>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task._id}
                    className={`flex justify-between items-center bg-slate-50/70 hover:bg-slate-100/50 p-4 rounded-xl border border-gray-100 transition-all duration-150 group ${
                      editingId === task._id
                        ? "ring-2 ring-amber-400 bg-amber-50/20 border-amber-200"
                        : ""
                    }`}>
                    <div className="flex items-start gap-3 min-w-0 flex-1 pr-4">
                      <div
                        className="h-5 w-5 mt-0.5 rounded-md border border-gray-300 flex items-center justify-center bg-white group-hover:border-indigo-400 group-hover:bg-indigo-50 cursor-pointer transition-colors shrink-0"
                        onClick={() => deleteTask(task._id)}>
                        <svg
                          className="w-3 h-3 text-indigo-600 opacity-0 group-hover:opacity-150 transition-opacity"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900 break-words leading-snug">
                        {task.title}
                      </h3>
                    </div>

                    <div className="flex gap-1.5 shrink-0 opacity-100 sm:opacity-40 group-hover:opacity-100 transition-opacity duration-150">
                      <button
                        onClick={() => editTask(task)}
                        className="p-2 bg-white hover:bg-indigo-50 border border-gray-200 hover:border-indigo-200 rounded-lg text-gray-500 hover:text-indigo-600 transition-all shadow-sm"
                        title="Edit Target">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>

                      <button
                        onClick={() => deleteTask(task._id)}
                        className="p-2 bg-white hover:bg-rose-50 border border-gray-200 hover:border-rose-200 rounded-lg text-gray-500 hover:text-rose-600 transition-all shadow-sm"
                        title="Purge Task">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
