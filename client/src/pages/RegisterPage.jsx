import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { FaUser, FaKey, FaEye, FaEyeSlash, FaPenAlt } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { FiLoader } from 'react-icons/fi';
import AnimatedBackground from '../../components/AnimatedBackground';
import { toast } from 'react-hot-toast';
import { useAuthstores } from '../store/useAuthstores';

export const RegisterPage = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { isRegistering, registerUser } = useAuthstores();
  const navigate = useNavigate();

  const submitInputHandler = async () => {
    try {
      await registerUser({ firstname, lastname, username, email, password });
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen relative">
      <AnimatedBackground />
      
      <div className="relative z-10">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-6">
          <legend className="fieldset-legend px-3">Register</legend>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="label">First Name</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-70" />
                <input
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  type="text"
                  className="input w-full bg-base-100 "
                  placeholder="Firstname"
                  required
                />
              </div>
            </div>

            <div>
              <label className="label">Last Name</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-70" />
                <input
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  type="text"
                  className="input w-full bg-base-100 "
                  placeholder="Lastname"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label className="label">Username</label>
            <div className="relative">
              <FaPenAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-70" />
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                className="input w-full bg-base-100"
                placeholder="Username"
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="label">Email</label>
            <div className="relative">
              <IoMdMail className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-70" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="input w-full bg-base-100 "
                placeholder="Email@example.com"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="label">Password</label>
            <div className="relative">
              <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-70" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                className="input w-full bg-base-100 "
                placeholder="Password"
                required
              />
              <div 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer opacity-70 hover:opacity-100"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </div>
            </div>
          </div>

          <button
            onClick={submitInputHandler}
            disabled={isRegistering}
            className="btn w-full mt-2 " style={{ backgroundColor: "#a737c4" }}
          >
            {isRegistering ? (
              <span className="flex items-center justify-center gap-2">
                <FiLoader className="animate-spin" />
                Creating Account...
              </span>
            ) : (
              "Register Now"
            )}
          </button>

          <div className="text-center mt-4 text-sm opacity-80">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Sign In
            </Link>
          </div>
        </fieldset>
      </div>
    </div>
  );
};