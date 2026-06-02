import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_API_END_POINT } from "../utils/constants";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${AUTH_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data));
        toast.success("Welcome back! Loading your workspace...");
        navigate("/dashboard");
      }
    } catch (error) {
      const errorMsg = error?.response?.data?.message || "Invalid credentials. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-50 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* LEFT SIDE: Brand & Value Prop (Hidden on Mobile/Tablets) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-indigo-900 overflow-hidden items-center justify-center p-12">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-white to-transparent" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-indigo-400 to-transparent" />
        </div>

        <div className="relative z-10 max-w-md text-white space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-950/50">
              <svg
                className="w-6 h-6 text-white"
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
            <span className="text-xl font-bold tracking-tight">
              TaskFlow <span className="text-indigo-400">Pro</span>
            </span>
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold tracking-tight leading-tight">
              Manage workflows, surpass your targets.
            </h2>
            <p className="text-indigo-200 text-lg leading-relaxed">
              Experience the ultra-fast task management workspace built for
              modern high-performance teams.
            </p>
          </div>

          {/* Feature Badges */}
          <div className="pt-4 space-y-3">
            <div className="flex items-center gap-3 text-sm font-medium text-indigo-100">
              <svg
                className="w-5 h-5 text-indigo-400 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Real-time collaboration & subtasks tracking
            </div>
            <div className="flex items-center gap-3 text-sm font-medium text-indigo-100">
              <svg
                className="w-5 h-5 text-indigo-400 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Advanced analytics & productivity metrics
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Auth Form (Full width on mobile) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-16 bg-slate-50">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Only Header logo */}
          <div className="flex lg:hidden items-center gap-2.5 justify-center mb-2">
            <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-200">
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
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              TaskFlow
            </span>
          </div>

          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight sm:text-4xl">
              Account Sign In
            </h1>
            <p className="mt-2.5 text-sm font-medium text-gray-550 text-gray-500">
              Welcome back! Please enter your workspace credentials.
            </p>
          </div>

          <form onSubmit={submitHandler} className="mt-8 space-y-5">
            {/* Email Address Input */}
            <div className="space-y-1.5 text-left w-full">
              {" "}
              {/* text-left aur w-full add kiya parent par safely */}
              <label
                htmlFor="email"
                className="block text-left text-xs font-bold tracking-wide uppercase text-gray-700">
                Email Address
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  placeholder="alex@company.com"
                  className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-950 font-medium placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition duration-150 sm:text-sm"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="block text-xs font-bold tracking-wide uppercase text-gray-700">
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={changeEventHandler}
                  placeholder="••••••••"
                  className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-950 font-medium placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition duration-150 sm:text-sm"
                  required
                />
              </div>
            </div>

            {/* Remember Me checkbox & Helpers */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded-md accent-indigo-600 cursor-pointer"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm font-medium text-gray-600 select-none cursor-pointer">
                  Keep me logged in
                </label>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 transition-all duration-150 shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20">
                {loading ? (
                  <span className="flex items-center gap-2.5">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
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
                    Verifying Space...
                  </span>
                ) : (
                  "Sign In to Workspace"
                )}
              </button>
            </div>
          </form>

          {/* Footer Navigation */}
          <p className="text-center lg:text-left text-sm text-gray-500 font-medium pt-2">
            New to TaskFlow?{" "}
            <Link
              to="/register"
              className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors underline-offset-4 hover:underline">
             Register your account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;