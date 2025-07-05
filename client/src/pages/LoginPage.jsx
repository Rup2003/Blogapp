import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { FaUser, FaKey, FaEye, FaEyeSlash, FaSignInAlt } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { FiLoader } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { useAuthstores } from '../store/useAuthstores';

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { isLoggingIn, loginUser } = useAuthstores();

  const submitInputHandler = async () => {
    try {
      await loginUser({ username, email, password });
      navigate("/");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-4">
        <legend className="fieldset-legend">Login</legend>

        <div className="space-y-4">
          {/* Username Input */}
          <div>
            <label className="label">Username</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-70" />
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                className="input w-full "
                placeholder="Username"
              />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label className="label">Email</label>
            <div className="relative">
              <IoMdMail className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-70" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="input w-full"
                placeholder="Email"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="label">Password</label>
            <div className="relative">
              <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-70" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                className="input w-full "
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-70 hover:opacity-100"
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={submitInputHandler}
            disabled={isLoggingIn}
            className="btn w-full mt-4"
            style={{ backgroundColor: "#a737c4" }}
          >
            {isLoggingIn ? (
              <div className="flex items-center justify-center gap-2">
                <FiLoader className="animate-spin" />
                <span>Signing in...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <span>Login</span>
                <FaSignInAlt />
              </div>
            )}
          </button>

          {/* Register Link */}
          <div className="text-center pt-2 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary link">
              Register
            </Link>
          </div>
        </div>
      </fieldset>
    </div>
  );
};