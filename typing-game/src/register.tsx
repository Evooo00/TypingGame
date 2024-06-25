import React, { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    login: "",
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  };
  return (
    <div className="container mx-auto p-0 flex  items-center flex-col h-screen w-screen">
      <form className="flex flex-col items-center">
        <input
          className="my-2 p-2 rounded-2xl bg-lightGray text-softWhite"
          type="text"
          placeholder="login"
          name="login"
          onChange={handleChange}
        ></input>

        <input
          className="my-2 p-2 rounded-2xl bg-lightGray text-softWhite"
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        ></input>
        <input
          className="my-2 p-2 rounded-2xl bg-lightGray text-softWhite"
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        ></input>
        <a href="/">
          <button
            className="p-2 bg-strongYellow w-24 rounded-2xl text-darkGray font-bold"
            type="submit"
          >
            Register
          </button>
        </a>

        <p className="text-xs p-2 text-lightGray">
          Already have an account?{" "}
          <a href="./login" className="underline">
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
}

export default Register;
