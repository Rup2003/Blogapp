import React from 'react'

export const RegisterPage = () => {
  return (
     <div className="flex items-center justify-center h-screen">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-4">
        <legend className="fieldset-legend">Register</legend>

        <div className=" flex gap-4">
        <div className="flex flex-col w-1/2">
        <label className="label">First Name</label>
        <input type="text" className="input" placeholder="First Name" />
        </div>

        <div className="flex flex-col w-1/2">
        <label className="label">Last Name</label>
        <input type="text" className="input" placeholder="Last Name" />
        </div>
        </div>

        <label className="label">Email</label>
        <input type="email" className="input w-full" placeholder="Email" />

        <label className="label">Password</label>
        <input type="password" className="input w-full" placeholder="Password" />

        <button className="btn mt-4" style={{ backgroundColor: "#a737c4" }}>Register</button>
      </fieldset>
    </div>
  )
}
