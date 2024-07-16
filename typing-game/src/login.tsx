import React, { useState, FC } from "react";
import supabase from "./config/supabaseClient";
import { useNavigate } from "react-router-dom";

interface Props {
  setToken?: any;
}
const Login: FC<Props> = ({ setToken }) => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
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
    console.log(formData);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      console.log(data);
      setToken(data);

      navigate("/");

      if (error) throw error;
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="container mx-auto p-0 flex  items-center flex-col h-screen w-screen">
      <form className="flex flex-col items-center">
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
            onClick={handleSubmit}
          >
            Log in
          </button>
        </a>

        <p className="text-xs p-2 text-lightGray">
          New to TypingGame?{" "}
          <a href="./register" className="underline">
            Create a free account
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
