function Login() {
  return (
    <div className="container mx-auto p-0 flex  items-center flex-col h-screen w-screen">
      <form className="flex flex-col items-center">
        <input
          className="my-2 p-2 rounded-2xl bg-lightGray text-softWhite"
          type="text"
          placeholder="login"
          name="login"
        ></input>

        <input
          className="my-2 p-2 rounded-2xl bg-lightGray text-softWhite"
          type="password"
          placeholder="password"
          name="password"
        ></input>
        <a href="/">
          <button
            className="p-2 bg-strongYellow w-24 rounded-2xl text-darkGray font-bold"
            type="submit"
          >
            Log in
          </button>
        </a>

        <p className="text-xs p-2 text-lightGray">
          New to Smartcat?{" "}
          <a href="./register" className="underline">
            Create a free account
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
