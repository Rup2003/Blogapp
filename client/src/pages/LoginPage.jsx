import React from "react";
import { FiLogIn } from "react-icons/fi";

export const LoginPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-4">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input type="email" className="input w-full" placeholder="Email" />

        <label className="label">Password</label>
        <input type="password" className="input w-full" placeholder="Password" />

        <button className="btn mt-4" style={{ backgroundColor: "#a737c4" }}>
          Login<FiLogIn />
          </button>
      </fieldset>
    </div>
  );
};
